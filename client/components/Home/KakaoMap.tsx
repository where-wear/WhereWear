'use client';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env
  .NEXT_PUBLIC_KAKAO_CLIENT_ID!}&autoload=false`;

const KakaoMap = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.483034,
    lng: 126.902435,
  });
  const [queryLat, setQueryLat] = useState<number | null>(null);
  const [queryLng, setQueryLng] = useState<number | null>(null);

  useEffect(() => {
    // URL 쿼리 파싱
    const params = new URLSearchParams(window.location.search);
    const lat = parseFloat(params.get('y') || '');
    const lng = parseFloat(params.get('x') || '');

    // 쿼리 값이 있는 경우 설정
    if (!isNaN(lat) && !isNaN(lng)) {
      setQueryLat(lat);
      setQueryLng(lng);
      setLocation({ lat, lng });
    } else {
      // 쿼리 값이 없는 경우 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      }
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

      <Map center={location} style={{ width: '100%', height: '90vh' }}>
        {queryLat !== null && (
          <MapMarker
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
            image={{
              src: '/image/marker.png',
              size: { width: 30, height: 30 },
              options: { offset: { x: 27, y: 20 } },
            }}
          />
        )}
      </Map>
    </>
  );
};

export default KakaoMap;
