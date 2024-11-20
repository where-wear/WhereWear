'use client';
import React, { useEffect } from 'react';
import { BackBarTextType } from '@/types/type';
import { useRouter } from 'next/navigation';
import { useStore } from '@/Zustand/store';
const BackBar = (props: BackBarTextType) => {
  const router = useRouter();

  const removeLogData = useStore((state) => state.removeLogData);
  return (
    <>
      <div className="back-arrow-block">
        <div
          onClick={() => {
            router.push('/home');
            removeLogData();
          }}
          className="back-arrow-inner"
        >
          <img src="/image/back-arrow.svg" />
          <div className="back-bar-text">{props.text}</div>
        </div>
      </div>
    </>
  );
};

export default BackBar;
