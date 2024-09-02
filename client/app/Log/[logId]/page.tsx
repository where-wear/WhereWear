//로그 보여지는 화면-> url 로그번호
'use client';
import React from 'react';
import { useParams } from 'next/navigation';
const page = () => {
  const { logId } = useParams();

  console.log(useParams());
  return <div>라우터 번호 : {logId}</div>;
};

export default page;
