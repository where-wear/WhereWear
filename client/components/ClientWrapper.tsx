// 'use client';

// import React from 'react';
// import { usePathname } from 'next/navigation';
// import Footer from '@/components/Global/Footer';
// import Header from '@/components/Global/Header';

// export default function ClientWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   const hideHeaderFooterPaths = [
//     '/signin',
//     '/',
//     '/addLog',
//     '/addLog/tag',
//     '/addLog/Item',
//     '/addLog/place',
//     '/signin/userdata',
//     '/Log/',
//     '/setting',
//   ]; // 헤더,푸터 사용안할 페이지의 경로

//   // 헤더만 숨길 페이지 경로
//   const hideHeaderPaths = ['/recommendLog', '/LikeLog', '/myPage'];
//   const isDynamicLogPage = /^\/Log\/\d+$/.test(pathname);
//   const ismyPage = /^\/myPage\/[^\/]+$/.test(pathname);
//   const hideHeader =
//     hideHeaderFooterPaths.includes(pathname) ||
//     hideHeaderPaths.includes(pathname) ||
//     isDynamicLogPage ||
//     ismyPage;

//   const hideFooter =
//     hideHeaderFooterPaths.includes(pathname) || isDynamicLogPage;

//   return (
//     <div className="__next">
//       {!hideHeader && <Header />}
//       <div className="content_box">{children}</div>
//       {!hideFooter && <Footer />}
//     </div>
//   );
// }
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from '@/components/Global/Footer';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 푸터를 숨길 경로 목록
  const hideFooterPaths = [
    '/',
    '/addLog',
    '/addLog/tag',
    '/addLog/Item',
    '/addLog/place',
    '/signin',
    '/signin/userdata',
    '/setting',
  ];
  const isDynamicLogPage = /^\/Log\/\d+$/.test(pathname);
  const hideFooter = hideFooterPaths.includes(pathname) || isDynamicLogPage;

  return (
    <div className="__next">
      {/* <div className="content_box">{children}</div> */}
      <div className={hideFooter ? 'content_box' : 'content_box-with-footer'}>
        {children}
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}
