'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '@/Zustand/store';
import { KakaoLocalResultType } from '@/types/type';
import { useRouter } from 'next/navigation';

const KAKAO_API_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
//todo:  (선택한 div 의 정보 )나중에 카카오 로컬에서 위도 경도 , 매장이름, 주소 가져가서 핑찍기

const AddLogPlace = () => {
  //라우터 조정 변수
  const router = useRouter();
  // 카카오 로컬 api 요청 핸들러
  const [place, setPlace] = useState('');
  const [results, setResults] = useState<KakaoLocalResultType[]>([]);

  //스토어값 가져오기
  const logData = useStore((state) => state.logData);
  const setLogData = useStore((state) => state.setLogData);

  //카카오 로컬 검색 핸들러
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

  //플레이스 스토어 저장 핸들러
  const handleResultClick = (result: KakaoLocalResultType) => {
    setLogData({
      ...logData,
      place: {
        // place를 객체로 수정
        placeName: result.place_name,
        placeAddress: result.address_name,
        placeX: result.x,
        placeY: result.y,
      },
    });
    router.back();
  };

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
                <div
                  key={result.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  {/* <div className="search-result-photo">사진</div> */}
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
