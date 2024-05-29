// 나중에 본인 위치정보 가져와서 표시하는 기능 만들어야함 useEffect 안에 집어 넣을 예정
'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env
  .KAKAO_CLIENT_ID!}&autoload=false`;

const KakaoMap = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  useEffect(() => {
    if (isScriptLoaded) {
      (window as any).kakao.maps.load(() => {
        // Kakao Map SDK가 로드된 후에 지도를 초기화.
      });
    }
  }, [isScriptLoaded]);
  return (
    <>
      <Script
        src={KAKAO_SDK_URL}
        strategy="beforeInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: '100%', height: '800px' }}
      ></Map>
    </>
  );
};

export default KakaoMap;
