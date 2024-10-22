import { SimpleLogData } from '@/types/type';
import Link from 'next/link';
import React from 'react';

interface TopFashionLogProps {
  topLogs: SimpleLogData[] | undefined;
}

const TopFashionLog: React.FC<TopFashionLogProps> = ({ topLogs }) => {
  return (
    <>
      <div className="top-fashion-log-container">
        {topLogs?.map((log) => (
          <Link href={`/Log/${log.id}`} key={log.id}>
            <div className="top-fashion-log-item">
              <img src={log.imgUrl} className="log-image" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TopFashionLog;
