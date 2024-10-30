//좋아한로그 log
'use client';
import Dropdown from '@/components/Global/Dropdown';
import axios from 'axios';
import Dropbox from 'next-auth/providers/dropbox';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, [token]);

  const guOffice = [
    '전체',
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
  //! 사용할 변수값
  const [thisGu, setThisGu] = useState<string | number>('전체');

  const getLikeLogHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/liked`,
        {
          params: { userId: 8 },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.response);
      const res = response.data.response;

      const placeData = res.map(
        (data: {
          id: number;
          logImages: [{ publicUrl: string }];
          place: { placeName: string; address: string };
        }) => ({
          imgUrl: data.logImages[0].publicUrl,
          address: data.place.address.replace(/"/g, ''),
          logId: data.id,
          placeName: data.place.placeName.replace(/"/g, ''),
        })
      );
      setLikeLogData(placeData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token) {
      getLikeLogHandler();
    }
  }, [token]);

  const [likeLogData, setLikeLogData] = useState<
    { imgUrl: string; address: string; logId: number; placeName: string }[]
  >([
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
      placeName: '',
    },
  ]);
  const handlePlaceChange = (selectedPlace: string | number) => {
    if (typeof selectedPlace === 'string') {
      // string 타입일 때 처리할 로직
      setThisGu(selectedPlace);
    }
  };

  // 필터링 로직 추가
  const filteredLikeLogData =
    thisGu === '전체'
      ? likeLogData // 전체 데이터 보여줌
      : likeLogData.filter((data) => data.address.startsWith(`서울 ${thisGu}`));

  return (
    <>
      <div className="like-log-header">좋아한 로그</div>
      <div className="like-log-dropdown-container">
        <Dropdown list={guOffice} onSelect={handlePlaceChange} title="전체" />
      </div>
      <div>
        <div className="like-log-container">
          {filteredLikeLogData.map((data, index) => (
            <div key={data.logId} className="like-log-click">
              <Link href={`/Log/${data.logId}`} className="like-log-link">
                <div className="like-log-inner">
                  <div className="like-log-image">
                    <img src={`${data.imgUrl}`} />
                  </div>
                  <div className="like-place-plcename-container">
                    <div className="like-place-plcename">{data.placeName}</div>
                    <div className="like-place-address">
                      <img src="/image/placeNamepin.png" />
                      <div className="like-place-address-text">
                        {data.address}
                      </div>
                    </div>
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
