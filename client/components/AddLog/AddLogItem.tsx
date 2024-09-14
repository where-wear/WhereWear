//아이템  "" 이면 그냥 함수 중단 시키기(버튼 안눌리게 처리한다던지)
'use client';
import { useStore } from '@/Zustand/store';
import React, { useState } from 'react';
import AddItemModal from './AddItemModal';

const AddLogItem = () => {
  const logData = useStore((state) => state.logData);
  const setLogData = useStore((state) => state.setLogData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    '상의'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null); // 서브 카테고리 초기화
  };

  const handleSubCategoryClick = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = (itemName: string) => {
    const categoryString = `${selectedCategory}>${selectedSubCategory}`;
    setLogData({
      ...logData,
      item: [...logData.item, { category: categoryString, itemName }],
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="add-log-item-continerbox">
        <div className="add-log-place-container">
          <label>
            <div className="add-log-place-inner">
              <div>
                <img src="/image/searchPlace.svg" alt="장소 검색" />
              </div>
              <input type="text" />
            </div>
          </label>
        </div>

        <div className="add-log-item-container">
          <div className="add-log-item-category">
            {[
              '상의',
              '아우터',
              '바지',
              '원피스/스커트',
              '신발',
              '가방',
              '패션 소품',
              '뷰티템',
              '스포츠/레저',
            ].map((category) => (
              <div
                key={category}
                className={`add-log-item-category-inner ${
                  selectedCategory === category ? 'selected' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
          {selectedCategory && (
            <div className="add-log-item-detail">
              {selectedCategory === '상의' && (
                <>
                  {[
                    '티셔츠',
                    '셔츠',
                    '맨투맨',
                    '니트스웨터',
                    '후드',
                    '스포츠티',
                  ].map((subCategory) => (
                    <div
                      className="add-log-item-imgtext"
                      key={subCategory}
                      onClick={() => handleSubCategoryClick(subCategory)}
                    >
                      <div className="add-log-item-detail-inner">
                        <img
                          src={`/image/${subCategory}.png`}
                          alt={`${subCategory} 이미지`}
                        />
                      </div>
                      <div className="add-log-item-text">{subCategory}</div>
                    </div>
                  ))}
                </>
              )}
              {selectedCategory === '가방' && (
                <>
                  {[
                    '숄더백',
                    '토트백',
                    '크로스백',
                    '클러치백',
                    '백팩',
                    '에코백',
                  ].map((subCategory) => (
                    <div
                      className="add-log-item-imgtext"
                      key={subCategory}
                      onClick={() => handleSubCategoryClick(subCategory)}
                    >
                      <div className="add-log-item-detail-inner">
                        <img
                          src={`/image/${subCategory}.png`}
                          alt={`${subCategory} 이미지`}
                        />
                      </div>
                      <div className="add-log-item-text">{subCategory}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <AddItemModal
        isOpen={isModalOpen}
        // onClose={handleModalClose}
        onSave={handleModalSave}
        category={selectedCategory}
      />
    </>
  );
};

export default AddLogItem;
