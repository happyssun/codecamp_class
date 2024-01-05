import { gql, useQuery } from "@apollo/client";
import type { Query } from "../../../src/commons/types/generated/types";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginSuccessPage(): JSX.Element {
  const { data, loading, error } =
    useQuery<Pick<Query, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  if (loading) {
    return <>로딩 중...</>; // 로딩 중임을 알리는 스피너 또는 메시지를 표시할 수 있습니다
  }

  if (error != null) {
    console.error(error);
    return <>사용자 데이터를 불러오는 중 오류가 발생했습니다.</>; // 오류 상태를 처리합니다
  }
  return (
    <>로그인 성공하였습니다! {data?.fetchUserLoggedIn.name}님 환영합니다!</>
  );
}
