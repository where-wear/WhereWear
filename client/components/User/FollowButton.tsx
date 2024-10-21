'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
interface FollowButton {
  token: string;
  userID: number;
}
const FollowButton = (props: FollowButton) => {
  const followApi = async () => {
    try {
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/follow`,
        null,
        {
          params: { userId: props.userID },

          headers: {
            Authorization: `Bearer ${props.token}`, // 헤더에 토큰 추가
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="log-follow-button" onClick={followApi}>
        + 팔로우
      </div>
    </>
  );
};

export default FollowButton;
