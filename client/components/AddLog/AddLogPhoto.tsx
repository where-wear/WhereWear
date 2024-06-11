// todo 멀터기능 추가
//todo 네모난 상자를 누르면 사진 입력 map으로 돌려서 이미지 표시
import React from 'react';

const AddLogPhoto = () => {
  return (
    <>
      <div className="photo-box">
        <label className="photo-label">
          <input type="file"></input>
          <div>사진추가</div>
          <img src="/image/plusImage.svg" alt="" />
          <div>(1/10)</div>
        </label>
      </div>
    </>
  );
};

export default AddLogPhoto;
