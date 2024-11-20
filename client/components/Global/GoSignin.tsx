'use client';
import React from 'react';
import KakaoLogin from '@/components/SocialSignin/KakaoLogin';
import Link from 'next/link';
import NaverLogin from '@/components/SocialSignin/NaverLogin';
import GoogleLogin from '@/components/SocialSignin/GoogleLogin';

const GoSignin = () => {
  return (
    <>
      <div className="go-login-back">
        <div className="top-black-container">
          <div className="recommend-title-container">
            <div className="recommend-usernickname-text">
              더 많은 컨텐츠를 위한
            </div>
            <div className="recommend-place-text">간편 로그인</div>
          </div>
          <div className="recommendW">
            <img src="/image/recommendW.png" alt="로고" />
          </div>
        </div>

        <div className="go-login-container">
          <div className="kakao-login-icon">
            <KakaoLogin />
          </div>
          <div className="naver-login-icon">
            <NaverLogin />
          </div>
          <div className="google-login-icon">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoSignin;
