import { SimpleLogData } from '@/types/type';
import React from 'react';

interface TopFashionLogProps {
  topLogs: SimpleLogData[];
}

const TopFashionLog: React.FC<TopFashionLogProps> = ({ topLogs }) => {
  return (
    <>
      <div className="top-fashion-log-container">
        {topLogs.map((log) => (
          <div key={log.id} className="top-fashion-log-item">
            <img src={log.imageUrl} alt={log.title} className="log-image" />
          </div>
        ))}
      </div>
    </>
  );
};

export default TopFashionLog;
