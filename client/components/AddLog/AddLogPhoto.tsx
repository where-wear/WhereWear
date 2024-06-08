// 멀터기능 추가
//네모난 상자를 누르면 사진 입력
import React from 'react';

const AddLogPhoto = () => {
  return (
    <>
      <label className="photo-label">
        <input type="file"></input>
        <div>사진을 선택 해주세요</div>
      </label>
    </>
  );
};

export default AddLogPhoto;
