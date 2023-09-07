import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Query } from "../../../../src/commons/types/generated/types";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LocalStorageSuccessPage(): JSX.Element {
  const router = useRouter();
  const { data } =
    useQuery<Pick<Query, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  // 로컬스토리지에 accessToken이 없으면 로그인은 해달라고 하고 로그인페이지로 다시 이동
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인을 먼저 하세요!");
      void router.push("/section23/23-03-login-check");
    }
  }, []);
  return (
    <>로그인 성공하였습니다! {data?.fetchUserLoggedIn.name}님 환영합니다!</>
  );
}
