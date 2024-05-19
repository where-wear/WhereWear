// 이미지랑 닉네임 가져옴
'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import SignOut from './SignOut';
//로그인한 유저 정보 가져오기

const KakaoLogin = () => {
  // 클릭시 카카오 로그인
  return (
    <>
      <div>
        <img
          style={{ cursor: 'pointer' }}
          onClick={() => signIn('kakao', { callbackUrl: '/user' })}
          src="/image/kakao_login_medium_wide.png"
        />
      </div>

      <SignOut />
    </>
  );
};

export default KakaoLogin;
