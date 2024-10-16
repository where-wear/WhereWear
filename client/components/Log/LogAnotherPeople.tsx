'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
interface AnotherPeopleProps {
  x: number;
  y: number;
  token: string | null;
}
const LogAnotherPeople = (props: AnotherPeopleProps) => {
  const token = props.token;
  useEffect(() => {
    anoterLog();
  }, [props.x, props.y]);

  const [anotherPeopleData, setAnotherPeopleData] = useState<
    { logId: number; imgUrl: string }[]
  >([{ logId: 0, imgUrl: '' }]);

  const anoterLog = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/place/detail`,
        {
          params: { x: props.x, y: props.y },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('프롭스요청 성공', response.data.response);
      const logs = response.data.response.map((log: any) => ({
        logId: log.id, // 로그의 ID
        imgUrl: log.logImages.length > 0 ? log.logImages[0].publicUrl : '', // 이미지 URL
      }));

      setAnotherPeopleData(logs);
    } catch (err) {
      console;
    }
  };

  return (
    <>
      {anotherPeopleData.map((log) => (
        <div key={log.logId} className="log-another-user-circle-inner">
          <div>
            <Link href={`/Log/${log.logId}`}>
              {log.imgUrl && <img src={log.imgUrl} alt="로그 이미지" />}
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default LogAnotherPeople;
