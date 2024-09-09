//중복확인 했는지 안했는지 저장할 state추가 디폴트값 = false
//유저 정보 넘길때 쓸 interface 만들어서 type파일에 저장
//회원가입 버튼 눌렀을때 닉네임 중복확인 했을경우-> api 요청, 중복확인 안했을경우 -> 커서 닉네임 쪽으로 전환한뒤 경고 메시지 input 박스 아래에
"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { UserDataType } from "@/types/type";
import axios from "axios";
import BackBar from "../Global/BackBar";
import { redirect, useSearchParams } from "next/navigation";
import { UserData } from "@/types/type";
const SignData = () => {
  //닉네임 체크 관련 변수
  const [CheckNickname, setCheckNickname] = useState<string>("");

  //중복확인 변수
  const [isCheck, setIsCheck] = useState<boolean>(false);

  //닉네임이 변할때 마다 중복확인 변수를 false로 초기화
  useEffect(() => {
    setIsCheck(false);
    console.log(isCheck);
  }, [CheckNickname]);

  //토큰값 url에서 가져오기
  const params = useSearchParams();
  const token = params.get("token");

  //폼데이터
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserDataType>();

  //api 요청때 사용할 폼 데이터
  const [userdata, setUserData] = useState<UserDataType>({
    image: "",
    nickname: "",
    height: 0,
    weight: 0,
    footSize: 0,
    job: "",
    introduction: "",
  });

  const ninckNameCheckHandler = async () => {
    //닉네임 체크하는 axios요청 함수 checkNickname 변수를 담아서 보내기
    try {
      console.log(`서버에 보내는 토큰 ${token} , 닉네임 ${CheckNickname}`);
      const response = await axios.post(
        "http://localhost:8080/api/accounts/nicknameCheck",
        null,
        {
          params: { nickname: CheckNickname },

          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
        }
      );
      console.log(response.data.success, "성공");
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
    //닉네임 변수가 false 일경우,다른거 안적었을경우 제출버튼이 눌리지않음
    try {
      const response = await axios.post(
        "http://localhost:8080/api/accounts/signUp",
        userdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.success);
      if (response.data.success == true) {
        window.location.href = "/home";
      }
    } catch (error) {}
  };

  // 나중에 주소 env 처리 해줘야함
  // header 에 토큰 값 넣어야함
  return (
    <>
      <BackBar text=" 추가 정보 입력 " />

      <form onSubmit={handleSubmit(subUserDataHandler)}>
        <div>
          <label>계정명</label>
          <input
            {...register("nickname", { required: true, maxLength: 20 })}
            value={CheckNickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckNickname(e.target.value);
            }}
          />
          <button onClick={ninckNameCheckHandler} type="button">
            중복 확인
          </button>
        </div>

        {errors.nickname && errors.nickname.type === "required" && (
          <div>닉네임을 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>키</label>
          <input
            {...register("height", { required: true, maxLength: 300 })}
            type="number"
            value={userdata.height}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserData((prevUserData) => ({
                ...prevUserData,
                height: Number(e.target.value),
              }));
            }}
          />
        </div>
        {errors.height && errors.height.type === "required" && (
          <div>키를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>몸무게</label>
          <input
            {...register("weight", { required: true, maxLength: 1000 })}
            type="number"
            value={userdata.weight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserData((prevUserData) => ({
                ...prevUserData,
                weight: Number(e.target.value),
              }));
            }}
          />
        </div>

        {errors.weight && errors.weight.type === "required" && (
          <div>몸무게를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>발사이즈</label>
          <input
            {...register("footSize", { required: true, maxLength: 500 })}
            type="number"
            value={userdata.footSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserData((prevUserData) => ({
                ...prevUserData,
                footSize: Number(e.target.value),
              }));
            }}
          />
        </div>

        {errors.footSize && errors.footSize.type === "required" && (
          <div>발사이즈를 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>직업</label>
          <input
            {...register("job", { required: true, maxLength: 20 })}
            type="text"
            value={userdata.job}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserData((prevUserData) => ({
                ...prevUserData,
                job: e.target.value,
              }));
            }}
          />
        </div>

        {errors.job && errors.job.type === "required" && (
          <div>직업을 입력해 주세요!</div>
          // 나중에 붉은색으로 css입혀야함
        )}
        <div>
          <label>소개글</label>
          <input
            {...register("introduction")}
            type="text"
            value={userdata.introduction}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserData((prevUserData) => ({
                ...prevUserData,
                introduction: e.target.value,
              }));
            }}
          />
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
