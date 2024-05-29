'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserDataType } from '@/types/type';
import axios from 'axios';

const SignData = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserDataType>();

  const onSubmitHandler: SubmitHandler<UserDataType> = async (data) => {
    const transformedData = {
      ...data,
      height: Number(data.height),
      weight: Number(data.weight),
      footSize: Number(data.footSize),
    };
    console.log('버튼 입력시 들어가는 데이터', transformedData);
    // 회원 정보 입력 api 요청
    try {
      const response = await axios.post(
        'http://localhost:8080/api/accounts/signUp',
        transformedData
      );
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
    }
  };
  // 나중에 주소 env 처리 해줘야함
  // header 에 토큰 값 넣어야함
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label>계정명</label>
        <input {...register('nickname', { required: true, maxLength: 20 })} />
        {errors.nickname && errors.nickname.type === 'required' && (
          <div>닉네임을 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <label>키</label>
        <input {...register('height', { required: true, maxLength: 300 })} />
        {errors.height && errors.height.type === 'required' && (
          <div>키를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <label>몸무게</label>
        <input {...register('weight', { required: true, maxLength: 1000 })} />
        {errors.weight && errors.weight.type === 'required' && (
          <div>몸무게를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <label>발사이즈</label>
        <input {...register('footSize', { required: true, maxLength: 500 })} />
        {errors.footSize && errors.footSize.type === 'required' && (
          <div>발사이즈를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <label>직업</label>
        <input {...register('job', { required: true, maxLength: 20 })} />
        {errors.job && errors.job.type === 'required' && (
          <div>직업을 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <label>소개글</label>
        <input {...register('introduction')} />
        <button type="submit">등록</button>
      </form>
    </>
  );
};

export default SignData;
