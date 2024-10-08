//로그 보여지는 화면-> url 로그번호
"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import BackBar from "@/components/Global/BackBar";
const page = () => {
  //태그 나중에 flex-wrap해줘야함
  const testTag: string[] = ["태그예시1", "태그예시2", "태그긴문장예시3"];
  const testImgUrl: string[] = [
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxmbG93ZXJ8ZW58MHx8fHwxNjEyNzI4MTU0&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJvYXQlMjBvY2VhbnxlbnwwfHx8fDE2MDA5ODUyODg&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE3fHxkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNjEyNzMwMDEw&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE3fHxkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNjEyNzMwMDEw&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvb2R8ZW58MHx8fHwxNjEyNzMwMTQy&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRyZWV8ZW58MHx8fHwxNjEyNzMwMzE1&ixlib=rb-1.2.1&q=80&w=400",
  ];
  const testImgUrl2: string[] = [
    "https://via.placeholder.com/300x200.png?text=80x80",
    "https://via.placeholder.com/300x200.png?text=80x80",
    "https://via.placeholder.com/300x200.png?text=80x80",
  ];

  const { logId } = useParams();
  //다른로그 더보기
  const showMoreLog = () => {};
  //로그작성자 팔로우
  const followLogUser = async () => {};
  //플레이스 정보 이동
  const redirectPlaceInfo = () => {};

  //데이터 가져오기
  const getLogData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/log/getLog`,
        {
          params: { id: logId },
        }
      );
      console.log(response);
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
        <div className="log-photo-text">
          <div className="log-place-name-text">장소 이름</div>
          <div className="log-place-address-text">로그주소</div>
        </div>
      </div>
      <div className="log-underbar-container">
        <div className="log-photo-underbar"></div>
      </div>
      <div className="log-another-user-circle-container">
        <div className="log-another-user-circle">
          {testImgUrl.map((url, index) => (
            <div key={index} className="log-another-user-circle-inner">
              <div>
                <img src={url} />
              </div>
            </div>
          ))}
        </div>

        <div className="log-show-more" onClick={showMoreLog}>
          ...
        </div>
      </div>
      <hr className="log-hr" />
      <div className="log-user-contents-container">
        <div className="log-user-contents-box">
          <div className="log-user-image"></div>
          <div className="log-nickname-date-container">
            <div className="log-nickname">닉네임</div>
            <div className="log-date">3000년 13월 47일</div>
          </div>
        </div>
        <div className="log-follow-button" onClick={followLogUser}>
          + 팔로우
        </div>
      </div>
      <div className="log-maintext">게시글 내용 입니다.</div>
      <div className="log-tag-container">
        {testTag.map((tag, index) => (
          <div key={index} className="log-tag">
            <div className="tag-inner"># {tag}</div>
          </div>
        ))}
      </div>
      <div className="log-item-container">
        <div className="log-item-title">패션정보</div>
        <div className="log-item-inner">
          상의 {">"} 니트/스웨터 {">"} {"'"}폴로 반팔 니트{"'"}
        </div>
        <div className="log-item-inner">
          상의 {">"} 니트/스웨터 {">"} {"'"}폴로 반팔 니트{"'"}
        </div>
      </div>
      <hr className="log-hr" />
      <div className="log-place-container">
        <div className="log-place-title">플레이스 정보</div>
        <div className="log-place-redirect-button-container">
          <div className="log-place-redirect-button">
            <img src="/image/logPlacePointer.png" />
            <div className="log-place-button-text" onClick={redirectPlaceInfo}>
              장소이름 바로확인
            </div>
          </div>
        </div>
      </div>
      <hr className="log-hr" />
      <div className="log-arround-container">
        <div className="log-arround-info">주변정보</div>
        <div className="log-arround-info-image">
          {testImgUrl2.map((url, index) => (
            <div key={index}>
              <img src={url} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
