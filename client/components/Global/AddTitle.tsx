//todo: 취소 버튼을 누르면 리덕스값이 날아가게 만들고 확인 누르면 핸들러 작동 리덕스 필요한가?
//! router에 기록안되게 하는 페이지를 만들 수 있는지 알아보기
import React from 'react';
import { AddTitlePropsType } from '@/types/type';
import Link from 'next/link';

const AddTitle = (props: AddTitlePropsType) => {
  return (
    <>
      <div className="addtitle-container">
        <div className="addtitle-box">
          <Link href={'/addLog'} className="addtitle-inner">
            취소
          </Link>
          <div className="addtitle-text">{props.text}</div>
          <Link href={'/addLog'} className="addtitle-inner">
            확인
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddTitle;
