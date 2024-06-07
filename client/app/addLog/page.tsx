import BackBar from '@/components/Global/BackBar';
import React from 'react';

const page = () => {
  return (
    <>
      <BackBar text="패션로그 작성" />
      <div className="add-log-button">
        <p>패션 로그 업로드하기</p>
      </div>
    </>
  );
};

export default page;
