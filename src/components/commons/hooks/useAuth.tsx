import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = (): void => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인을 먼저 하세요!");
      void router.push("/section23/23-05-login-check-hoc");
    }
  }, []);
};
