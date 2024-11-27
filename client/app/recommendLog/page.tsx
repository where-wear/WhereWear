'use client';
import TagTopPlace from '@/components/Explore/TagTopPlace';
import TopFashionLog from '@/components/Explore/TopFashionLog';
import Dropdown from '@/components/Global/Dropdown';
import { RecoLogDataType, SimpleLogData } from '@/types/type';
import axios from 'axios';
import { tree } from 'next/dist/build/templates/app-page';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const page = () => {
  const [userNickname, setUserNickname] = useState<string>('게스트');
  const [place, setPlace] = useState<string | number>('강남구');
  const [dataHeiht, setdDataHeight] = useState<string | number>(0);
  const [dataWeight, setdDataWeight] = useState<string | number>(0);
  const [dataFootSize, setdDataFootSize] = useState<string | number>(0);
  const [dataJob, setdDataJob] = useState<string | number>('');
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
    225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 280, 285, 290, 295,
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

  const getRecoLogsDataHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recommend`,
        {
          params: {
            gu: place, //지역(구) 문자열
            height: dataHeiht, //키 숫자
            weight: dataWeight, // 몸무게 숫자
            footSize: dataFootSize, //발사이즈 숫자
            job: dataJob, // 직업 문자열
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('추천로그 api요청', response.data.response);
      setFilterRecoData(response.data.response);
    } catch (err) {
      console.log(err);
    }
  };
  const handlePlaceChange = (selectedPlace: string | number) => {
    if (typeof selectedPlace === 'string') {
      setPlace(selectedPlace);
    }
  };
  const handleHeightChange = (selectedHeight: number | string) => {
    if (selectedHeight == height[0]) {
      setdDataHeight(150);
    } else if (selectedHeight == height[1]) {
      setdDataHeight(155);
    } else if (selectedHeight == height[2]) {
      setdDataHeight(159);
    } else if (selectedHeight == height[3]) {
      setdDataHeight(165);
    } else if (selectedHeight == height[4]) {
      setdDataHeight(170);
    } else if (selectedHeight == height[5]) {
      setdDataHeight(175);
    } else if (selectedHeight == height[6]) {
      setdDataHeight(180);
    } else if (selectedHeight == height[7]) {
      setdDataHeight(185);
    } else if (selectedHeight == height[8]) {
      setdDataHeight(190);
    } else if (selectedHeight == height[9]) {
      setdDataHeight(195);
    } else {
      setdDataHeight(200);
    }
  };
  const handleWeightChange = (selectedWeight: string | number) => {
    if (selectedWeight == weight[0]) {
      setdDataWeight(40);
    } else if (selectedWeight == weight[1]) {
      setdDataWeight(45);
    } else if (selectedWeight == weight[2]) {
      setdDataWeight(50);
    } else if (selectedWeight == weight[3]) {
      setdDataWeight(55);
    } else if (selectedWeight == weight[4]) {
      setdDataWeight(60);
    } else if (selectedWeight == weight[5]) {
      setdDataWeight(65);
    } else if (selectedWeight == weight[6]) {
      setdDataWeight(70);
    } else if (selectedWeight == weight[7]) {
      setdDataWeight(75);
    } else if (selectedWeight == weight[8]) {
      setdDataWeight(80);
    } else if (selectedWeight == weight[9]) {
      setdDataWeight(85);
    } else if (selectedWeight == weight[10]) {
      setdDataWeight(90);
    } else if (selectedWeight == weight[11]) {
      setdDataWeight(95);
    } else if (selectedWeight == weight[12]) {
      setdDataWeight(100);
    } else if (selectedWeight == weight[13]) {
      setdDataWeight(105);
    } else {
      setdDataWeight(110);
    }
  };
  const handleFootSizeChange = (selectedFS: string | number) => {
    setdDataFootSize(selectedFS);
  };
  const handleJobChange = (selectedJob: string | number) => {
    setdDataJob(selectedJob);
  };
  const [recoData, setRecoData] = useState<RecoLogDataType>();
  useEffect(() => {
    // 구가 변경될 때마다 해당 구의 top 3 로그를 가져오는 함수

    if (token && !isReco) {
      getTopLogsHandler();
    }
    console.log(recoData);
  }, [place, token]); // place가 변경될 때마다 실행

  useEffect(() => {
    if (isReco) {
      console.log(
        '보낼 데이터 처리',
        place,
        dataFootSize,
        dataHeiht,
        dataWeight,
        dataJob
      );

      getRecoLogsDataHandler();
    }
  }, [token, place, dataFootSize, dataHeiht, dataWeight, dataJob, isReco]);

  const [filterRecoData, setFilterRecoData] =
    useState<{ imgUrl: string; id: number }[]>();

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
            className={`recommend-button-inner ${!isReco ? 'active' : ''}`}
            onClick={() => {
              SetisReco(false);
            }}
          >
            <div>주간 요약</div>
          </div>
          <div
            className={`recommend-button-inner ${isReco ? 'active' : ''}`}
            onClick={() => {
              SetisReco(true);
            }}
          >
            <div className="recommend-log-text">추천 로그</div>
          </div>
          <div
            className="recommend-bottom-bar"
            style={{
              transform: isReco ? 'translateX(100%)' : 'translateX(0%)',
            }}
          ></div>
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
                  title={place}
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
            <div className="filterRecoData-container">
              {filterRecoData?.map((data, index) => (
                <div key={index}>
                  <Link href={`/Log/${data.id}`}>
                    <img src={`${data.imgUrl}`} alt="" />
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <Dropdown
              list={guOffice}
              onSelect={handlePlaceChange}
              title={place}
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
