import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <>
      <div>
        <div>
          <ul>
            <li>
              <Link href={'/home'}>
                <img src={'/image/homeIcon.svg'} className="footer-icon" />
              </Link>
            </li>
            <li>
              <Link href={'/home'}>
                <img src={'/image/listIcon.svg'} className="footer-icon" />
              </Link>
            </li>
            <li className="addLog-li">
              <Link href={'/addLog'}>
                <img src={'/image/addLogIcon.svg'} className="addLog-icon" />
              </Link>
            </li>
            <li>
              <Link href={'/home'}>
                <img src={'/image/likeIcon.svg'} className="footer-icon" />
              </Link>
            </li>
            <li>
              <Link href={'/home'}>
                <img src={'/image/myPageIcon.svg'} className="footer-icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
