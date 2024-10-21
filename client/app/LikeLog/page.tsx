//좋아한로그 log
'use client';
import Dropdown from '@/components/Global/Dropdown';
import Dropbox from 'next-auth/providers/dropbox';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  const redirectLog = () => {
    // 로그 누르면 리다이렉트
  };
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
  const [likeLogParams, setLikeLogParams] = useState({
    gu: '',
    height: 0,
    weight: 0,
    footSize: 0,
    job: '',
  });
  const [likeLogData, setLikeLogData] = useState([
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
  ]);
  const handlePlaceChange = (selectedPlace: string) => {
    setLikeLogParams((prevParams) => ({
      ...prevParams,
      gu: selectedPlace, // 선택된 구로 업데이트
    }));
  };
  return (
    <>
      <div className="like-log-header">좋아한 로그</div>
      <div className="like-log-dropdown-container">
        <Dropdown list={guOffice} onSelect={handlePlaceChange} />
      </div>
      <div>
        <div className="like-log-container">
          {likeLogData.map((data, index) => (
            <div
              key={data.logId}
              className="like-log-click"
              onClick={redirectLog}
            >
              <Link href={`/Log/${data.logId}`} className="like-log-link">
                <div className="like-log-inner">
                  <div className="like-log-image">
                    <img src={`${data.imgUrl}`} />
                  </div>
                  <div className="like-place-plcename">플레이스명</div>
                  <div className="like-place-address">
                    <img src="/image/placeNamepin.png" />
                    <div>플레이스 주소</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
