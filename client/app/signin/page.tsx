import React from 'react';
import KakaoLogin from '@/components/SocialSignin/KakaoLogin';
import Link from 'next/link';
import NaverLogin from '@/components/SocialSignin/NaverLogin';
import GoogleLogin from '@/components/SocialSignin/GoogleLogin';

const page = () => {
  return (
    <>
      <div className="home-container">
        <img src="/image/home_main_text.png" className="home-main-text" />
        <img src="/image/home_sub_text.png" className="home-sub-text" />
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
        </div>

        <Link href={'/home'} style={{ textDecoration: 'none' }}>
          <div className="justshow-button">그냥 둘러볼게요!</div>
        </Link>
      </div>
    </>
  );
};

export default page;
