'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const KAKAO_API_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
//todo:  (선택한 div 의 정보 )나중에 카카오 로컬에서 위도 경도 , 매장이름, 주소 가져가서 핑찍기

interface KakaoLocalResultType {
  id: number;
  place_name: string;
  address_name: string;
}
const AddLogPlace = () => {
  // 카카오 로컬 api 요청 핸들러
  const [place, setPlace] = useState('');
  const [results, setResults] = useState<KakaoLocalResultType[]>([]);
  const searchPlaceHandler = async (query: string) => {
    try {
      const response = await axios.get(KAKAO_API_URL, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
        },
        params: {
          query,
        },
      });
      setResults(response.data.documents);
      console.log(results);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (place.length > 1) {
      const delayDebounceFn = setTimeout(() => {
        searchPlaceHandler(place);
      }, 300); // 300ms 지연

      return () => clearTimeout(delayDebounceFn); // 클린업 함수
    } else {
      setResults([]);
    }
  }, [place]);

  return (
    <>
      <div className="add-log-place-container">
        <label>
          <div className="add-log-place-inner">
            <div>
              <img src="/image/searchPlace.svg" alt="장소 검색" />
            </div>
            <input
              type="text"
              value={place}
              placeholder="ex)스타필드 수원"
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </label>
        <div>
          {results.length > 0 && (
            <div className="search-results">
              {results.map((result) => (
                <div key={result.id} className="search-result-item">
                  <div className="search-result-photo">사진</div>
                  <div>
                    <h2>{result.place_name}</h2>
                    <p>{result.address_name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddLogPlace;
