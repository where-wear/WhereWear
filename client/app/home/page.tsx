'use client';
import KakaoMap from '@/components/Home/KakaoMap';
import React, { useEffect } from 'react';

const page = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let accessToken = localStorage.getItem('accessToken') || '';
      if (!accessToken) {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
          localStorage.setItem('accessToken', token);
          accessToken = token;
        }
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
