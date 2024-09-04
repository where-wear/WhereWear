'use client';
import React from 'react';

const GoogleLogin = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div>
      <img
        style={{ cursor: 'pointer' }}
        onClick={handleLogin}
        src="/image/google_login_button.svg"
        alt="구글 로그인"
      />
      구글 로그인
    </div>
  );
};

export default GoogleLogin;
