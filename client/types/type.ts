//직업 열거형(enum타입) 정의
//todo:추가해야함
//회원가입 상세 정보
export interface UserDataType {
  image: string;
  nickname: string;
  height: number;
  weight: number;
  footSize: number;
  job: string;
  introduction: string;
}

// back- bar프롭스 타입
export interface BackBarTextType {
  text: string;
}
