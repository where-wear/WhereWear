'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/Zustand/store';

const AddLogShow = () => {
  const logData = useStore((state) => state.logData);
  const setLogData = useStore((state) => state.setLogData);
  const [isShow, setIsShow] = useState<boolean>(logData.isShow);

  // 전체 공개 여부 핸들러
  const logIsShowHandler = () => {
    const newIsShow = !isShow;
    setIsShow(newIsShow);
    setLogData({
      ...logData,
      isShow: newIsShow,
    });
  };

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
