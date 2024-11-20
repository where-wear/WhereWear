'use client';
import React from 'react';
import KakaoLogin from '@/components/SocialSignin/KakaoLogin';
import Link from 'next/link';
import NaverLogin from '@/components/SocialSignin/NaverLogin';
import GoogleLogin from '@/components/SocialSignin/GoogleLogin';

const page = () => {
  const deleteToken = () => {
    localStorage.removeItem('accessToken');
  };
  return (
    <>
      <div className="home-container">
        <div className="home-container">
          <div
            style={{ whiteSpace: 'pre-line' }}
            className="home-main-text"
          >{`어디에 \n 뭐 입고 가지?`}</div>

          <div className="home-sub-text">WHERE WEAR | 웨어웨어</div>
        </div>
        <div className="snsLogin-container">
          <div className="kakao-login-icon">
            <KakaoLogin />
          </div>
          <div className="naver-login-icon">
            <NaverLogin />
          </div>
          <div className="google-login-icon">
            <GoogleLogin />
          </div>

          <Link
            href={'/home'}
            style={{ textDecoration: 'none' }}
            onClick={deleteToken}
          >
            <div className="justshow-button">그냥 둘러볼게요!</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
