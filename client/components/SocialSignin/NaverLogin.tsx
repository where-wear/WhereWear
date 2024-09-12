'use client';
import React from 'react';

const NaverLogin = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  return (
    <div className="social-login-button naver-button ">
      <div className="social-login-image">
        <img
          style={{ width: '20px' }}
          onClick={handleLogin}
          src="/image/naverLogo.png"
          alt="네이버 로그인"
        />
      </div>

      <div>네이버로 시작하기</div>
    </div>
  );
};

export default NaverLogin;
