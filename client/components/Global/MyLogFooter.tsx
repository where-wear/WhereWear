import axios from 'axios';
import Link from 'next/link';
import React from 'react';
interface LikeFooterPropsType {
  logId: number;
  token: string | null;
}
const MyLogFooter = (props: LikeFooterPropsType) => {
  //좋아요 api
  const likeLogApi = async () => {
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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  //로그 삭제  api
  const DeleteLogHandler = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/log/${props.logId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
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
                  <img src={'/image/LikeLogIcon.svg'} className="footer-icon" />
                </div>
              </li>
              <li>
                <div onClick={DeleteLogHandler}>
                  <img
                    src={'/image/bookmarkIcon.svg'}
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

export default MyLogFooter;
