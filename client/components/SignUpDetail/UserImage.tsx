import React, { useState } from 'react';

const UserImage = () => {
  // 유저 이미지 주소
  const [imageUrl, setImageUrl] = useState<string>(
    '/image/profile/defaultImage.png'
  );
  const getImageHandler = async () => {
    //이미지 올린후 멀티파트 사용
  };
  return (
    <>
      <div>
        <img src={`${imageUrl}`} />
      </div>
      <div onClick={getImageHandler}>{/* 수정할때 쓰는 버튼 */}</div>
    </>
  );
};

export default UserImage;
