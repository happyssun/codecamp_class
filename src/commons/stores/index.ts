import { atom, selector } from "recoil"; // 변수는 state는 atom으로  함수는 selcetor
import { getAccessToken } from "../libraries/getAccessToken";

export const classIsEditState = atom({
  key: "classIsEditState",
  default: true,
});

export const classAccessTokenState = atom({
  key: "classAccessTokenState",
  default: "",
});

export const classVisitedPageState = atom({
  key: "classVisitedPageState",
  default: "",
});

export const classRestoreAccessTokenLoadable = selector({
  key: "classRestoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});
