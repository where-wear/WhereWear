'use client';
import AddLogPhoto from '@/components/AddLog/AddLogPhoto';
import AddLogShow from '@/components/AddLog/AddLogShow';
import AddLogText from '@/components/AddLog/AddLogText';
import BackBar from '@/components/Global/BackBar';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/Zustand/store';
import axios from 'axios';
import GoSignin from '@/components/Global/GoSignin';
import Footer from '@/components/Global/Footer';
import Loading from '@/components/Global/Loading';

//! Link쓰면 주소가 저장되기때문에 모달창뜨는 느낌으로 바뀌어야 할 것같다 (중간 발표전에는 못고칠 예정) 또는 주소가 저장되지않게 하는방법도 있음
const page = () => {
  const [token, setToken] = useState<string | null>(null);
  // 스토어값 가져오기
  const logData = useStore((state) => state.logData);
  const deleteData = useStore((state) => state.removeLogData);
  //이미지 상태
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  //토큰값 프론트에서만 가져오게 설정

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
  }, [token]);

  // logData가 비어 있는지 확인하는 함수
  const isLogDataComplete = () => {
    return (
      logData.logImageList.length > 0 && // 이미지가 있는지 확인
      logData.text.trim() !== '' && // 텍스트가 입력되었는지 확인
      logData.tag.length > 0 && // 태그가 추가되었는지 확인
      logData.item.length > 0 && // 아이템이 추가되었는지 확인
      logData.place.placeName.trim() !== '' && // 장소 이름이 있는지 확인
      logData.place.placeAddress.trim() !== '' && // 주소가 있는지 확인
      logData.place.placeX !== '' && // X 좌표가 있는지 확인
      logData.place.placeY !== '' // Y 좌표가 있는지 확인
    );
  };

  async function addLogFormHandler() {
    if (!isLogDataComplete() || isLoading) return;
    setIsLoading(true);
    const formData = new FormData();
    // 이미지 파일 추가
    logData.logImageList.forEach((image, index) => {
      // base64 file로 변환
      const byteString = atob(image.imageData.split(',')[1]);
      const mimeString = image.imageData
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const file = new File([ab], image.imageName, { type: mimeString });
      formData.append('images', file);
    });
    // 다른 데이터 추가
    formData.append('text', logData.text);
    formData.append('tags', JSON.stringify(logData.tag));
    formData.append('items', JSON.stringify(logData.item));
    formData.append('place', JSON.stringify(logData.place));
    formData.append('x', logData.place.placeX);
    formData.append('y', logData.place.placeY);
    formData.append('placeName', JSON.stringify(logData.place.placeName));
    formData.append('address', JSON.stringify(logData.place.placeAddress));
    formData.append('isShow', String(logData.isShow));
    try {
      console.log('토큰값:', token);
      console.log('데이터', logData);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/log/createLog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // 응답 처리
      console.log(response.data);
      console.log('로그 아이템:', logData.item);

      // 페이지 이동 후 상태 초기화
      router.push(`/home?x=${logData.place.placeX}&y=${logData.place.placeY}`);
      deleteData();
    } catch (error) {
      console.error('Error uploading data:', error);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }

    //이동후 전역스테이트 값 삭제
    deleteData();
  }

  // 태그 앞에 # 붙이고 한 칸 띄우기
  const formattedTags = logData.tag.map((tag) => `#${tag}`).join(' ');

  // 아이템 이름만 표시
  const itemNames = logData.item.map((item) => item.itemName).join(', ');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);
    setIsLoading(false); // 토큰 확인 후 로딩 상태 종료
  }, []);

  if (isLoading) {
    // 로딩 중에는 아무것도 렌더링하지 않음
    return <Loading />;
  }

  return (
    <>
      {token !== null && token !== undefined ? (
        <>
          <BackBar text="패션로그 작성" />
          {/* 사진 업로드 */}

          <AddLogPhoto />
          <AddLogText />
          <hr className="hr-style" />
          <div className="add-log-component-box">
            <Link href={'/addLog/tag'} className="add-log-inner ">
              <div>태그입력</div>
              <div className="add-log-store-arrow">
                <div className="add-log-store">{formattedTags}</div>
                <img src="/image/right-arrow.svg" alt="" />
              </div>
            </Link>
            <Link href={'/addLog/Item'} className="add-log-inner ">
              <div>패션 아이템 추가*</div>
              <div className="add-log-store-arrow">
                <div className="add-log-store">{itemNames}</div>
                <img src="/image/right-arrow.svg" alt="" />
              </div>
            </Link>
            <Link href={'/addLog/place'} className="add-log-inner ">
              <div>플레이스 추가*</div>

              <div className="add-log-store-arrow">
                <div className="add-log-store">{logData.place.placeName}</div>
                <img src="/image/right-arrow.svg" alt="" />
              </div>
            </Link>
            <div className="add-log-inner">
              <div>전체공개</div>
              <div>
                <AddLogShow />
              </div>
            </div>
          </div>
          <div
            className={`add-log-button ${
              !isLogDataComplete() ? 'disabled-button' : ''
            }`}
            onClick={addLogFormHandler}
          >
            {isLoading ? <p>업로드 중...</p> : <p>패션 로그 업로드하기</p>}
          </div>
        </>
      ) : (
        <>
          <GoSignin />
          <Footer />
        </>
      )}
    </>
  );
};

export default page;
