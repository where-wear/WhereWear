'use client';
import React from 'react';

const NaverLogin = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`;
  };

  return (
    <div className="social-login-button naver-button " onClick={handleLogin}>
      <div className="social-login-image">
        <img
          style={{ width: '20px' }}
          src="/image/naverLogo.png"
          alt="네이버 로그인"
        />
      </div>

      <div>네이버로 시작하기</div>
    </div>
  );
};

export default NaverLogin;
