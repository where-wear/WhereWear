'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

const KakaoLogin = () => {
  // 클릭시 카카오 로그인
  return (
    <>
      <div>카카오 로그인</div>

      <img
        style={{ cursor: 'pointer' }}
        onClick={() => signIn('kakao')}
        src="/image/kakao_login_medium_wide.png"
      />

      {/* 나중에css가져와야함 */}
    </>
  );
};

export default KakaoLogin;
