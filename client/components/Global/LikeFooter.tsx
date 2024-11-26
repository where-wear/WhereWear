import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
interface LikeFooterPropsType {
  logId: number;
  token: string | null;
  like: boolean;
}
const LikeFooter = (props: LikeFooterPropsType) => {
  const [islike, setIslike] = useState<boolean>(props.like);

  //좋아요 api
  const likeLogApi = async () => {
    setIslike((prevLike) => !prevLike);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/liked`,
        null,
        {
          params: {
            logId: props.logId,
          },
          headers: {
            Authorization: `Bearer ${props.token}`, // 헤더에 토큰 추가
          },
        }
      );
      console.log(response.data.response.liked);
      setIslike(response.data.response.liked);
    } catch (err) {
      setIslike((prevLike) => !prevLike);
      console.log(err);
    }
  };

  return (
    <>
      <div className="footer-box">
        <div>
          <div>
            <ul>
              <li>
                <div>
                  <img src={'/image/upLoadIcon.svg'} className="footer-icon" />
                </div>
              </li>
              <li></li>
              <li className="addLog-li"></li>
              <li>
                <div onClick={likeLogApi}>
                  <img
                    src={
                      islike ? '/image/LikeLogIcon.svg' : '/image/fillHeart.svg'
                    }
                    className="footer-icon"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LikeFooter;
