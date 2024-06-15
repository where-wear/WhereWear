import AddLogItem from '@/components/AddLog/AddLogItem';
import AddTitle from '@/components/Global/AddTitle';
import React from 'react';

const page = () => {
  return (
    <>
      <AddTitle text="패션 아이템 추가" />
      <AddLogItem />
    </>
  );
};

export default page;
