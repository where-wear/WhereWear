"use client";
import React from "react";

const KakaoLogin = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  return (
    <div>
      <img
        style={{ cursor: "pointer" }}
        onClick={handleLogin}
        src="/image/kakao_login_medium_wide.png"
        alt="카카오 로그인"
      />
    </div>
  );
};

export default KakaoLogin;
