import { useQuery, gql } from "@apollo/client";
import {
  Query,
  QueryFetchBoardArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage() {
  const { data } = useQuery<Pick<Query, "fetchBoard">, QueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        number: 238,
      },
    }
  );
  console.log(data);

  return (
    <>
      <div> 1번 게시글로 이동 완료!!</div>
      <div>작성자: {data ? data.fetchBoard?.writer : "로딩중입니다.."}</div>
      <div>제목: {data?.fetchBoard?.title}</div>
      <div>내용: {data?.fetchBoard?.contents}</div>
    </>
  );
}
