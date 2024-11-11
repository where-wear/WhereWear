//내용 다 안채우거나 닉네임 중복확인 안했을경우 입력완료 버튼이 회색됨, 안눌림
//중복확인 안되면 이미 사용중입니다 띄우기
//유효성 검사 관련 문구 작성
//input typenumber인값들 초기에 문자열 입력되는 버그 고치기
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { UserDataType } from '@/types/type';
import axios from 'axios';
import BackBar from '../Global/BackBar';
import { redirect, useSearchParams } from 'next/navigation';
import { UserData } from '@/types/type';
import UserImage from './UserImage';
const SignData = () => {
  //닉네임 체크 관련 변수
  const [CheckNickname, setCheckNickname] = useState<string>('');

  //중복확인 변수
  const [isCheck, setIsCheck] = useState<boolean>(false);
  //이미지 상태
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  //닉네임이 변할때 마다 중복확인 변수를 false로 초기화
  useEffect(() => {
    setIsCheck(false);
    console.log(isCheck);
  }, [CheckNickname]);

  //토큰값 url에서 가져오기
  const params = useSearchParams();
  const token = params.get('token');

  //폼데이터
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserDataType>();

  //api 요청때 사용할 폼 데이터
  const [userdata, setUserData] = useState<UserDataType>({
    image: null,
    nickname: '',
    height: 0,
    weight: 0,
    footSize: 0,
    job: '',
    introduction: '',
  });
  // 모든 필드가 채워져 있는지 확인
  const isFormComplete = () => {
    return (
      imageFile !== null &&
      userdata.nickname.trim() !== '' &&
      isCheck &&
      userdata.height > 0 &&
      userdata.weight > 0 &&
      userdata.footSize > 0 &&
      userdata.job.trim() !== '' &&
      userdata.introduction.trim() !== ''
    );
  };
  useEffect(() => {
    setIsButtonDisabled(!isFormComplete());
    console.log('버튼 관련 디버그', isButtonDisabled);
  }, [userdata, imageFile, isCheck]);

  const ninckNameCheckHandler = async () => {
    //닉네임 체크하는 axios요청 함수 checkNickname 변수를 담아서 보내기
    try {
      console.log(`서버에 보내는 토큰 ${token} , 닉네임 ${CheckNickname}`);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/nicknameCheck`,
        null,
        {
          params: { nickname: CheckNickname },

          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
        }
      );
      console.log(response.data.success, '성공');
      if (response.data.success === true) {
        setIsCheck(true);
        setUserData((prevUserData) => ({
          ...prevUserData,
          nickname: CheckNickname,
        }));
        console.log(isCheck);
      }
    } catch (error) {}
  };
  const subUserDataHandler = async () => {
    if (isButtonDisabled) return;
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile); // 이미지 파일 추가
    }
    formData.append('nickname', userdata.nickname);
    formData.append('height', String(userdata.height));
    formData.append('weight', String(userdata.weight));
    formData.append('footSize', String(userdata.footSize));
    formData.append('job', userdata.job);
    formData.append('introduction', userdata.introduction);
    //닉네임 변수가 false 일경우,다른거 안적었을경우 제출버튼이 눌리지않음
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/signUp`,
        userdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data.success);
      if (response.data.success == true) {
        window.location.href = '/home';
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 나중에 주소 env 처리 해줘야함
  // header 에 토큰 값 넣어야함
  return (
    <>
      <BackBar text=" 추가 정보 입력 " />

      <UserImage
        onImageChange={(file) => {
          setImageFile(file); // 이미지 파일을 상태로 저장
          setUserData((prevUserData) => ({
            ...prevUserData,
            image: file, // 이미지 이름을 userdata에 저장
          }));
        }}
      />

      <form onSubmit={handleSubmit(subUserDataHandler)}>
        <div className="user-input-container">
          <label className="tile-label">계정명</label>
          <label className="signup-user-input-underline">
            <input
              type="text"
              {...register('nickname', { required: true, maxLength: 20 })}
              value={CheckNickname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCheckNickname(e.target.value);
              }}
            />
          </label>

          <button onClick={ninckNameCheckHandler} type="button">
            중복확인
          </button>
        </div>

        {errors.nickname && errors.nickname.type === 'required' && (
          <div>닉네임을 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div className="user-input-container">
          <label className="tile-label">키</label>
          <label className="signup-user-input-underline">
            <input
              {...register('height', { required: true, maxLength: 300 })}
              type="number"
              value={userdata.height || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  height: Number(e.target.value),
                }));
              }}
            />
          </label>
          <div className="gray-unit">cm</div>
        </div>
        {errors.height && errors.height.type === 'required' && (
          <div>키를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div className="user-input-container">
          <label className="tile-label">몸무게</label>
          <label className="signup-user-input-underline">
            <input
              {...register('weight', { required: true, maxLength: 1000 })}
              type="number"
              value={userdata.weight || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  weight: Number(e.target.value),
                }));
              }}
            />
          </label>
          <div className="gray-unit">kg</div>
        </div>

        {errors.weight && errors.weight.type === 'required' && (
          <div>몸무게를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div className="user-input-container">
          <label className="tile-label">발사이즈</label>
          <label className="signup-user-input-underline">
            <input
              {...register('footSize', { required: true, maxLength: 500 })}
              type="number"
              value={userdata.footSize || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  footSize: Number(e.target.value),
                }));
              }}
            />
          </label>
          <div className="gray-unit">mm</div>
        </div>

        {errors.footSize && errors.footSize.type === 'required' && (
          <div>발사이즈를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div className="user-input-container">
          <label className="tile-label">직업</label>
          <label className="signup-user-input-underline">
            <input
              {...register('job', { required: true, maxLength: 20 })}
              type="text"
              value={userdata.job}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  job: e.target.value,
                }));
              }}
            />
          </label>
        </div>

        {errors.job && errors.job.type === 'required' && (
          <div>직업을 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div className="user-input-container">
          <label className="tile-label">소개글</label>
          <label className="signup-user-text-box ">
            <textarea
              {...register('introduction')}
              value={userdata.introduction}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  introduction: e.target.value,
                }));
              }}
              placeholder={`최대 20자\nex) 인스타그램 계정을\n소개해주세요`}
            />
          </label>
        </div>

        <button
          type="submit"
          className={`user-data-sub ${
            isButtonDisabled ? 'user-disabled-button' : ''
          }`}
          disabled={isButtonDisabled}
        >
          입력 완료
        </button>
      </form>
    </>
  );
};

export default SignData;
