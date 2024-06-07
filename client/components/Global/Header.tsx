import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <>
      <div className="header-inner-box">
        <div>
          <Link href={'/home'}>
            <img
              src="/image/whereWearHeaderLogo.svg"
              className="header-main-logo"
            />
          </Link>
        </div>
        <div>
          <img src="/image/search.svg" className="header-icon" />
          <img src="/image/bell.svg" className="header-icon" />
        </div>
      </div>
    </>
  );
};

export default Header;
