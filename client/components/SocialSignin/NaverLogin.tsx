'use client';
import React from 'react';

const NaverLogin = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  return (
    <div>
      <img
        style={{ cursor: 'pointer', height: '45px' }}
        onClick={handleLogin}
        src="/image/naver_login_button.png"
        alt="네이버 로그인"
      />
    </div>
  );
};

export default NaverLogin;
