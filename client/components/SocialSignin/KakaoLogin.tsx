"use client";
import React from "react";

const KakaoLogin = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="social-login-button kakao-button ">
      <div className="social-login-image">
        <img
          style={{ width: "50px" }}
          onClick={handleLogin}
          src="/image/kakaoLogo.png"
          alt="카카오 로그인"
        />
      </div>

      <div>카카오로 시작하기</div>
    </div>
  );
};

export default KakaoLogin;
