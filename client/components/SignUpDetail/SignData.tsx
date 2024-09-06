"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserDataType } from "@/types/type";
import axios from "axios";
import BackBar from "../Global/BackBar";
import { useSearchParams } from "next/navigation";
const SignData = () => {
  //닉네임 체크 관련 변수
  const [CheckNickname, setCheckNickname] = useState<string>("");
  //토큰
  const params = useSearchParams();
  const token = params.get("token");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserDataType>();
  const ninckNameCheckHandler = async () => {
    //닉네임 체크하는 axios요청 함수 checkNickname 변수를 담아서 보내기
    try {
      console.log(`서버에 보내는 토큰 ${token} , 닉네임 ${CheckNickname}`);
      const response = await axios.post(
        "http://localhost:8080/api/accounts/nicknameCheck",
        {
          params: { nickname: CheckNickname },

          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
        }
      );
      console.log(response, "성공");
    } catch (error) {}
  };

  const onSubmitHandler: SubmitHandler<UserDataType> = async (data) => {
    const transformedData = {
      ...data,
      height: Number(data.height),
      weight: Number(data.weight),
      footSize: Number(data.footSize),
    };
    console.log("버튼 입력시 들어가는 데이터", transformedData);
    // 회원 정보 입력 api 요청
    try {
      const response = await axios.post(
        "http://localhost:8080/api/accounts/signUp",
        transformedData
      );
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
    }
  };
  // 나중에 주소 env 처리 해줘야함
  // header 에 토큰 값 넣어야함
  return (
    <>
      <BackBar text=" 추가 정보 입력 " />

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label>계정명</label>
          <input
            {...register("nickname", { required: true, maxLength: 20 })}
            value={CheckNickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckNickname(e.target.value);
            }}
          />
          <button onClick={ninckNameCheckHandler}>중복 확인</button>
        </div>

        {errors.nickname && errors.nickname.type === "required" && (
          <div>닉네임을 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>키</label>
          <input {...register("height", { required: true, maxLength: 300 })} />
        </div>
        {errors.height && errors.height.type === "required" && (
          <div>키를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>몸무게</label>
          <input {...register("weight", { required: true, maxLength: 1000 })} />
        </div>

        {errors.weight && errors.weight.type === "required" && (
          <div>몸무게를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>발사이즈</label>
          <input
            {...register("footSize", { required: true, maxLength: 500 })}
          />
        </div>

        {errors.footSize && errors.footSize.type === "required" && (
          <div>발사이즈를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>직업</label>
          <input {...register("job", { required: true, maxLength: 20 })} />
        </div>

        {errors.job && errors.job.type === "required" && (
          <div>직업을 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>소개글</label>
          <input {...register("introduction")} />
        </div>

        <label className="user-data-sub"></label>
        <button type="submit" className="user-data-sub">
          입력 완료
        </button>
      </form>
    </>
  );
};

export default SignData;
