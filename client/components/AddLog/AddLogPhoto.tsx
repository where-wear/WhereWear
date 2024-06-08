// todo 멀터기능 추가
//todo 네모난 상자를 누르면 사진 입력 map으로 돌려서 이미지 표시
import React from 'react';

const AddLogPhoto = () => {
  return (
    <>
      <div className="photo-box">
        <label className="photo-label">
          <input type="file"></input>
          <div>사진을 선택 해주세요</div>
        </label>
        <div className="photo-box-text">
          <div>플레이스에서의 패션 추억을 공유해주세요.</div>
          <div>첫 번째 사진이 대표 사진으로 등록됩니다.</div>
        </div>
      </div>
    </>
  );
};

export default AddLogPhoto;
