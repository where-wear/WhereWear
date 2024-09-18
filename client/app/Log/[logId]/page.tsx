//로그 보여지는 화면-> url 로그번호
'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import BackBar from '@/components/Global/BackBar';
const page = () => {
  const { logId } = useParams();
  //다른로그 더보기
  const showMoreLog = () => {};
  //로그작성자 팔로우
  const followLogUser = async () => {};

  //데이터 가져오기
  const getLogData = async () => {
    try {
      const response = await axios.get('/', {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogData();
  }, [logId]);

  return (
    <>
      <BackBar text="" />
      <div className="log-photo-box">
        사진데이터
        <div>장소이름</div>
      </div>
      <div className="log-another-user-circle-container">
        <div className="log-another-user-circle">
          같은 위치에 로그올린사람들의 이미지
        </div>
        <div className="log-show-more" onClick={showMoreLog}>
          ...
        </div>
      </div>

      <div className="log-user-contents-container">
        <div className="log-user-contents-box">
          <div className="log-user-image">사진</div>
          <div>
            <div>닉네임</div>
            <div>3000년 13월 47일</div>
          </div>
        </div>
        <button className="log-follow-button" onClick={followLogUser}>
          +팔로우
        </button>
      </div>
      <div>게시글 내용 입니다.</div>
      <div>태그- 로그추가할때 썼던 css재활용하기</div>
      <div>
        <div>패션정보</div>
        <div>
          상의 {'>'} 니트/스웨터 {'>'} '폴로 반팔 니트'
        </div>
      </div>
      <div className="log-place-container">
        <div className="log-place-title">플레이스 정보</div>
        <div className="log-place-redirect-button">플레이스 정보 버튼 </div>
      </div>
      <div>주변정보 사진 랜덤</div>
    </>
  );
};

export default page;
