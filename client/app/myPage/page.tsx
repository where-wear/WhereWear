//유저 개인의 페이지
//url구별은 userId사용 페이지 이름엔 닉네임이 들어가게
//이미지 클릭시 관련 로그로 넘어감
//나랑 userID 다른경우 팔로우 버튼이 보임
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const page = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, []);

  useEffect(() => {
    getMyPageData();
  }, []);

  const getMyPageData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/log/getLogs`,
        {
          params: { userId: null },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('마이페이지 데이터', response);
    } catch (err) {
      console.log(err);
    }
  };
  const [myPageData, setMyPageData] = useState([
    {
      imageUrl: 'https://via.placeholder.com/100',
      logId: '1',
      placeName: '플레이스명',
    },
    {
      imageUrl: 'https://via.placeholder.com/100',
      logId: '1',
      placeName: '플레이스명',
    },
    {
      imageUrl: 'https://via.placeholder.com/100',
      logId: '1',
      placeName: '플레이스명',
    },
    {
      imageUrl: 'https://via.placeholder.com/100',
      logId: '1',
      placeName: '플레이스명',
    },
  ]);

  return (
    <>
      <div className="my-page-container">
        <div className="my-page-user-container">
          <div className="my-page-image">
            <div className="my-page-image-inner"></div>
          </div>
          <div className="my-page-user-nickname">
            <div className="my-page-user-nickname-inner">닉네임</div>
          </div>
        </div>
        <div className="my-page-data-container">
          <div className="my-page-button-container">
            <div className="my-page-button">
              <img src="/image/mypagepen.svg" />
            </div>
            <Link href={'/setting'}>
              {' '}
              <div className="my-page-button">
                <img src="/image/mypageedit.svg" />
              </div>
            </Link>
          </div>
          <div className="my-page-log-follow">
            <div className="my-page-number">
              <div>로그 개수</div>
              <div className="my-page-number-inner">100</div>
            </div>
            <div className="my-page-number">
              <div>팔로잉</div>
              <div className="my-page-number-inner">100</div>
            </div>
            <div className="my-page-number">
              <div>팔로잉</div>
              <div className="my-page-number-inner">100</div>
            </div>
          </div>
          <div className="my-page-coment">
            소개글 어쩌고 저쩌고 어쩌고 저쩌고어쩌고 저쩌고어쩌고 저쩌고어쩌고
            저쩌고어쩌고 저쩌고
          </div>
        </div>
      </div>
      <hr className="my-page-hr" />
      <div className="maypage-log-container">
        <div className="my-page-log-image-container">
          {myPageData.map((data) => (
            <div key={data.logId} className="my-page-log-image-inner">
              <img src={data.imageUrl} alt="" className="my-page-log-image" />
              <div className="my-page-log-place-name">
                <img src="/image/placeNamepin.png" />
                {data.placeName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
