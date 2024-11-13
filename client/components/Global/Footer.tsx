// import Link from 'next/link';
// import React from 'react';

// const Footer = () => {
//   return (
//     <>
//       <div className="footer-box">
//         <div>
//           <div>
//             <ul>
//               <li>
//                 <Link href={'/home'}>
//                   <img src={'/image/homeIcon.svg'} className="footer-icon" />
//                 </Link>
//               </li>
//               <li>
//                 <Link href={'/recommendLog'}>
//                   <img src={'/image/listIcon.svg'} className="footer-icon" />
//                 </Link>
//               </li>
//               <li className="addLog-li">
//                 <Link href={'/addLog'}>
//                   <img src={'/image/addLogIcon.svg'} className="addLog-icon" />
//                 </Link>
//               </li>
//               <li>
//                 <Link href={'/LikeLog'}>
//                   <img src={'/image/likeIcon.svg'} className="footer-icon" />
//                 </Link>
//               </li>
//               <li>
//                 <Link href={'/myPage'}>
//                   <img src={'/image/myPageIcon.svg'} className="footer-icon" />
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Footer;
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  // 현재 경로와 각 링크의 경로가 일치할 때 활성화된 스타일 적용
  const getIconClass = (path: string) => (pathname === path ? 'White' : '');

  return (
    <>
      <div className="footer-box">
        <ul>
          <li>
            <Link href="/home">
              <img
                src={`/image/homeIcon${getIconClass('/home')}.svg`}
                className="footer-icon"
              />
            </Link>
          </li>
          <li>
            <Link href="/recommendLog">
              <img
                src={`/image/listIcon${getIconClass('/recommendLog')}.svg`}
                className="footer-icon"
              />
            </Link>
          </li>
          <li className="addLog-li">
            <Link href="/addLog">
              <img src="/image/addLogIcon.svg" className="addLog-icon" />
            </Link>
          </li>
          <li>
            <Link href="/LikeLog">
              <img
                src={`/image/likeIcon${getIconClass('/LikeLog')}.svg`}
                className="footer-icon"
              />
            </Link>
          </li>
          <li>
            <Link href="/myPage">
              <img
                src={`/image/myPageIcon${getIconClass('/myPage')}.svg`}
                className="footer-icon"
              />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
