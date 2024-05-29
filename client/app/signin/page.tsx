import React from 'react';
import KakaoLogin from '@/components/SocialSignin/KakaoLogin';
import Link from 'next/link';

const page = () => {
  return (
    <>
      <KakaoLogin />
      <Link href={'/home'}>
        <button>둘러보기</button>
      </Link>
    </>
  );
};

export default page;
