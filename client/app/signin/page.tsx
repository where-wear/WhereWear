import React from 'react';
import KakaoLogin from '@/components/SocialSignin/KakaoLogin';
import Link from 'next/link';

const page = () => {
  return (
    <>
      <div className="home-container">
        <img src="/image/home_main_text.png" className="home-main-text" />
        <img src="/image/home_sub_text.png" className="home-sub-text" />
        <div className="kakao-login-icon">
          <KakaoLogin />
        </div>

        <Link href={'/home'} style={{ textDecoration: 'none' }}>
          <div className="justshow-button">그냥 둘러볼게요!</div>
        </Link>
      </div>
    </>
  );
};

export default page;
