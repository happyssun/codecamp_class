import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function EditorXssDetatilPage(): JSX.Element {
  const router = useRouter();

  console.log(router);
  // 1. router를 콘솔로 찍어보면 그 안에 query가 있고
  // 2. 주소창에 /뒤에 들어가는 내용이 그 query안에 저장이 됨
  // 3. 05/board/[qqq]이렇게 해두면 위의내용이 qqq로 들어가게 됨

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.qqq,
    },
  });

  return (
    <>
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data?.fetchBoard.title}</div>
      <div>내용: {data?.fetchBoard.contents}</div>
    </>
  );
}
