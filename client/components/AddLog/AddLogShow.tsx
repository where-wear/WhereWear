'use client';
import React, { useEffect, useState } from 'react';
//todo: 누르면 구슬이 이동하는 애니메이션 넣기 데이터 값 bool값으로
//지금은 그냥 백그라운드 색상이 바뀌는것으로

const AddLogShow = () => {
  const [isShow, setIsShow] = useState<boolean>(true);

  // 전체 공개 여부 핸들러
  const logIsShowHandler = () => {
    setIsShow((prevIsShow) => !prevIsShow);
  };

  useEffect(() => {}, [isShow]);

  return (
    <>
      <div className="add-log-show-container">
        <div
          onClick={logIsShowHandler}
          className={`add-log-show-background ${
            isShow ? 'add-log-show-yes' : 'add-log-show-no'
          }`}
        >
          <div className="add-log-circle"></div>
        </div>
      </div>
    </>
  );
};

export default AddLogShow;
