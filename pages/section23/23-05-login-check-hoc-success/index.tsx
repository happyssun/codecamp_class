import { gql, useQuery } from "@apollo/client";
import type { Query } from "../../../src/commons/types/generated/types";
import { loginCheck } from "../../../src/components/commons/hocs/withAuth";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

function HocSuccessPage(): JSX.Element {
  const { data } =
    useQuery<Pick<Query, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  /* 이 권한체크하는 부분을 따로 컴포넌트로 빼서 사용
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인을 먼저 하세요!"); 
      void router.push("/section23/23-05-login-check-hoc");
    }
  }, []);
  */

  return (
    <>로그인 성공하였습니다! {data?.fetchUserLoggedIn.name}님 환영합니다!</>
  );
}

export default loginCheck(HocSuccessPage);
// 이렇게 하면 컴포넌트로 따로 만들어둔 loginCheck 함수를 먼저 하고
// 그리고 나서 지금 HocSucceccPage가 실행이 되는것임
