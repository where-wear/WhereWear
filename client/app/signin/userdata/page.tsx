//해야할일
// 처음 들어온 유저일경우 유저의 추가 정보를 받는 페이지
'use client';
import SignData from '@/components/SignUpDetail/SignData';
import React from 'react';
import { Suspense } from 'react';
const page = () => {
  return (
    <>
      <Suspense>
        <SignData />
      </Suspense>
    </>
  );
};

export default page;
