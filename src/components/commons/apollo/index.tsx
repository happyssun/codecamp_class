import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
  });

  // 처음에는 바로 uri를 통해 연결했는데 나중에 연결해야할 것들이 많아지면
  // 하나하나 위 처럼 하나씩 연결할수 있게 링크형태로 만들고 (uri를 여기에 넣고)
  // 그것들을 client 안에는 link: 를 통해 연결해 준다
  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
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
