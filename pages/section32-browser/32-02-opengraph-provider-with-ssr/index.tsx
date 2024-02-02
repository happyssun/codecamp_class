// 제공자일때 => 네이버, 다음, 쿠팡

import { gql } from "@apollo/client";
import Head from "next/head";
import { GraphQLClient } from "graphql-request";

const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      images
    }
  }
`;

interface IgetServerSideProps {
  fetchUseditem: {
    name: string;
    remarks: string;
    images: string[];
  };
}

export default function OpengraphProvider(
  props: IgetServerSideProps
): JSX.Element {
  // 기존에 쓰던 CSR 방식
  // const { data } = useQuery(FETCH_USEDITEM, {
  //   variables: { useditemId: "65718ad45d6eaa0029f7d061" },
  // });

  console.log("props확인: ", props);

  return (
    <>
      <Head>
        <meta property="og:title" content={props?.fetchUseditem.name} />
        <meta
          property="og:description"
          content={props?.fetchUseditem.remarks}
        />
        <meta property="og:image" content={props?.fetchUseditem.images?.[0]} />
      </Head>
      <div>중고마켓에 오신 것을 환영합니다!(여기는 Body입니다)</div>
    </>
  );
}

// 1. getServerSideProps는 존재하는 단어이므로 변경 불가능
// 2. 여기는 브라우저에서는 실행안되고 서버에서만 실행되는것(프론트엔드 서버프로그램 => webpack 서버프로그램)

// 3. 백엔드에서 받은 요 데이터를 retrun하면 그 Prps를 넘겨받아 OpengraphProvider()에 들어감
export const getServerSideProps = async (): Promise<any> => {
  console.log("여기는 서버입니다");

  // 1)여기서 백엔드에 API 요청
  const graphQLClient = new GraphQLClient(
    "https://backend-practice.codebootcamp.co.kr/graphql"
  );
  const result = await graphQLClient.request(FETCH_USEDITEM, {
    useditemId: "65718ad45d6eaa0029f7d061",
  });
  console.log("결과값", result);

  // 2)받은 결과를 return
  return {
    props: {
      fetchUseditem: {
        name: result.fetchUseditem.name,
        remarks: result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      },
    },
  };
};

/*
이렇게하고 콘솔창에서 보면 content에 요청한 자료가 들어가있는것처럼 보인다
하지만 이것을 네트워크창에서 확인해보면 content가 들어와있지 않는것을 확인할수있다
브라우저와 같은 용도인 axios, 포스트맨에서 확인해봐도 content가 비어있다
이것은 CSR(클라이언트 사이드 렌더링) SSR(서버 사이트 렌더링)을 이해할 필요가 있따

1. CSR 
  - 브라우저에서 프론트엔드서버에 자료요청 => 데이터를 뺀 HTML자료만 전달
  - 브라우저가 HTML를 받아서 필요한 데이터들을 백엔드서버에 요청 => 백엔드에서 DB에서 자료를 받아 데이터 전달
  - 완성화면

2. SSR
  - 브라우저에서 프론트엔드 서버에 자료요청 => 데이터를 포함한 완벽한 자료를 요청한 것
  - 프론트엔드서버가 백엔드서버에게 데이터를 요청
  - 데이터까지 완벽하게 입력된 HTML을 브라우저에 전달


  CRS는 보여지는 화면용을 먼저 가져옴으로 빠르다 그래서 빨리 화면이 보여야 하는것들은 CRS로 하고
  상세페이지처럼 데이터를 한번에 다 받아와서 보여줘야 하는경우는 SSR를 사용하도록 하자
*/
