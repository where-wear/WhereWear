'use client';
import TagTopPlace from '@/components/Explore/TagTopPlace';
import TopFashionLog from '@/components/Explore/TopFashionLog';
import Dropdown from '@/components/Global/Dropdown';
import { RecoLogDataType, SimpleLogData } from '@/types/type';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const page = () => {
  const [userNickname, setUserNickname] = useState<string>('');
  const [place, setPlace] = useState<string>('강남구');
  const [token, setToken] = useState<string | null>(null);
  const [isReco, SetisReco] = useState<boolean>(false); //참이면 추천페이지
  const guOffice = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ];
  const height = [
    '150이하',
    '150초반',
    '150후반',
    '160초반',
    '160후반',
    '170초반',
    '170후반',
    '18초반',
    '180후반',
    '190이상',
  ];
  const weight = [
    '40초반',
    '40후반',
    '50초반',
    '50후반',
    '60초반',
    '60후반',
    '70초반',
    '70후반',
    '80초반',
    '80후반',
    '90초반',
    '90후반',
    '100이상',
  ];
  const footSize = [
    '225',
    '230',
    '235',
    '240',
    '245',
    '250',
    '255',
    '260',
    '265',
    '270',
    '280',
    '285',
    '290',
    '295',
  ];

  const job = ['학생', '직장인', '프리랜서', '자영업자'];

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, [token]);

  const getTopLogsHandler = async () => {
    // 추천로그 데이터를 가져오는 코드 (API 요청)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/explore`,
        {
          params: { category: place },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(place, '탑로그 api 요청', response);
      setRecoData(response.data.response);
      setUserNickname(response.data.response.nickname);
    } catch (error) {
      console.error('로그 데이터를 가져오는 중 오류 발생:', error);
    }
  };
  const handlePlaceChange = (selectedPlace: string) => {
    setPlace(selectedPlace); // 선택된 구를 place 상태로 저장
  };
  const handleHeightChange = (selectedPlace: string) => {};
  const handleWeightChange = (selectedPlace: string) => {};
  const handleFootSizeChange = (selectedPlace: string) => {};
  const handleJobChange = (selectedPlace: string) => {};
  const [recoData, setRecoData] = useState<RecoLogDataType>();
  useEffect(() => {
    // 구가 변경될 때마다 해당 구의 top 3 로그를 가져오는 함수

    if (token) {
      getTopLogsHandler();
    }
    console.log(recoData);
  }, [place, token]); // place가 변경될 때마다 실행

  return (
    <>
      <div className="top-black-container">
        <div className="recommend-title-container">
          <div className="recommend-usernickname-text">
            {userNickname}님을 위한
          </div>
          <div className="recommend-place-text">{place}에 뭐 입고 가지?</div>
        </div>
        <div className="recommendW">
          <img src="/image/recommendW.png" alt="로고" />
        </div>

        <div className="recommend-button-container">
          <div
            className="recommend-button-inner"
            onClick={() => {
              SetisReco(false);
            }}
          >
            <div>주간 요약</div>
            <div className="recommend-bottom-bar"></div>
          </div>
          <div
            className="recommend-button-inner"
            onClick={() => {
              SetisReco(true);
            }}
          >
            <div className="recommend-log-text">추천 로그</div>
            <div className="recommend-bottom-bar none"></div>
          </div>
        </div>
      </div>
      <div className="recommend-contents-container">
        {isReco ? (
          <>
            <div className="reco-page-dropdown-list">
              <div className="reco-page-dropdown">
                <Dropdown
                  list={guOffice}
                  onSelect={handlePlaceChange}
                  title="강남구"
                />
              </div>

              <div className="reco-page-dropdown">
                <Dropdown
                  list={height}
                  onSelect={handleHeightChange}
                  title="키"
                />
              </div>
              <div className="reco-page-dropdown">
                <Dropdown
                  list={weight}
                  onSelect={handleWeightChange}
                  title="몸무게"
                />
              </div>
              {/* <div className="reco-page-dropdown">
                <Dropdown
                  list={footSize}
                  onSelect={handleFootSizeChange}
                  title="발사이즈"
                />
              </div>
              <div className="reco-page-dropdown">
                <Dropdown
                  list={job}
                  onSelect={handlePlaceChange}
                  title="직업"
                />
              </div> */}
            </div>
            <div>이미지 리스트들</div>
          </>
        ) : (
          <>
            <Dropdown
              list={guOffice}
              onSelect={handlePlaceChange}
              title="강남구"
            />
            <div>
              <div>
                <div className="top-fashion-log-text">이번주 top 패션로그</div>

                <TopFashionLog topLogs={recoData?.topFashionLogs} />
              </div>
              <div>
                <div className="top-fashion-log-text">
                  이번주 태그 top 플레이스
                </div>

                <TagTopPlace tagTopPlace={recoData?.tagTopPlaces} />
              </div>
            </div>
            <div className="weekend-hot-keyword-container">
              <div className="top-fashion-log-text">이번주 핫키워드</div>
              <div className="weekend-hot-keyword-item">
                {recoData?.hotKeywords.map((word, index) => (
                  <div key={index} className="keyword-text">
                    #{word}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default page;
