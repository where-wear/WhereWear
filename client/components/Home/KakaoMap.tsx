//지도레벨1-14 1이 제일확대
//!쿼리 사용한 현 위치 수정해야함
//

'use client';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import LogMarker from './LogMarker';
import axios from 'axios';
import { MapMarkerCountData } from '@/types/type';
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env
  .NEXT_PUBLIC_KAKAO_CLIENT_ID!}&autoload=false`;

const KakaoMap = () => {
  //현재 카카오맵 변화 측정
  const [mapdata, setMapData] = useState<{
    level: number;
    position: {
      lat: number;
      lng: number;
    };
  }>();
  //api 요청으로 받아온 데이터(일단 임시 데이터)
  //! 아래의 맵 데이터가 변하면 그대로 마커생성
  const [logMapData, setLogMapData] = useState<MapMarkerCountData[]>([
    { x: 0, y: 0, logCount: 0 },
    { x: 0, y: 0, logCount: 0 },
  ]);

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

  useEffect(() => {
    //지도 위치가 확대,축소되거나 위치의 값이 변했을때 하는 행동
    //몇초에 한번씩만 작동할건지 정해야함 나중에 디바운스 해줘야함 x,y 값을  1.5 초마다 갱신하는 state를 생성해서 그것이 변하면 실행
    if (mapdata) {
      //만약 디바운스 처리된 데이터가 변했다면 api요청 함수 실행
      getMarkerData();
    }
  }, [mapdata]);

  //!테스트
  useEffect(() => {
    console.log(`지도레벨 ${mapdata?.level}`);
  }, [mapdata]);

  //----------------지도레벨이 1인경우 데이터 가져오기
  // 지도 레벨이 1인경우 모든 데이터 흩뿌려서 표시
  const getMarkerData = async () => {
    try {
      const response: MapMarkerCountData[] = await axios.get('/', {});
      //서버에서 받아올 데이터 위치정보가 임시로 response.x response.y라 생각하고 작성
      //받아온 데이터 state에 저장
      //객체 형태로 리스트 받아졌을경우 받아온x,y값에 로그 개수 표시
      if (response) {
        setLogMapData(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

          setMapData({
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
