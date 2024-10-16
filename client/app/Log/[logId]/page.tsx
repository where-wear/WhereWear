//로그 보여지는 화면-> url 로그번호
'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import BackBar from '@/components/Global/BackBar';
import FollowButton from '@/components/User/FollowButton';
import { logData } from '@/types/type';
import { useRouter } from 'next/navigation';
import LogAnotherPeople from '@/components/Log/LogAnotherPeople';
import { log } from 'console';
import ArroundData from '@/components/Log/ArroundData';
const page = () => {
  const router = useRouter();
  const KAKAO_API_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
  //토큰

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, []);
  //!태그 나중에 flex-wrap해줘야함

  //날짜 변환
  function formatDate(dateString: string) {
    const date = new Date(dateString); // Date 객체 생성
    const year = date.getFullYear(); // 연도
    const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
    const day = date.getDate(); // 일

    return `${year}년 ${month}월 ${day}일`; // 원하는 형식으로 반환
  }

  const testImgUrl2: string[] = [
    'https://via.placeholder.com/300x200.png?text=80x80',
    'https://via.placeholder.com/300x200.png?text=80x80',
    'https://via.placeholder.com/300x200.png?text=80x80',
  ];
  //! 나중에 타입 설정
  const [logData, setLogData] = useState<logData>({
    userId: 1,
    creatAt: '',
    userNickname: '',
    userImage: '',

    logImageList: [''],
    text: '',
    tag: [''],
    item: [{ categoryId: 1, itemName: '' }],
    place: {
      placeName: '',
      placeAddress: '',
      placeX: 0,
      placeY: 0,
    },
    isShow: true,
  });
  const { logId } = useParams();
  //다른로그 더보기
  const showMoreLog = () => {};

  //플레이스 정보 이동
  const redirectPlaceInfo = async () => {
    const redirectUrl = await searchPlaceHandler(logData.place.placeName);

    if (redirectUrl) {
      console.log('Redirecting to:', redirectUrl);
      await router.push(redirectUrl); // 페이지 이동이 완료될 때까지 기다리기
      return; // 다음 코드가 실행되지 않도록 함
    } else {
      console.error('Redirect URL is undefined');
    }
  };

  //카카오 검색 API
  //카카오 로컬 검색 핸들러
  const searchPlaceHandler = async (query: string) => {
    try {
      const response = await axios.get(KAKAO_API_URL, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
        },
        params: {
          query,
        },
      });

      console.log(response.data.documents[0].place_url);
      return response.data.documents[0].place_url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //데이터 가져오기
  const getLogData = async () => {
    console.log('로그아이디, 토큰', logId, 'AND', token);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/log/getLog`,
        {
          params: { id: logId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data.response;
      const logImageList: string[] = data.logImages.map(
        (image: { publicUrl: string }) => image.publicUrl
      );
      const logTagList: string[] = data.tags.map(
        (tag: { tagName: string }) => tag.tagName
      );
      // 콘솔
      console.log('상세페이지', logId, response.data.response);
      setLogData({
        userId: data.user.id,
        creatAt: formatDate(data.createdAt),
        userNickname: data.user.nickname,
        userImage: data.user.image,

        logImageList: logImageList,
        text: data.text,
        tag: logTagList,
        item: [
          {
            categoryId: data.fashionItems[0].category.categoryName,

            itemName: data.fashionItems[0].itemName,
          },
        ],
        place: {
          placeName: data.place.placeName.replace(/"/g, ''),
          placeAddress: data.place.address.replace(/"/g, ''),
          placeX: data.place.x,
          placeY: data.place.y,
        },
        isShow: data.isShow,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogData();
  }, [logId, token]);

  return (
    <>
      <BackBar text="" />
      <div
        className="log-photo-box"
        style={{
          backgroundImage: `url(${logData.logImageList[0]})`, // JSX에서 이미지 동적으로 삽입
        }}
      >
        {/* 버튼 */}
        <div className="log-image-button-container">
          <div className="log-image-button-inner">
            <img src="/image/leftsvg.svg" className="svg-size" />
          </div>
          <div className="log-image-button-inner">
            <img src="/image/rightsvg.svg" className="svg-size" />
          </div>
        </div>

        <div className="log-photo-text">
          <div className="log-place-name-text">{logData.place.placeName}</div>
          <div className="log-place-address-text">
            {logData.place.placeAddress}
          </div>
        </div>
      </div>
      <div className="log-underbar-container">
        <div className="log-photo-underbar"></div>
      </div>
      <div className="log-another-user-circle-container">
        <div className="log-another-user-circle">
          <LogAnotherPeople
            x={logData.place.placeX}
            y={logData.place.placeY}
            token={token}
          />
        </div>

        <div className="log-show-more" onClick={showMoreLog}>
          ...
        </div>
      </div>
      <hr className="log-hr" />
      <div className="log-user-contents-container">
        <div className="log-user-contents-box">
          <div className="log-user-image">
            <img src={`${logData.userImage}`} />
          </div>
          <div className="log-nickname-date-container">
            <div className="log-nickname">{logData.userNickname}</div>
            <div className="log-date">{logData.creatAt}</div>
          </div>
        </div>

        {/* token 값이 있을 때만 FollowButton을 렌더링 */}
        {token ? <FollowButton token={token} userID={logData.userId} /> : <></>}
      </div>
      <div className="log-maintext">{logData.text}</div>
      <div className="log-tag-container">
        {logData.tag.map((tag, index) => (
          <div key={index} className="log-tag">
            <div className="tag-inner"># {tag}</div>
          </div>
        ))}
      </div>
      <div className="log-item-container">
        <div className="log-item-title">패션정보</div>
        <div className="log-item-inner">
          {/* 여기 컴포넌트로 만들어야함 */}
          상의 {'>'} 니트/스웨터 {'>'} {"'"}폴로 반팔 니트{"'"}
        </div>
        <div className="log-item-inner">
          상의 {'>'} 니트/스웨터 {'>'} {"'"}폴로 반팔 니트{"'"}
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
          {/* {testImgUrl2.map((url, index) => (
            <div key={index}>
              <img src={url} />
            </div>
          ))} */}
          <ArroundData
            x={logData.place.placeX}
            y={logData.place.placeY}
            token={token}
          />
        </div>
      </div>
    </>
  );
};

export default page;
