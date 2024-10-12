//직업 열거형(enum타입) 정의
//todo:추가해야함
//회원가입 상세 정보
export interface UserDataType {
  image: File | null;
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

// Add title 타이틀 프롭스 타입(상단 제목)
export interface AddTitlePropsType {
  text: string;
}

//로그 타입
export interface AddlogData {
  logImageList: { imageName: string; imageData: string }[];
  text: string;
  tag: string[];
  item: { categoryId: number; itemName: string }[];
  place: {
    placeName: string;
    placeAddress: string;
    placeX: string;
    placeY: string;
  };
  isShow: boolean;
}

//카카오 로컬 api 타입
export interface KakaoLocalResultType {
  id: number;
  place_name: string;
  address_name: string;
  x: string;
  y: string;
}

//로그인시 회원정보

export interface UserData {
  nickname: string;
  image: string;
  height: number;
  weight: number;
  footSize: number;
  job: string;
  introduction: string;
}

//맵 마커 로그 개수 데이터
export interface MapMarkerCountData {
  x: number;
  y: number;
  count: number;
}
