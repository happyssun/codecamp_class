import { atom } from "recoil";

export const isEditState = atom({
  key: "isEditState", // 스테이트 이름
  default: true,     // 초기값
});
