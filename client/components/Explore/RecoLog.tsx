'use client';
import React, { useState } from 'react';
import Dropdown from '../Global/Dropdown';
interface RecoLogPropsType {}
const RecoLog = (props: RecoLogPropsType) => {
  const guOffice = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ];
  const [recoLogParams, setRecoLogParams] = useState({
    gu: '',
    height: 0,
    weight: 0,
    footSize: 0,
    job: '',
  });
  const handlePlaceChange = (selectedPlace: string) => {
    setRecoLogParams((prevParams) => ({
      ...prevParams,
      gu: selectedPlace, // 선택된 구로 업데이트
    }));
  };
  return (
    <>
      <div className="recommend-contents-container">
        <Dropdown list={guOffice} onSelect={handlePlaceChange} />
        <div>
          <div>{/* 여기 이제 가져온 데이터 값 */}</div>
        </div>
      </div>
    </>
  );
};

export default RecoLog;
