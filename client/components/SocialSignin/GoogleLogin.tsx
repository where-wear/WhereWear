'use client';
import React from 'react';

const GoogleLogin = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="social-login-button google-button ">
      <div className="social-login-image">
        <img
          style={{ width: '25px' }}
          onClick={handleLogin}
          src="/image/googleLogo.png"
          alt="구글 로그인"
        />
      </div>

      <div className="social-login-text">구글로 시작하기</div>
    </div>
  );
};

export default GoogleLogin;
