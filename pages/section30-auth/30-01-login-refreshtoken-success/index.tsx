import { gql, useApolloClient } from "@apollo/client";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginSuccessPage(): JSX.Element {
  // 1. 페이지 접속하면 자동으로 data에 받아지고(data는 globlastate에 저장), 리렌더링됨
  /*
  const { data, loading, error } =
    useQuery<Pick<Query, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  if (loading) {
    return <>로딩 중...</>; // 로딩 중임을 알리는 스피너 또는 메시지를 표시할 수 있습니다
  }

  if (error != null) {
    console.error(error);
    return <>사용자 데이터를 불러오는 중 오류가 발생했습니다.</>; // 오류 상태를 처리합니다
  }
  */

  // 2. 버튼 클릭시 data에 받아지고(data는 globalstate에 저장), 리렌더링됨
  // const [나의함수, { data }] = useLazyQuery(FETCH_USER_LOGGED_IN)

  // 3. axios처럼 사용하는 방법(얘도 data는 globalstate에 저장)
  // const client = useApolloClient()
  // client.query()  // axios.get()과 같음

  const client = useApolloClient();

  const onClickBtn = async (): Promise<void> => {
    try {
      const result = await client.query({
        query: FETCH_USER_LOGGED_IN,
      });
      console.log("Query result:", result);

      const userData = result?.data?.fetchUserLoggedIn;
      console.log("User data:", userData);

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!userData || !("_id" in userData) || userData._id === null) {
        console.error("Invalid user data:", userData);
        return;
      }

      console.log("User data is valid:", userData);
      // 여기에서 userData를 활용하여 화면에 표시하는 로직을 추가할 수 있습니다.
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      {/* <>로그인 성공하였습니다! {data?.fetchUserLoggedIn.name}님 환영합니다!</> */}
      <button onClick={wrapAsync(onClickBtn)}>버튼을 클릭하세요!</button>
    </>
  );
}

// wrapAsyn로 감싼이유는 이 함수가 async여서 그렇고 오류는 아니고 타입스크립트떄문이라 해놓은것쁜

// 리프레션 로그인 세션이 만료되면서 실패하는 로그인세션을 잡아서 다시 토큰을 생성해서 보내고 하는
// 3번 왔다갔다 해야하는데 이부분은 apollo셋팅에서 해야함
