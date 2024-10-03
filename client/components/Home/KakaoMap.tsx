
//지도레벨1-14 1이 제일확대
//!쿼리 사용한 현 위치 수정해야함
//

'use client';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import LogMarker from './LogMarker';
import axios from 'axios';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env
  .NEXT_PUBLIC_KAKAO_CLIENT_ID!}&autoload=false`;

const KakaoMap = () => {
  const [data, setData] = useState<{
    level: number;
    position: {
      lat: number;
      lng: number;
    };
  }>();

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 37.483034,
    lng: 126.902435,
  });
  const [queryLat, setQueryLat] = useState<number | null>(null);
  const [queryLng, setQueryLng] = useState<number | null>(null);

  //로그개수 가져오는 api 요청(marker찍을때 사용)
  const getLogMarkerNumber = async () => {
    const response = await axios.get('local');
  };

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

  //!테스트
  useEffect(() => {
    console.log(`지도레벨 ${data?.level}`);
  }, [data]);

  //----------------지도레벨이 1인경우 데이터 가져오기

  //----------------지도레벨이 2인경우
  //----------------지도레벨이 3인경우
  //----------------지도레벨이 3인경우

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
        id="map"
        center={location}
        style={{ width: '100%', height: '90vh' }}
        onCenterChanged={(map) => {
          const level = map.getLevel();
          const latlng = map.getCenter();

          setData({
            level: level,
            position: {
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            },
          });
        }}
      >
        {/* 쿼리값이 있다면 그곳에 핑표시 */}
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

        {/* api 요청으로 가져오는 마커 넘어오는 데이터가 0이라면 표시하지않고 데이터 개수만큼  map으로 돌리기*/}
        <LogMarker logLat={0} logLng={0} logNum={0} />
      </Map>
    </>
  );
};

export default KakaoMap;
