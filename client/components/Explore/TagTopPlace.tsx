import { SimpleLogData } from '@/types/type';
import React from 'react';

interface TagTopLogProps {
  tagTopPlace:
    | {
        placeName: string;
        imgUrl: string;
      }[]
    | undefined;
}

const TagTopPlace: React.FC<TagTopLogProps> = ({ tagTopPlace }) => {
  return (
    <>
      <div className="top-fashion-log-container">
        {tagTopPlace?.map((log) => (
          <div key={log.placeName} className="top-fashion-log-item">
            <img src={log.imgUrl} className="log-image" />
          </div>
        ))}
      </div>
    </>
  );
};

export default TagTopPlace;
