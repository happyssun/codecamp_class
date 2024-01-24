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

export default function DataPrefetchMovedPage(): JSX.Element {
  const router = useRouter();

  console.log(router);
  // 1. router를 콘솔로 찍어보면 그 안에 query가 있고
  // 2. 주소창에 /뒤에 들어가는 내용이 그 query안에 저장이 됨
  // 3. 05/board/[qqq]이렇게 해두면 위의내용이 qqq로 들어가게 됨
  console.log(router.query.qqq);
  // 현재 폴더이름을 [qqq]로 해놔서
  // 폴더에 []로 이름을 만들면 그안에는 변수가 되고 주소창에 /뒤에 어떤걸 넣더라도 그것이 []안에 변수가 되어들어감

  // 원래라면 처음 페이지 로딩에는 데이터가 없어 리로딩되고 난후 데이터가 들어오는데
  // prefetch페이지에서 이미 마우스오버시 프리페치되게 해놔서 데이터를 이미 받아놓은 상태라 빠르게 진행됨
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.qqq,
    },
  });

  console.log(data);

  return (
    <>
      <div> {router.query.qqq}번 게시글로 이동 완료!!</div>
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data?.fetchBoard.title}</div>
      <div>내용: {data?.fetchBoard.contents}</div>
    </>
  );
}
