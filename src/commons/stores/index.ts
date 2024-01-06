import { atom, selector } from "recoil"; // 변수는 state는 atom으로  함수는 selcetor
import { getAccessToken } from "../libraries/getAccessToken";

export const isEditState = atom({
  key: "isEditState", // 스테이트 이름
  default: true, // 초기값
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const visitedPageState = atom({
  key: "visitedPageState",
  default: "",
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});
