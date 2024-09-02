//팔로우 관련 설정
// 유저 이미지표시, 누르면 상대의 개인페이지로 이동, 팔로우 버튼 누르면 팔로우 되는 기능 api 연결
import React from 'react';

const Follow = () => {
  return (
    <>
      <div className="like-user-container">
        {/* flex로 가로배치 설정 */}
        <div className="like-user-photo">이미지</div>
        <div className="like-user-name">이름</div>
        <div className="like-user-follow-button">팔로우 버튼</div>
      </div>
    </>
  );
};

export default Follow;
