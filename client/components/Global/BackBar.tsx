//text를 프롭스로 받아서 나타내기
//누르면 이전페이지로 이동
//중단하고 이전페이지로 넘어갈건지 물어보는기능 추가해야할지 => handler 함수만들어서 확인누르면 router.back()실행, 취소누르면 함수리턴
// 보통 /home으로 이동하는데 /addLog/ 가 포함되면 /addLog로 돌아가기
'use client';
import React, { useEffect } from 'react';
import { BackBarTextType } from '@/types/type';
import { useRouter } from 'next/navigation';
const BackBar = (props: BackBarTextType) => {
  const router = useRouter();

  return (
    <>
      <div className="back-arrow-block">
        <div onClick={() => router.push('/home')} className="back-arrow-inner">
          <img src="/image/back-arrow.svg" />
          <div className="back-bar-text">{props.text}</div>
        </div>
      </div>
    </>
  );
};

export default BackBar;
