import BackBar from '@/components/Global/BackBar';
import Link from 'next/link';
import React from 'react';

const page = () => {
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
      </div>
    </>
  );
};

export default page;
