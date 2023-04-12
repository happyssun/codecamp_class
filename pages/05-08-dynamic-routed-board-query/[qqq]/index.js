import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

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
  const router = useRouter();

  console.log(router);
  // 1. router를 콘솔로 찍어보면 그 안에 query가 있고
  // 2. 주소창에 /뒤에 들어가는 내용이 그 query안에 저장이 됨
  // 3. 05/board/[qqq]이렇게 해두면 위의내용이 qqq로 들어가게 됨
  console.log(router.query.qqq);
  // 현재 폴더이름을 [qqq]로 해놔서
  // 폴더에 []로 이름을 만들면 그안에는 변수가 되고 주소창에 /뒤에 어떤걸 넣더라도 그것이 []안에 변수가 되어들어감

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      number: Number(router.query.qqq),
      // 주소는 전부 문자열인데 $number: Int 숫자로 표기해야 함으로
      // graphql에서의 숫자는 Int, 자바스크립트는 Number
    },
  });

  console.log(data);

  return (
    <>
      <div> {router.query.qqq}번 게시글로 이동 완료!!</div>
      <div>작성자: {data ? data.fetchBoard.writer : "로딩중입니다.."}</div>
      <div>제목: {data && data.fetchBoard.title}</div>
      <div>내용: {data?.fetchBoard.contents}</div>
    </>
  );
}
