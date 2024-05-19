'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

const page = () => {
  const { data: session } = useSession();
  return (
    <>
      <div>카카오 로그인 성공</div>
      <div>
        <div>
          <img src={session?.user?.image!} />
        </div>
        <div>{session?.user?.name}님 반갑습니다.</div>
      </div>
    </>
  );
};

export default page;
