'use client';
import BackBar from '@/components/Global/BackBar';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, []);

  const signOutHandler = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/dropUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      <div>
        <BackBar text="설정" />
      </div>
      <div className="setting-container">
        <Link href="" className="setting-link-com">
          <div className="setting-link">계정 관리</div>
          <div></div>
        </Link>
        <Link href="" className="setting-link-com">
          <div className="setting-link">알림</div>
          <div></div>
        </Link>
      </div>

      <hr className="setting-hr" />

      <div className="setting-container-another">
        <Link href="" className="setting-link-com">
          <div className="setting-link">고객센터</div>
        </Link>
        <Link href="" className="setting-link-com">
          <div className="setting-link">이용약관</div>
        </Link>
        <Link href="" className="setting-link-com">
          <div className="setting-link">개인 정보 처리방침</div>
        </Link>
        <Link href="" className="setting-link-com">
          <div className="setting-link">버전</div>
        </Link>
      </div>

      <hr className="setting-hr" />

      <div className="setting-container-another">
        <Link href="" className="setting-link-com">
          <div className="setting-link">로그아웃</div>
        </Link>
        <div className="setting-link-com" onClick={signOutHandler}>
          <div className="setting-link sign-out-red">회원탈퇴</div>
        </div>
      </div>
    </>
  );
};

export default page;
