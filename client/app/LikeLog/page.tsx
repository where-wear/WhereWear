'use client';
import React, { useState } from 'react';

const page = () => {
  const [likeLogData, setLikeLogData] = useState([
    {
      imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample',
      address: '',
    },
    { imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample' },
    { imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample' },
    { imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample' },
    { imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample' },
    { imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample' },
    { imgUrl: 'https://placehold.co/200x200/gray/white?text=Sample' },
  ]);
  return (
    <>
      <div className="like-log-header">좋아한 로그</div>
      <div>지역 드롭</div>
      <div>
        <div className="like-log-container">
          {likeLogData.map((data, index) => (
            <div key={index} className="">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
