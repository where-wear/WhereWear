import AddLogTag from '@/components/AddLog/AddLogTag';
import AddTitle from '@/components/Global/AddTitle';
import React from 'react';

const page = () => {
  return (
    <>
      <AddTitle text="태그 편집" />
      <AddLogTag />
    </>
  );
};

export default page;
