import React from 'react';
import { useStore } from '@/Zustand/store';

interface ItemsModalProps {
  isOpen: boolean;
  onDelete: (itemName: string) => void;
}

const ItemsModal = ({ isOpen, onDelete }: ItemsModalProps) => {
  const logData = useStore((state) => state.logData);

  // categoryMap 정의
  const categoryMap: { [key: number]: string } = {
    1: '숄더백',
    2: '토트백',
    3: '크로스백',
    4: '클러치백',
    5: '백팩',
    6: '에코백',
    7: '셔츠',
    8: '맨투맨',
    9: '니트스웨터',
    10: '후드',
    11: '스포츠티',
    12: '티셔츠',
  };

  if (!isOpen) return null;

  return (
    <div className="item-modal-content">
      <div className="item-add-log-item-detail">
        {logData.item.map((item) => {
          // categoryId에 따른 카테고리 이름 가져오기
          const categoryName = categoryMap[item.categoryId] || 'default';
          return (
            <div
              key={item.itemName}
              onClick={() => onDelete(item.itemName)}
              className="add-log-item-imgtext-prime"
            >
              <div className="item-add-log-item-detail-inner ">
                <img
                  src={`/image/${categoryName}.png`}
                  alt={`${item.itemName} 이미지`}
                />
              </div>
              <div className="modal-item-container">
                <div className="item-add-log-item-detail-inner-text">
                  {item.itemName}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsModal;
