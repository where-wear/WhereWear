'use client';
import AddLogPhoto from '@/components/AddLog/AddLogPhoto';
import BackBar from '@/components/Global/BackBar';
import React from 'react';

const page = () => {
  function addLogFormHandler() {
    //Todo: formdata제출
    return;
  }
  return (
    <>
      <BackBar text="패션로그 작성" />
      {/* 사진 업로드 */}
      <AddLogPhoto />

      <div className="add-log-button" onClick={addLogFormHandler}>
        <p>패션 로그 업로드하기</p>
      </div>
    </>
  );
};

export default page;
