//유저 개인의 페이지
//url구별은 userId사용 페이지 이름엔 닉네임이 들어가게
//이미지 클릭시 관련 로그로 넘어감
//나랑 userID 다른경우 팔로우 버튼이 보임
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, []);

  useEffect(() => {
    if (token) {
      getMyPageData();
    }
  }, [token]);

  const { userId } = useParams();
  const getMyPageData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/log/getLogs`,
        {
          params: { userId: { userId } },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('마이페이지 데이터', response.data.response);
      const mydataRes = response.data.response;

      // const logData =mydataRes.map((data,index)=>())
      const logData = await mydataRes.map((log: any) => ({
        id: log.id,
        logImgUrl: log.logImages[0].publicUrl, // 첫번째 이미지를 로그 이미지로 설정
        placeName: log.place.placeName,
      }));
      setMyPageData({
        userData: {
          imgUrl: mydataRes[0].user.image,
          nickname: mydataRes[0].user.nickname,
          logNum: mydataRes.length,
          following: 0,
          follower: 0,
          introduction: mydataRes[0].user.introduction,
        },
        logData: logData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [myPageData, setMyPageData] = useState({
    userData: {
      imgUrl: '',
      nickname: '',
      logNum: 0,
      following: 0,
      follower: 0,
      introduction: '',
    },
    logData: [
      {
        id: 0,
        logImgUrl: '',
        placeName: '',
      },
    ],
  });
  useEffect(() => {
    console.log(myPageData);
  }, [myPageData]);

  return (
    <>
      <div className="my-page-container">
        <div className="my-page-button-container">
          <div className="my-page-button">
            <img src="/image/mypagepen.svg" />
          </div>
          <Link href={'/setting'}>
            <div className="my-page-button">
              <img src="/image/mypageedit.svg" />
            </div>
          </Link>
        </div>

        <div className="my-page-data-container">
          <div className="my-page-user-container">
            <div className="my-page-image">
              <img
                src={myPageData.userData.imgUrl}
                alt="프로필 이미지"
                className="my-page-image-inner"
              />
            </div>
            <div className="my-page-user-nickname">
              <div className="my-page-user-nickname-inner">
                {myPageData.userData.nickname}
              </div>
            </div>
          </div>
          <div className="my-page-log-out-box">
            <div className="my-page-log-follow">
              <div className="my-page-number">
                <div>패션로그</div>
                <div className="my-page-number-inner">
                  {myPageData.userData.logNum}
                </div>
              </div>
              <div className="vertical-line"></div>
              <div className="my-page-number">
                <div>팔로잉</div>
                <div className="my-page-number-inner">
                  {myPageData.userData.following}
                </div>
              </div>
              <div className="vertical-line"></div>
              <div className="my-page-number">
                <div>팔로워</div>
                <div className="my-page-number-inner">
                  {myPageData.userData.follower}
                </div>
              </div>
            </div>
            <div className="my-page-coment">
              {myPageData.userData.introduction}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-page-hr" />
      <div className="maypage-log-container">
        <div className="my-page-log-image-container">
          {myPageData.logData.map((data) => (
            <div key={data.id} className="my-page-log-image-inner">
              <Link href={`/Log/${data.id}`} className="my-page-log-image-size">
                <img
                  src={data.logImgUrl}
                  alt=""
                  className="my-page-log-image"
                />
              </Link>
              <div className="my-page-log-place-name">
                <img src="/image/placeNamepin.png" />
                <div className="my-page-log-place-name-text">
                  {data.placeName.replace(/"/g, '')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
