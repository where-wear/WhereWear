import { create } from 'zustand';
import { AddlogData } from '@/types/type';

// Zustand store 생성
interface AddlogDataState {
  logData: AddlogData;
  setLogData: (data: AddlogData) => void;
}

//전역 상태관리 라이브러리
export const useStore = create<AddlogDataState>((set) => ({
  logData: {
    logImageList: [],
    text: '',
    tag: [],
    item: [],
    place: { placeName: '', placeAddress: '', placeX: '', placeY: '' },
    isShow: true,
  },
  setLogData: (data) => set({ logData: data }),
}));
