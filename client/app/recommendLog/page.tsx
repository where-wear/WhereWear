"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface LogData {
  id: number;
  imageUrl: string;
  title: string;
  likes: number;
}

const page = () => {
  const [userNickname, setUserNickname] = useState<string>("Jiwon");
  const [place, setPlace] = useState<string>("송파구");
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setToken(accessToken);
  }, [token]);

  const [topLogs, setTopLogs] = useState<LogData[]>([
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/102", // 임시 이미지 URL
      title: "강남 패션 로그 1",
      likes: 120,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/102", // 임시 이미지 URL
      title: "강남 패션 로그 2",
      likes: 95,
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/102", // 임시 이미지 URL
      title: "강남 패션 로그 3",
      likes: 85,
    },
  ]);
  const [keyword, setKeyword] = useState<string[]>([
    "백꾸",
    "성수동 팝업",
    "민희진 패션",
  ]);

  useEffect(() => {
    // 구가 변경될 때마다 해당 구의 top 3 로그를 가져오는 함수
    const getTopLogsHandler = async () => {
      // 추천로그 데이터를 가져오는 코드 (API 요청)
      try {
        const response: LogData[] = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/explore`,
          {
            params: { category: place },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);

        // 좋아요 수 기준으로 내림차순 정렬 후 상위 3개만 slice
        const sortedData = response
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 3);
        setTopLogs(sortedData);
      } catch (error) {
        console.error("로그 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    getTopLogsHandler();
  }, [place]); // place가 변경될 때마다 실행

  return (
    <>
      <div className="top-black-container">
        <div className="recommend-title-container">
          <div className="recommend-usernickname-text">
            {userNickname}님을 위한
          </div>
          <div className="recommend-place-text">{place}에 뭐 입고 가지?</div>
        </div>
        <div className="recommendW">
          <img src="/image/recommendW.png" alt="로고" />
        </div>

        <div className="recommend-button-container">
          <div className="recommend-button-inner">
            <div>주간 요약</div>
            <div className="recommend-bottom-bar"></div>
          </div>
          <div className="recommend-button-inner">
            <div className="recommend-log-text">추천 로그</div>
            <div className="recommend-bottom-bar none"></div>
          </div>
        </div>
      </div>
      <div className="recommend-contents-container">
        <label className="recommend-drop-down-label">
          <div className="test-drop-down">
            <div className="rkdskarn">강남구</div>{" "}
            <div className="ghktkfvy"> ﹀</div>
          </div>
        </label>

        <div>
          <div>
            <div className="top-fashion-log-text">이번주 top 패션로그</div>

            <div className="top-fashion-log-container">
              {topLogs.map((log) => (
                <div key={log.id} className="top-fashion-log-item">
                  <img
                    src={log.imageUrl}
                    alt={log.title}
                    className="log-image"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="top-fashion-log-text">이번주 태그 top 플레이스</div>

            <div className="top-fashion-log-container">
              {topLogs.map((log) => (
                <div key={log.id} className="top-fashion-log-item">
                  <img
                    src={log.imageUrl}
                    alt={log.title}
                    className="log-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="weekend-hot-keyword-container">
          <div className="top-fashion-log-text">이번주 핫키워드</div>
          <div className="weekend-hot-keyword-item">
            {keyword.map((word, index) => (
              <div key={index} className="keyword-text">
                #{word}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
