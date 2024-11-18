'use client';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import LogMarker from './LogMarker';
import axios from 'axios';
import { MapMarkerCountData } from '@/types/type';
import SearchModal from './SearchModal';
import Link from 'next/link';
import Header from '@/components/Global/Header';
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env
  .NEXT_PUBLIC_KAKAO_CLIENT_ID!}&autoload=false`;
// !아래는 최적화
import { redirect, useSearchParams } from 'next/navigation';
const KakaoMap = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, [token]);
  const [mapdata, setMapData] = useState({
    level: 3,
    position: { lat: 37.483034, lng: 126.902435 },
    bounds: { southWest: { La: 0, Ma: 0 }, northEast: { La: 0, Ma: 0 } },
  });
  //검색 모달 체크
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const [logMapData, setLogMapData] = useState<MapMarkerCountData[]>([]);
  const [debouncedX, setDebouncedX] = useState<number | null>(null);
  const [debouncedY, setDebouncedY] = useState<number | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [location, setLocation] = useState({
    lat: 37.629331956463695,
    lng: 127.09045603606533,
  });
  const [queryLat, setQueryLat] = useState<number | null>(null);
  const [queryLng, setQueryLng] = useState<number | null>(null);

  // 디바운스 처리된 위치 업데이트
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedX(mapdata?.position.lat);
      setDebouncedY(mapdata?.position.lng);
    }, 300);
    return () => clearTimeout(handler);
  }, [mapdata]);

  // 현재 위치 또는 쿼리 파라미터로부터 위치 설정
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('y') ? parseFloat(params.get('y')!) : null;
    const lng = params.get('x') ? parseFloat(params.get('x')!) : null;

    if (lat && lng) {
      setQueryLat(lat);
      setQueryLng(lng);
      setLocation({ lat, lng });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log('위치 받기 실패');
        }
      );
    }
  }, []);

  // 지도 위치 변경시 데이터 가져오기
  useEffect(() => {
    if (debouncedX && debouncedY) {
      getMarkerData();
    }
  }, [debouncedX, debouncedY]);

  const getMarkerData = async () => {
    console.log(mapdata.bounds.northEast.La);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/place`,

        {
          params: {
            minX: mapdata.bounds.southWest.La, // 경도(lng)
            minY: mapdata.bounds.southWest.Ma, // 위도(lat)
            maxX: mapdata.bounds.northEast.La, // 경도(lng)
            maxY: mapdata.bounds.northEast.Ma, // 위도(lat)
          },
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
        }
      );
      const data: MapMarkerCountData[] = response.data.response;
      setLogMapData(data);
      console.log('성공 쓰인 x값:', debouncedX, 'y값:', debouncedY, logMapData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* 헤더 부분 */}
      {!isSearchModalOpen && (
        <div className="header-box">
          <div className="header-inner-box">
            <div>
              <Link href={'/home'}>
                <img
                  src="/image/whereWearHeaderLogo.svg"
                  className="header-main-logo"
                />
              </Link>
            </div>
            <div>
              <img
                src="/image/search.svg"
                className="header-icon "
                onClick={() => {
                  setIsSearchModalOpen(true);
                }}
              />
              <img src="/image/bell.svg" className="header-icon" />
            </div>
          </div>
        </div>
      )}

      {isSearchModalOpen && (
        <SearchModal onClose={closeSearchModal} token={token} />
      )}
      <Script
        src={KAKAO_SDK_URL}
        strategy="beforeInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />
      <Map
        center={location}
        style={{ width: '100%', height: '90vh' }}
        onCenterChanged={(map) => {
          const southWest = map.getBounds().getSouthWest();
          const northEast = map.getBounds().getNorthEast();

          const level = map.getLevel();
          const latlng = map.getCenter();
          setMapData({
            level,
            position: {
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            },
            bounds: {
              southWest: {
                La: southWest.getLng(), // 경도(lng)
                Ma: southWest.getLat(), // 위도(lat)
              },
              northEast: {
                La: northEast.getLng(), // 경도(lng)
                Ma: northEast.getLat(), // 위도(lat)
              },
            },
          });
        }}
      >
        {/* 서버에서 가져온 마커 데이터 표시 */}
        {logMapData.map((log, index) => (
          <LogMarker
            key={index}
            logLat={log.y}
            logLng={log.x}
            logNum={log.count}
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
