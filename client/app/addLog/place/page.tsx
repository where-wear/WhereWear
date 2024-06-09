//지도와 연동된 위치 가져오기
import AddLogPlace from '@/components/AddLog/AddLogPlace';
import AddTitle from '@/components/Global/AddTitle';
import React from 'react';

const page = () => {
  return (
    <>
      <AddTitle text="플레이스 추가" />
      <AddLogPlace />
    </>
  );
};

export default page;
