'use client';
import KakaoMap from '@/components/Home/KakaoMap';
import React, { useEffect } from 'react';

const page = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // URL 쿼리에서 token 값을 가져옴
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        localStorage.setItem('accessToken', token);
      }
    }
  }, []);

  return (
    <>
      <KakaoMap />
    </>
  );
};

export default page;
