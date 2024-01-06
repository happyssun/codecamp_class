import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import { restoreAccessTokenLoadable } from "../../../commons/stores";

export const loginCheck = (Component: any) => (props: any) => {
  const router = useRouter();

  // recoil에 있는것을 글로벌로 요청하기 위해서 - 아폴로에서도 사용되고 요기서도 사용되니까 이것을 글로벌로 만들어놓음
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  // 1. 로그인 체크(refreshToken 이전)
  /*
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다!");
      void router.push("/section23/23-05-login-check-hoc");
    }
  }, []);
  */

  // 2. 로그인 체크(refreshToken 이후) : 안좋음 -app.tsx에 이어서 총 2번 요청하게 됨 - 비효율
  /*
  useEffect(() => {
    void getAccessToken().then((newAccessToken) => {
      if (newAccessToken === undefined) {
        alert("로그인 후 이용 가능합니다!");
        void router.push("/section23/23-05-login-check-hoc");
      }
    });
  }, []); */

  // 3. 로그인 체크(refreshToken 이후) :좋음 - 함수를 공유하므로 _app.tsx에 이어서 총 1번만 요청
  useEffect(() => {
    void aaa.toPromise().then((newAccessToken) => {
      if (newAccessToken === undefined) {
        alert("로그인 후 이용 가능합니다!");
        void router.push("/section23/23-05-login-check-hoc");
      }
    });
  }, []);
  return <Component {...props} />;
};
