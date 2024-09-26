//컴포넌트 분리
import React from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
interface MarkerPropsType {
  logLat: number;
  logLng: number;
  logNum: number;
}

//프롭스로 마커 위치 표시
const LogMarker = (props: MarkerPropsType) => {
  return (
    <div>
      <MapMarker
        position={{
          lat: props.logLat,
          lng: props.logLng,
        }}
        image={{
          src: '/image/marker.png',
          size: { width: 30, height: 30 },
          options: { offset: { x: 27, y: 20 } },
        }}
      />
    </div>
  );
};

export default LogMarker;
