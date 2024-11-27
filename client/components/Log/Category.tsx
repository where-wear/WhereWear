// 'use client';
// import React, { useEffect, useState } from 'react';
// interface CategoryPropsType {
//   categoryId: number;
//   userItemName: string;
// }
// const Category = (props: CategoryPropsType) => {
//   const [category, setCategory] = useState<string>('');
//   useEffect(() => {
//     checkId();
//   }, [props.categoryId]);
//   const checkId = () => {
//     if (props.categoryId == 1) {
//       setCategory(`가방 ${'>'} 숄더백 ${'>'} `);
//     }
//     if (props.categoryId == 2) {
//       setCategory(`가방 ${'>'} 토트백 ${'>'} `);
//     }
//     if (props.categoryId == 3) {
//       setCategory(`가방 ${'>'} 크로스백 ${'>'} `);
//     }
//     if (props.categoryId == 4) {
//       setCategory(`가방 ${'>'} 클러치백 ${'>'} `);
//     }
//     if (props.categoryId == 5) {
//       setCategory(`가방 ${'>'} 백팩 ${'>'} `);
//     }
//     if (props.categoryId == 6) {
//       setCategory(`가방 ${'>'} 에코백 ${'>'} `);
//     }
//     if (props.categoryId == 7) {
//       setCategory(`상의 ${'>'} 셔츠 ${'>'} `);
//     }
//     if (props.categoryId == 8) {
//       setCategory(`상의 ${'>'} 맨투맨 ${'>'} `);
//     }
//     if (props.categoryId == 9) {
//       setCategory(`상의 ${'>'} 니트스웨터 ${'>'} `);
//     }
//     if (props.categoryId == 10) {
//       setCategory(`상의 ${'>'} 후드 ${'>'} `);
//     }
//     if (props.categoryId == 11) {
//       setCategory(`상의 ${'>'} 스포츠티 ${'>'} `);
//     }
//   };
//   return (
//     <>
//       <div className="log-item-inner">
//         {category} {"'"}
//         {props.userItemName}
//         {"'"}
//       </div>
//     </>
//   );
// };

// export default Category;
'use client';
import React, { useEffect, useState } from 'react';
import { categoryDetails } from '../Function/itemNumber';

interface CategoryPropsType {
  categoryId: number;
  userItemName: string;
}

const Category = (props: CategoryPropsType) => {
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    findCategory();
  }, [props.categoryId]);

  const findCategory = () => {
    for (const [mainCategory, subCategories] of Object.entries(
      categoryDetails
    )) {
      for (const [subCategory, id] of Object.entries(subCategories)) {
        if (id === props.categoryId) {
          setCategory(`${mainCategory} ${'>'} ${subCategory} ${'>'}`);
          return;
        }
      }
    }
    // 매칭되는 카테고리가 없는 경우
    setCategory('카테고리 없음');
  };

  return (
    <>
      <div className="log-item-inner">
        {category} &quot;{props.userItemName}&quot;
      </div>
    </>
  );
};

export default Category;
