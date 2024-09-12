'use client';
import React, { useState } from 'react';
interface UserImageProps {
  onImageChange: (file: File | null) => void; // 이미지 파일을 전달할 함수
}

const UserImage: React.FC<UserImageProps> = ({ onImageChange }) => {
  // 미리보기 이미지 설정
  const [imageUrl, setImageUrl] = useState<string>(
    '/image/profile/defaultImage.png'
  );

  // 미리보기 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl); // 미리보기 업데이트
      onImageChange(file); // 상위 컴포넌트로 파일 전달
    } else {
      onImageChange(null); // 파일이 없을 경우 null 전달
    }
  };

  return (
    <>
      <div className="signin-user-image-container">
        <div>
          <img src={`${imageUrl}`} className="signin-user-image" />
        </div>
        <div className="upload-image-container">
          {/* 이미지 파일 올리는 버튼  */}
          <label className="signin-user-upload-image">
            <input type="file" onChange={handleImageChange} />
            <img src="/image/pen.svg" />
          </label>
        </div>
      </div>
    </>
  );
};

export default UserImage;
