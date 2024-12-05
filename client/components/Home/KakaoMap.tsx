"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import LogMarker from "./LogMarker";
import axios from "axios";
import { MapMarkerCountData } from "@/types/type";
import { MapMakerModal } from "@/types/type";
import SearchModal from "./SearchModal";
import Link from "next/link";
import Header from "@/components/Global/Header";
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env
  .NEXT_PUBLIC_KAKAO_CLIENT_ID!}&autoload=false`;

import { redirect, useSearchParams } from "next/navigation";
import LogMarkerModal from "./LogMarkerModal";
import { useKakaoLoader } from "react-kakao-maps-sdk";
const KakaoMap = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
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
  const modalLogContainerRef = useRef(null); // 가로 스크롤을 위한 참조
  const [isClosing, setIsClosing] = useState(false); // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [markerModalData, setMarkerModalData] = useState<MapMakerModal>({
    placeName: "",
    placeaddress: "",
    log: [{ logId: 0, imgUrl: "" }],
  });

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
    const lat = params.get("y") ? parseFloat(params.get("y")!) : null;
    const lng = params.get("x") ? parseFloat(params.get("x")!) : null;

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
          console.log("위치 받기 실패");
        }
      );
    }
  }, []);
  useEffect(() => {
    console.log("새로운 위치로 이동:", location.lat, location.lng);
  }, [location]);

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
      console.log("성공 쓰인 x값:", debouncedX, "y값:", debouncedY, logMapData);
    } catch (err) {
      console.error(err);
    }
  };
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsClosing(true); // 모달이 닫히기 시작
    setTimeout(() => {
      setIsModalOpen(false); // 일정 시간 후 모달을 실제로 닫음
      setIsClosing(false); // 닫힘 상태 초기화
      setIsModalOpen(false);
    }, 200); // 애니메이션 시간과 맞추기
  };
  const openMarkerLogList = async (lat: number, lng: number) => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/place/detail`,
        {
          params: { x: lng, y: lat },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("마커 데이터:", response.data.response);
      const logs = response.data.response.map((log: any) => ({
        logId: log.id, // 로그의 ID
        imgUrl: log.logImages.length > 0 ? log.logImages[0].publicUrl : "", // 이미지 URL
      }));
      setMarkerModalData({
        placeName: response.data.response[0].place.placeName.replace(/"/g, ""),
        placeaddress: response.data.response[0].place.address.replace(/"/g, ""),
        log: logs,
      });
    } catch (err) {
      console.log(err);
    }
  };
  // useKakaoLoader;

  const rocateChangeHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          console.log(
            "새로운 위치:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          console.log("위치 받기 실패");
        }
      );
    }
  };
  return (
    <>
      {/* 헤더 부분 */}
      {!isSearchModalOpen && (
        <div className="header-box">
          <div className="header-inner-box">
            <div>
              <Link href={"/home"}>
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
        <SearchModal
          onClose={closeSearchModal}
          token={token}
          onLocationSelect={(lat: number, lng: number) => {
            setLocation({ lat, lng });
            setIsSearchModalOpen(false);
            // 여기서 함수를 호출하자
            openMarkerLogList(lat, lng);
          }}
        />
      )}
      <Script
        src={KAKAO_SDK_URL}
        strategy="beforeInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />
      <Map
        isPanto={true}
        center={location}
        style={{ width: "100%", height: "100%" }}
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
        {isModalOpen && (
          <LogMarkerModal
            isOpen={isModalOpen}
            isClosing={isClosing}
            onClose={closeModal}
          >
            <div className="map-modal-component">
              <div className="map-modal-component-inner">
                <div className="modal-log-place-name">
                  {markerModalData.placeName}
                </div>
                <div className="modal-log-place-address">
                  {markerModalData.placeaddress}
                </div>
                <div className="modal-log-container" ref={modalLogContainerRef}>
                  {/* 로그들 */}{" "}
                  {markerModalData.log.map((log) => (
                    <div key={log.logId}>
                      <div>
                        <Link href={`/Log/${log.logId}`}>
                          {log.imgUrl && (
                            <img
                              src={log.imgUrl}
                              alt="로그 이미지"
                              width="100"
                            />
                          )}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </LogMarkerModal>
        )}
        {/* <div className="here-icon" onClick={rocateChangeHandler}>
          <img src="/image/here_Icon.svg" alt="" />
        </div> */}
      </Map>
    </>
  );
};

export default KakaoMap;
