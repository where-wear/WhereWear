'use client';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env
  .KAKAO_CLIENT_ID!}&autoload=false`;

const KakaoMap = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.483034,
    lng: 126.902435,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: any) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }

    function error() {
      setLocation({
        lat: 37.483034,
        lng: 126.902435,
      });
      console.log('위치 받기 실패');
    }
  }, []);

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
      <Map center={location} style={{ width: '100%', height: '90vh' }}></Map>
    </>
  );
};

export default KakaoMap;
