'use client';
import AddLogPhoto from '@/components/AddLog/AddLogPhoto';
import BackBar from '@/components/Global/BackBar';
import Link from 'next/link';
import React from 'react';
//! Link쓰면 주소가 저장되기때문에 모달창뜨는 느낌으로 바뀌어야 할 것같다 (중간 발표전에는 못고칠 예정) 또는 주소가 저장되지않게 하는방법도 있음
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
      <hr className="hr-style" />
      <div className="add-log-component-box">
        <Link href={'/addLog/tag'} className="add-log-inner ">
          <div>태그입력</div>
          <div>
            <img src="/image/right-arrow.svg" alt="" />
          </div>
        </Link>
        <Link href={'/addLog/Item'} className="add-log-inner ">
          <div>패션 아이템 추가</div>
          <div>
            <img src="/image/right-arrow.svg" alt="" />
          </div>
        </Link>
        <Link href={'/addLog/place'} className="add-log-inner ">
          <div>플레이스 추가</div>
          <div>
            <img src="/image/right-arrow.svg" alt="" />
          </div>
        </Link>
        <div className="add-log-inner">
          <div>전체공개</div>
          <div>
            <img src="/image/right-arrow.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="add-log-button" onClick={addLogFormHandler}>
        <p>패션 로그 업로드하기</p>
      </div>
    </>
  );
};

export default page;
