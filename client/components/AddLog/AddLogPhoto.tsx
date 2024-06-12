// import React, { useState, ChangeEvent, useEffect } from 'react';
// import { useStore } from '@/Zustand/store';
// import { AddlogData } from '@/types/type';

// interface ImageInfo {
//   photoName: string;
//   photoData: string; // base64 코드를 저장할 곳
// }

// const AddLogPhoto: React.FC = () => {
//   // 스토어값 가져오기
//   const logData = useStore((state) => state.logData);
//   const setLogData = useStore((state) => state.setLogData);

//   // 이미지 미리보기
//   const [uploadImages, setUploadImages] = useState<ImageInfo[]>(
//     logData.logPhotoList
//   );
//   useEffect(() => {
//     uploadImagesToStore();
//   }, [uploadImages]);

//   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;

//     const files = e.target.files;
//     const fileArray = Array.from(files);

//     const newImagePromises = fileArray.map((file) => {
//       return new Promise<ImageInfo>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () =>
//           resolve({ photoName: file.name, photoData: reader.result as string });
//         reader.onerror = (error) => reject(error);
//       });
//     });

//     Promise.all(newImagePromises)
//       .then((newImages) => {
//         setUploadImages((prev) => [...prev, ...newImages]);
//       })
//       .catch((error) => {
//         console.error('Error reading files:', error);
//       });
//   };

//   // 이미지 정보를 스토어에 업로드하는 함수
//   const uploadImagesToStore = () => {
//     const newLogData: AddlogData = { ...logData, logPhotoList: uploadImages };
//     setLogData(newLogData);
//   };

//   return (
//     <>
//       <div className="photo-box">
//         <div className="photo-container">
//           <div className="photo-label-container">
//             <label className="photo-label">
//               <input type="file" multiple onChange={handleImageUpload} />
//               <div>사진추가</div>
//               <img src="/image/plusImage.svg" alt="추가 이미지" />
//               <div>({uploadImages.length}/10)</div>
//             </label>
//           </div>

//           <div className="image-preview">
//             {uploadImages.map((image, index) => (
//               <div className="image-preview-inner" key={index}>
//                 <img src={image.photoData} alt={`upload-${index}`} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddLogPhoto;
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useStore } from '@/Zustand/store';
import { AddlogData } from '@/types/type';

interface ImageInfo {
  photoName: string;
  photoData: string; // base64 코드를 저장할 곳
}

const AddLogPhoto: React.FC = () => {
  // 스토어값 가져오기
  const logData = useStore((state) => state.logData);
  const setLogData = useStore((state) => state.setLogData);

  // 이미지 미리보기
  const [uploadImages, setUploadImages] = useState<ImageInfo[]>(
    logData.logPhotoList
  );
  useEffect(() => {
    uploadImagesToStore();
  }, [uploadImages]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = e.target.files;
    const fileArray = Array.from(files);

    const newImagePromises = fileArray.map((file) => {
      return new Promise<ImageInfo>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
          resolve({ photoName: file.name, photoData: reader.result as string });
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(newImagePromises)
      .then((newImages) => {
        setUploadImages((prev) => [...prev, ...newImages]);
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  };

  // 이미지 정보를 스토어에 업로드하는 함수
  const uploadImagesToStore = () => {
    const newLogData: AddlogData = { ...logData, logPhotoList: uploadImages };
    setLogData(newLogData);
  };

  // 이미지 제거 함수
  const handleRemoveImage = (index: number) => {
    setUploadImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="photo-box">
        <div className="photo-container">
          <div className="photo-label-container">
            <label className="photo-label">
              <input type="file" multiple onChange={handleImageUpload} />
              <div>사진추가</div>
              <img src="/image/plusImage.svg" alt="추가 이미지" />
              <div>({uploadImages.length}/10)</div>
            </label>
          </div>

          <div className="image-preview">
            {uploadImages.map((image, index) => (
              <div className="image-preview-inner" key={index}>
                <img
                  src={image.photoData}
                  alt={`upload-${index}`}
                  onClick={() => handleRemoveImage(index)}
                />
                {/* <button onClick={() => handleRemoveImage(index)}>Remove</button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLogPhoto;
