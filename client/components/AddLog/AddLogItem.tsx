// 'use client';
// import { useStore } from '@/Zustand/store';
// import React, { useState, useEffect } from 'react';
// import AddItemModal from './AddItemModal';
// import ItemsModal from './ItemsModal';

// const AddLogItem = () => {
//   const logData = useStore((state) => state.logData);
//   const setLogData = useStore((state) => state.setLogData);
//   const [selectedCategory, setSelectedCategory] = useState<string>('상의');
//   const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
//     null
//   );
//   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

//   // 전역 상태인 logData.item의 길이를 통해 모달 열림/닫힘 상태 제어
//   const isItemsModalOpen = logData.item.length > 0;

//   // 카테고리 클릭 시
//   const handleCategoryClick = (category: string) => {
//     setSelectedCategory(category);
//     setSelectedSubCategory(null);
//   };

//   // 서브 카테고리 클릭 시
//   const handleSubCategoryClick = (subCategory: string) => {
//     setSelectedSubCategory(subCategory);
//     setIsAddItemModalOpen(true);
//   };

//   // 아이템 추가 모달에서 저장
//   const handleModalSave = (itemName: string) => {
//     if (!itemName.trim()) return; // 아이템 이름이 비어 있으면 중단

//     const categoryMap: { [key: string]: number } = {
//       숄더백: 1,
//       토트백: 2,
//       크로스백: 3,
//       클러치백: 4,
//       백팩: 5,
//       에코백: 6,
//       셔츠: 7,
//       맨투맨: 8,
//       니트스웨터: 9,
//       후드: 10,
//       스포츠티: 11,
//       티셔츠: 12,
//     };

//     const categoryNum = categoryMap[selectedSubCategory || ''] || 0;

//     const newItem = {
//       categoryId: categoryNum,
//       itemName,
//     };

//     // 아이템 추가 후 전역 상태 업데이트
//     setLogData({
//       ...logData,
//       item: [...logData.item, newItem],
//     });

//     setIsAddItemModalOpen(false);
//   };

//   // 아이템 목록 모달에서 아이템 삭제
//   const handleItemDelete = (itemName: string) => {
//     const updatedItems = logData.item.filter(
//       (item) => item.itemName !== itemName
//     );
//     setLogData({
//       ...logData,
//       item: updatedItems,
//     });
//   };

//   return (
//     <>
//       <div className="add-log-item-continerbox">
//         <div className="add-log-item-container">
//           <div className="add-log-item-category">
//             {[
//               '상의',
//               '아우터',
//               '바지',
//               '원피스/스커트',
//               '신발',
//               '가방',
//               '패션 소품',
//               '뷰티템',
//               '스포츠/레저',
//             ].map((category) => (
//               <div
//                 key={category}
//                 className={`add-log-item-category-inner ${
//                   selectedCategory === category ? 'selected' : ''
//                 }`}
//                 onClick={() => handleCategoryClick(category)}
//               >
//                 {category}
//               </div>
//             ))}
//           </div>

//           {selectedCategory && (
//             <div className="add-log-item-detail">
//               {selectedCategory === '상의' && (
//                 <>
//                   {[
//                     '티셔츠',
//                     '셔츠',
//                     '맨투맨',
//                     '니트스웨터',
//                     '후드',
//                     '스포츠티',
//                   ].map((subCategory) => (
//                     <div
//                       className="add-log-item-imgtext"
//                       key={subCategory}
//                       onClick={() => handleSubCategoryClick(subCategory)}
//                     >
//                       <div className="add-log-item-detail-inner">
//                         <img
//                           src={`/image/${subCategory}.png`}
//                           alt={`${subCategory} 이미지`}
//                         />
//                       </div>
//                       <div className="add-log-item-text">{subCategory}</div>
//                     </div>
//                   ))}
//                 </>
//               )}
//               {selectedCategory === '가방' && (
//                 <>
//                   {[
//                     '숄더백',
//                     '토트백',
//                     '크로스백',
//                     '클러치백',
//                     '백팩',
//                     '에코백',
//                   ].map((subCategory) => (
//                     <div
//                       className="add-log-item-imgtext"
//                       key={subCategory}
//                       onClick={() => handleSubCategoryClick(subCategory)}
//                     >
//                       <div className="add-log-item-detail-inner">
//                         <img
//                           src={`/image/${subCategory}.png`}
//                           alt={`${subCategory} 이미지`}
//                         />
//                       </div>
//                       <div className="add-log-item-text">{subCategory}</div>
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* 아이템 추가 모달 */}
//       <AddItemModal
//         isOpen={isAddItemModalOpen}
//         onSave={handleModalSave}
//         category={selectedSubCategory}
//       />

//       {/* 아이템 목록 모달 */}
//       <ItemsModal isOpen={isItemsModalOpen} onDelete={handleItemDelete} />
//     </>
//   );
// };

// export default AddLogItem;
'use client';
import { useStore } from '@/Zustand/store';
import React, { useState } from 'react';
import AddItemModal from './AddItemModal';
import ItemsModal from './ItemsModal';
import { categoryDetails } from '../Function/itemNumber';

const AddLogItem = () => {
  const logData = useStore((state) => state.logData);
  const setLogData = useStore((state) => state.setLogData);

  const [selectedCategory, setSelectedCategory] = useState<string>('상의');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const isItemsModalOpen = logData.item.length > 0;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setIsAddItemModalOpen(true);
  };

  const handleModalSave = (itemName: string) => {
    if (!itemName.trim() || !selectedSubCategory) return;

    // 카테고리 ID 찾기
    const categoryId =
      categoryDetails[selectedCategory]?.[selectedSubCategory] || 0;

    const newItem = {
      categoryId,
      itemName,
    };

    setLogData({
      ...logData,
      item: [...logData.item, newItem],
    });

    setIsAddItemModalOpen(false);
  };

  const handleItemDelete = (itemName: string) => {
    const updatedItems = logData.item.filter(
      (item) => item.itemName !== itemName
    );
    setLogData({
      ...logData,
      item: updatedItems,
    });
  };

  return (
    <>
      <div className="add-log-item-continerbox">
        <div className="add-log-item-container">
          <div className="add-log-item-category">
            {Object.keys(categoryDetails).map((category) => (
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
              {Object.keys(categoryDetails[selectedCategory]).map(
                (subCategory) => {
                  const categoryId =
                    categoryDetails[selectedCategory]?.[subCategory] || 0;

                  return (
                    <div
                      className="add-log-item-imgtext"
                      key={subCategory}
                      onClick={() => handleSubCategoryClick(subCategory)}
                    >
                      <div className="add-log-item-detail-inner">
                        <img
                          src={`/image/itemNum${categoryId}.png`}
                          alt={`${subCategory} 이미지`}
                        />
                      </div>
                      <div className="add-log-item-text">{subCategory}</div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>

      <AddItemModal
        isOpen={isAddItemModalOpen}
        onSave={handleModalSave}
        category={selectedSubCategory}
      />

      <ItemsModal isOpen={isItemsModalOpen} onDelete={handleItemDelete} />
    </>
  );
};

export default AddLogItem;
