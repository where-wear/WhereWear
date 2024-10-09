//좋아한로그 log
'use client';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  const redirectLog = () => {
    // 로그 누르면 리다이렉트
  };
  const [likeLogData, setLikeLogData] = useState([
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
      logId: 1,
    },
  ]);
  return (
    <>
      <div className="like-log-header">좋아한 로그</div>
      <div>지역 드롭</div>
      <div>
        <div className="like-log-container">
          {likeLogData.map((data, index) => (
            <div
              key={data.logId}
              className="like-log-click"
              onClick={redirectLog}
            >
              <Link href={`/Log/${data.logId}`} className="like-log-link">
                <div className="like-log-inner">
                  <div className="like-log-image">
                    <img src={`${data.imgUrl}`} />
                  </div>
                  <div className="like-place-plcename">플레이스명</div>
                  <div className="like-place-address">
                    <img src="/image/placeNamepin.png" />
                    <div>플레이스 주소</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
