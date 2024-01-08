import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../../commons/stores";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";

interface IApolloSettingProps {
  children: JSX.Element;
}

// 이렇게 빼놓은 이유
// 아폴로세팅함수가 리렌더 되더라도 cache가 리렌더링 되지 않게 하기 위해 - section22 부분 확인
const GLOBAL_STATE = new InMemoryCache();

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  // 아폴로세팅을 작업을 하는 작업
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
  /* pre-redering 예제

1. process.browser 방법
  if (process.browser) {
    console.log("지금은 브라우저!");
    alert("브라우저에서 실행")
   
  } else {
    console.log("지금은 프론트엔드 서버 즉 yarn dev로 실행시킨 프로그램 내부 ");
  }

2. typeof window 방법
  if (typeof window !== "undefined") {
    console.log("지금은 브라우저!");
    alert("브라우저에서 실행")
  } else {
    console.log("지금은 프론트엔드 서버 즉 yarn dev로 실행시킨 프로그램 내부 ");
  }

3. 프리렌더링을 무시 - useEffect 방법 : 가장 많이 사용 */

  useEffect(() => {
    // 1. 기존방식(refreshToken 이전)
    /*
    const result = localStorage.getItem("accessToken");

    // 로컬스토리지에 저장한 accessToken을 가져오는데 값이 만약에 없다면 ""(빈문자열)
    // setState에 저장되는것은 다 문자열로 바뀌어 저장됨
    */

    // 2. 새로운방식(refreshToken 이후)
    void aaa.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? "");
    });
  }, []);

  // 로그인세션이 만료되고 리프레쉬 토큰을 재발급 받기위해서
  /* errorLink는 밑의 new ApolloClient애서 uploadLink 앞에 들어가야함
  실행을 하다가 에러가 잡히는 순간,
    graphQLErrors - 에러가 들어오고 [배열형태로 들아옴]
    operation - 방금 실패한 쿼리가 들어오고
    forward - 쿼리를 재요청하기위해 필요한 함수
  */

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당에러가 토큰말료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            /* 재사용 가능성이 높아 library에 따로 분리
            // 여기서 아직 아폴로세팅중이라 useMutation을 사용못해서 GraphQL-Client API 사용
            
            const graphQLClient = new GraphQLClient(
              "http://backend-practice.codebootcamp.co.kr/graphql"
            );
            const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
            const newAccessToken = result.restoreAcessToken.accessToken;
            */

            // 2. refreshToken으로 accessToken을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? ""); // 위에 새로 발급받은 토큰을 recoail에다 저장

              // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기
              /**
               * getContext() - header같은 정보들을 가지고 오는 명령어
               * setContext() - 수정
               */
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 기존의 모든정보를 가져오는데(요기에 기존의 `Bearer ${accessToken}`정보가있음)
                  Authorization: `Bearer ${newAccessToken}`, // 3-2. 그안의 Authorization을 새로운 토큰으로 바꿔줘
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-3. 방금 수정한 쿼리 재요청
        }
      }
    }
  });

  // =======================================================================
  // 위의 아폴로세팅이 끝나고 여기가 실행될 부분들
  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",

    // 모든 페이지에 acessToken을 전달하기 위해
    headers: {
      Authorization: `Bearer ${accessToken}`,

      // 주고받고 하는데 중요한 쿠키같은것들을 포함시키겠다
      credentials: "include",
    },
  });

  // 처음에는 바로 uri를 통해 연결했는데 나중에 연결해야할 것들이 많아지면
  // 하나하나 위 처럼 하나씩 연결할수 있게 링크형태로 만들고 (uri를 여기에 넣고)
  // 그것들을 client 안에는 link: 를 통해 연결해 준다
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    // cache: new InMemoryCache(), - 이부분을 따로 빼서 저장
    // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시저장 - 이부분이 글로벌스테이트
    cache: GLOBAL_STATE,
  });

  // prettier-ignore
  // 세팅이 다 완료되고 나서 실행 됨 - 여기 {props.children }에서 mutation, query등이 실행
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}

// yarn add apollo-upload-client 파일을 업로드 하기 위해 필요한 설치
// yarn add @types/apollo-upload-client --dev 타입스크립트도 설치
// 그런 다음 createUploadLink 연결

/* next.js의 hydration 이해




*/
