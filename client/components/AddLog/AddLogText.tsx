import React, { useState, ChangeEvent } from 'react';
import { useStore } from '@/Zustand/store';
const AddLogText = () => {
  //스토어값 가져오기
  const logData = useStore((state) => state.logData);
  const setLogData = useStore((state) => state.setLogData);

  const [text, setText] = useState<string>(logData.text);

  const textHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    setLogData({ ...logData, text: newText });
  };

  return (
    <>
      <div className="add-log-text-container">
        <div className="add-log-text-box">
          <input
            type="text"
            placeholder="플레이스에서의 패션 추억을 공유해주세요."
            onChange={textHandler}
            value={text}
          />
        </div>
      </div>
    </>
  );
};

export default AddLogText;
