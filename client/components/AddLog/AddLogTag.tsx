//todo: 되돌아가기 버튼을 누를경우 store의 tag값을날려야함
'use client';
import React, { useState, useEffect } from 'react';
import { useStore } from '@/Zustand/store';

const AddLogTag = () => {
  const [tag, setTag] = useState('');

  const logData = useStore((state) => state.logData);
  const setLogData = useStore((state) => state.setLogData);
  const [tagArray, setTagArray] = useState<string[]>(logData.tag);
  // 태그 추가 핸들러
  const addTag = () => {
    if (tag && tagArray.length < 10) {
      const newTagArray = [...tagArray, tag];
      setTagArray(newTagArray);
      setLogData({
        ...logData,
        tag: newTagArray,
      });
      setTag('');
    } else {
      setTag(''); // 10개 넘는 경우 그냥 인풋 값 비움
      // todo: 나중에 경고창 뜨거나 하단에 알림을 적어야함
    }
  };

  // 키 다운 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 엔터 동작(폼 제출)을 방지
      addTag();
    }
  };

  // 태그 삭제 핸들러
  const removeTag = (indexToRemove: number) => {
    const newTagArray = tagArray.filter((_, index) => index !== indexToRemove);
    setTagArray(newTagArray);
    setLogData({
      ...logData,
      tag: newTagArray,
    });
  };
  //! 임시 주석
  // logData가 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log(logData);
  }, [logData]);

  return (
    <>
      <div className="add-log-tag-container">
        <label>
          <input
            type="text"
            value={tag}
            placeholder="#태그 입력 후 엔터(최대 10개)"
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
        <div className="show-tag-container">
          {tagArray.map((tag, index) => (
            <span key={index} className="user-tag-container">
              <div className="user-tag-inner">
                <div className="user-hashtag">#</div>
                {tag}
                <div onClick={() => removeTag(index)}>
                  <img src="/image/tagDelete.svg" alt="태그 삭제 버튼" />
                </div>
              </div>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddLogTag;
