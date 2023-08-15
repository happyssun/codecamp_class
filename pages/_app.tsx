import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import ApolloSetting from "../src/components/commons/apollo";
import Layout from "../src/components/commons/layout";
import { globalStyles } from "../src/components/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";

function App({ Component }: AppProps) {
  // const client = new ApolloClient({
  //   uri: "http://practice.codebootcamp.co.kr/graphql",
  //   cache: new InMemoryCache(),
  // });

  return (
    <RecoilRoot>
      <ApolloSetting>
        <>
          <Global styles={globalStyles} />
          <Layout>
            <Component />
          </Layout>
        </>
      </ApolloSetting>
    </RecoilRoot>

    // <ApolloProvider client={client}>
    //   <Layout>
    //     <Component />
    //   </Layout>
    // </ApolloProvider>
  );
}

export default App;

// component를 layout으로 감싸줘서 페이지 전체의 레이아웃을 지정
// 모든 페이지 안에 Layout이 들어옴 그 레이아웃안에 내용이 들어가는 것임

/* 나중에 app.tsx 부분에 이런저런 프로바이더들이 들어옴 
그렇기 때문에 이런것들을 정리해줌 - 주석처리한 부분들
( apollo는  grahpql API를 사용하게 해주는 도구
  apolloprovider 여기 안에서만 useMutation이런것이 사용가능
)
: 결론적으로는 app실행이 되면 ApolloProvider가 보이게 되는 것 
: 더이상 가장 기본인 app.tsx은 정리가 되고 필요한 설정들은 찾아들어가서 보면됨

*/
