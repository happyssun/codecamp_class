import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";

interface IApolloSettingProps {
  children: JSX.Element;
}

// 이렇게 빼놓은 이유
// 아폴로세팅함수가 리렌더 되더라도 cache가 리렌더링 되지 않게 하기 위해 - section22 부분 확인
const GLOBAL_STATE = new InMemoryCache();

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken] = useRecoilState(accessTokenState);

  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",

    // 모든 페이지에 acessToken을 전달하기 위해
    headers: {
      Authorization: `Bearer ${accessToken}`, //
    },
  });

  // 처음에는 바로 uri를 통해 연결했는데 나중에 연결해야할 것들이 많아지면
  // 하나하나 위 처럼 하나씩 연결할수 있게 링크형태로 만들고 (uri를 여기에 넣고)
  // 그것들을 client 안에는 link: 를 통해 연결해 준다
  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    // cache: new InMemoryCache(), - 이부분을 따로 빼서 저장
    // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시저장 - 이부분이 글로벌스테이트
    cache: GLOBAL_STATE,
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}

// yarn add apollo-upload-client 파일을 업로드 하기 위해 필요한 설치
// yarn add @types/apollo-upload-client --dev 타입스크립트도 설치
// 그런 다음 createUploadLink 연결
