import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ComponentType, ReactElement } from "react";


// prettier-ignore
export const 로그인체크 = (컴포넌트: ComponentType) => <P extends {}>(프롭스:P): ReactElement<P>=> {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인을 먼저 하세요!");
      void router.push("/section23/23-05-login-check-hoc");
    }
  }, []);

  return<컴포넌트 {...프롭스}/>
};