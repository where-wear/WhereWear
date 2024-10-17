'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
interface arroundProps {
  x: number;
  y: number;
  token: string | null;
}
const ArroundData = (props: arroundProps) => {
  const token = props.token;
  const [arroundData, setArroundData] = useState<
    { logId: number; imgUrl: string }[]
  >([{ logId: 0, imgUrl: '' }]);
  useEffect(() => {
    arroundDataApuHandler();
  }, [props.x, props.y]);
  const arroundDataApuHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/place/nearPlace`,
        {
          params: { x: props.x, y: props.y },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const logs = response.data.response.map((log: any) => ({
        logId: log.id, // 로그의 ID
        imgUrl: log.logImages.length > 0 ? log.logImages[0].publicUrl : '', // 이미지 URL
      }));
      setArroundData(logs);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {arroundData.map((log, index) => (
        <Link href={`/Log/${log.logId}`}>
          {log.imgUrl && <img src={log.imgUrl} alt="로그 이미지" />}
        </Link>
      ))}
    </>
  );
};

export default ArroundData;
