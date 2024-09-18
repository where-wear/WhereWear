//로그 보여지는 화면-> url 로그번호
"use client";
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import BackBar from "@/components/Global/BackBar";
const page = () => {
  const { logId } = useParams();
  const getLogData = async () => {
    try {
      const response = await axios.get("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(useParams());
  return (
    <>
      <BackBar text="" />
      <div>
        사진데이터
        <div>장소이름</div>
      </div>
      <div>같은 위치에 로그올린사람들의 이미지</div>
      <div>
        <div>로그 작성자 사진,닉네임, 날짜</div>
        <button>+팔로우</button>
      </div>
      <div>게시글 내용</div>
      <div>태그- 로그추가할때 썼던 css재활용하기</div>
      <div>패션 정보</div>
      <div>플레이스 정보-이미지 버튼 -onClick으로 위치정보관련 링크</div>
      <div>주변정보 사진 랜덤</div>
    </>
  );
};

export default page;
