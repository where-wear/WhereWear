'use client';
import React from 'react';

const GoogleLogin = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="social-login-button google-button " onClick={handleLogin}>
      <div className="social-login-image">
        <img
          style={{ width: '25px' }}
          src="/image/googleLogo.png"
          alt="구글 로그인"
        />
      </div>

      <div className="social-login-text">구글로 시작하기</div>
    </div>
  );
};

export default GoogleLogin;
