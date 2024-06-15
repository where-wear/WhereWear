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

  const hideHeaderFooter = hideHeaderFooterPaths.includes(pathname);

  return (
    <div className="__next">
      {!hideHeaderFooter && <Header />}
      <div className="content_box">{children}</div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
