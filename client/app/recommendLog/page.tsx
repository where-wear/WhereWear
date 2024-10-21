'use client';
import TopFashionLog from '@/components/Explore/TopFashionLog';
import Dropdown from '@/components/Global/Dropdown';
import { SimpleLogData } from '@/types/type';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const page = () => {
  const [userNickname, setUserNickname] = useState<string>('ㅇㅇ');
  const [place, setPlace] = useState<string>('송파구');
  const [token, setToken] = useState<string | null>(null);
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
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, [token]);

  const getTopLogsHandler = async () => {
    // 추천로그 데이터를 가져오는 코드 (API 요청)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/explore/topPlace`,
        {
          params: { category: place },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('탑로그 api 요청', response.data.response);
      setTopLogs(response.data.response);
    } catch (error) {
      console.error('로그 데이터를 가져오는 중 오류 발생:', error);
    }
  };
  const handlePlaceChange = (selectedPlace: string) => {
    setPlace(selectedPlace); // 선택된 구를 place 상태로 저장
  };

  const [topLogs, setTopLogs] = useState<SimpleLogData[]>([
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/102', // 임시 이미지 URL
      title: '강남 패션 로그 1',
      likes: 120,
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/102', // 임시 이미지 URL
      title: '강남 패션 로그 2',
      likes: 95,
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/102', // 임시 이미지 URL
      title: '강남 패션 로그 3',
      likes: 85,
    },
  ]);
  const [tagLogs, setTagLogs] = useState<SimpleLogData[]>([
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/102', // 임시 이미지 URL
      title: '강남 패션 로그 1',
      likes: 120,
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/102', // 임시 이미지 URL
      title: '강남 패션 로그 2',
      likes: 95,
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/102', // 임시 이미지 URL
      title: '강남 패션 로그 3',
      likes: 85,
    },
  ]);
  const [keyword, setKeyword] = useState<string[]>([
    '백꾸',
    '성수동 팝업',
    '민희진 패션',
  ]);

  useEffect(() => {
    // 구가 변경될 때마다 해당 구의 top 3 로그를 가져오는 함수

    getTopLogsHandler();
  }, [place]); // place가 변경될 때마다 실행

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
          <div className="recommend-button-inner">
            <div>주간 요약</div>
            <div className="recommend-bottom-bar"></div>
          </div>
          <div className="recommend-button-inner">
            <div className="recommend-log-text">추천 로그</div>
            <div className="recommend-bottom-bar none"></div>
          </div>
        </div>
      </div>
      <div className="recommend-contents-container">
        <Dropdown list={guOffice} onSelect={handlePlaceChange} />
        <div>
          <div>
            <div className="top-fashion-log-text">이번주 top 패션로그</div>

            <TopFashionLog topLogs={topLogs} />
          </div>
          <div>
            <div className="top-fashion-log-text">이번주 태그 top 플레이스</div>

            <TopFashionLog topLogs={tagLogs} />
          </div>
        </div>
        <div className="weekend-hot-keyword-container">
          <div className="top-fashion-log-text">이번주 핫키워드</div>
          <div className="weekend-hot-keyword-item">
            {keyword.map((word, index) => (
              <div key={index} className="keyword-text">
                #{word}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
