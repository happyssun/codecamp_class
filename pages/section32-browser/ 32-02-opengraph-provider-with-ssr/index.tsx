// 제공자일때 => 네이버, 다음, 쿠팡

import { gql, useQuery } from "@apollo/client";
import Head from "next/head";

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

export default function OpengraphProvider(): JSX.Element {
  const { data } = useQuery(FETCH_USEDITEM, {
    variables: { useditemId: "65718ad45d6eaa0029f7d061" },
  });

  return (
    <>
      <Head>
        <meta property="og:title" content={data?.fetchUseditem.name} />
        <meta property="og:description" content={data?.fetchUseditem.remarks} />
        <meta property="og:image" content={data?.fetchUseditem.images?.[0]} />
      </Head>
      <div>중고마켓에 오신 것을 환영합니다!(여기는 Body입니다)</div>
    </>
  );
}
