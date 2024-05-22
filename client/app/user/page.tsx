'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

const page = async () => {
  const { data: session } = useSession();
  //const accessToken = session?.accessToken;

  return (
    <>
      <div>카카오 로그인 성공</div>
      <div>
        <div>
          <img src={session?.user?.image!} />
        </div>
        <div>{session?.user?.name}님 반갑습니다.</div>
        <div>jwt토큰값 </div>
      </div>
    </>
  );
};

export default page;
