'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from '@/components/Global/Footer';
import Header from '@/components/Global/Header';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideHeaderFooterPaths = [
    '/signin',
    '/',
    '/addLog',
    '/addLog/tag',
    '/addLog/Item',
    '/addLog/place',
  ]; // 헤더,푸터 사용안할 페이지의 경로

  // 헤더만 숨길 페이지 경로
  const hideHeaderPaths = ['/recommendLog'];

  // const hideHeaderFooter = hideHeaderFooterPaths.includes(pathname);
  const hideHeader =
    hideHeaderFooterPaths.includes(pathname) ||
    hideHeaderPaths.includes(pathname);
  const hideFooter = hideHeaderFooterPaths.includes(pathname);

  return (
    <div className="__next">
      {!hideHeader && <Header />}
      <div className="content_box">{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
}
