import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
//모달창 z-index최대로 만들어서 네비게이션 바 가려야 할듯
interface SearchModalProps {
  onClose: () => void;
  token: string | null;
  onLocationSelect: (lat: number, lng: number) => void;
}
const SearchModal = ({
  onClose,
  token,
  onLocationSelect,
}: SearchModalProps) => {
  const [searchText, setsearchText] = useState('');
  const [userResults, setUserResults] = useState<
    | {
        email: string;
        footSize: number;
        height: number;
        id: number;
        image: string;
        introduction: string;
        job: string;
        nickname: string;
        weight: number;
      }[]
    | []
  >([]);
  const [placeResults, setPlaceResults] = useState<
    | { id: number; address: string; x: number; y: number; placeName: string }[]
    | []
  >([]);

  const mapSearchUser = async (query: string) => {
    console.log(searchText, '유저검색');
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/user`,
        {
          params: { name: searchText },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('유저 검색 결과', res);
      setUserResults(res.data.response);
    } catch (err) {
      console.log(err);
    }
  };
  const mapSearchPlace = async (query: string) => {
    console.log(searchText, '장소검색');
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/place`,
        {
          params: { name: searchText },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('장소 검색 결과', res);
      setPlaceResults(res.data.response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchText.length >= 1) {
      const delayDebounceFn = setTimeout(() => {
        mapSearchUser(searchText);
        mapSearchPlace(searchText);
      }, 300); // 300ms 지연

      return () => clearTimeout(delayDebounceFn); // 클린업 함수
    } else {
      setUserResults([]);
    }
  }, [searchText]);
  return (
    <>
      <div className="search-modal-outline">
        <div className="back-arrow-block">
          <div onClick={onClose} className="back-arrow-inner">
            <img src="/image/back-arrow.svg" />
            <div className="back-bar-text">검색</div>
          </div>
        </div>
        {/* 검색창 */}
        <div className="map-search-input-outline">
          <div className="map-search-input-lable">
            <label>
              <div className="add-log-place-inner">
                <div>
                  <img src="/image/searchPlace.svg" alt="장소 검색" />
                </div>
                <input
                  type="text"
                  value={searchText}
                  placeholder="유저, 플레이스 검색"
                  onChange={(e) => setsearchText(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="map-search-input-result-out">
            <div className="map-search-input-result-container">
              {userResults.length > 0 && (
                <div>
                  <div className="map-search-title">사용자</div>
                  <div className="map-search-user-outline">
                    {userResults.map((result) => (
                      <div
                        className="map-search-user-container"
                        key={result.id}
                      >
                        <Link href={`/myPage/${result.id}`}>
                          <div className="search-user-image">
                            <img src={`${result.image}`} />
                          </div>
                          <div className="map-search-user-text">
                            {result.nickname}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {placeResults.length > 0 && (
                <div>
                  <div className="map-search-title">장소</div>

                  <div className="search-results">
                    {placeResults.map((result) => (
                      <div
                        key={result.id}
                        className="search-result-item"
                        onClick={() => {
                          onLocationSelect(result.y, result.x); // lat = y, lng = x
                        }}
                      >
                        {/* <div className="search-result-photo">사진</div> */}
                        <div>
                          <h2>{result.placeName}</h2>
                          <p>{result.address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
