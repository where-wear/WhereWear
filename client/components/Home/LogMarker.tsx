//컴포넌트 분리
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import LogMarkerModal from './LogMarkerModal';
import { MapMakerModal } from '@/types/type';
import axios from 'axios';
import Link from 'next/link';
import { enableHorizontalScroll } from '../Function/enableHorizontalScroll';
//스크롤관련

interface MarkerPropsType {
  logLat: number;
  logLng: number;
  logNum: number;
}

//프롭스로 마커 위치 표시
const LogMarker = (props: MarkerPropsType) => {
  //토큰
  const [token, setToken] = useState<string | null>(null);
  const modalLogContainerRef = useRef(null); // 가로 스크롤을 위한 참조
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, [token]);
  const [isClosing, setIsClosing] = useState(false); // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  //마커눌렀을때 가져올 정보
  const [markerModalData, setMarkerModalData] = useState<MapMakerModal>({
    placeName: '',
    placeaddress: '',
    log: [{ logId: 0, imgUrl: '' }],
  });
  useEffect(() => {
    // 모달이 열릴 때마다 가로 스크롤 기능 추가
    if (isModalOpen && modalLogContainerRef.current) {
      enableHorizontalScroll(modalLogContainerRef.current);
    }
  }, [isModalOpen]);
  const openMarkerLogList = async () => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/place/detail`,
        {
          params: { x: props.logLng, y: props.logLat },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('마커 데이터:', response.data.response);
      const logs = response.data.response.map((log: any) => ({
        logId: log.id, // 로그의 ID
        imgUrl: log.logImages.length > 0 ? log.logImages[0].publicUrl : '', // 이미지 URL
      }));
      setMarkerModalData({
        placeName: response.data.response[0].place.placeName.replace(/"/g, ''),
        placeaddress: response.data.response[0].place.address.replace(/"/g, ''),
        log: logs,
      });
    } catch (err) {
      console.log(err);
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
  return (
    <>
      <MapMarker
        position={{
          lat: props.logLat,
          lng: props.logLng,
        }}
        image={{
          src:
            props.logNum >= 20
              ? '/image/mapMarkerHigh.png'
              : props.logNum >= 5
              ? '/image/mapMarkerMiddle.png'
              : '/image/mapMarkerLow.png',
          size:
            props.logNum >= 5
              ? { width: 35, height: 35 }
              : { width: 25, height: 25 },
          options: { offset: { x: 27, y: 20 } },
        }}
        onClick={openMarkerLogList}
      />

      {/* 모달 컴포넌트 */}
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
                {/* 로그들 */}{' '}
                {markerModalData.log.map((log) => (
                  <div key={log.logId}>
                    <div>
                      <Link href={`/Log/${log.logId}`}>
                        {log.imgUrl && (
                          <img src={log.imgUrl} alt="로그 이미지" width="100" />
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
    </>
  );
};

export default LogMarker;
