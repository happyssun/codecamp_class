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

export default function BoardDetailPage() {
  const router = useRouter();

  console.log(router);
  console.log(router.query.number);
  // 현재 폴더이름을 [number]로 해놔서
  // 폴더에 []로 이름을 만들면 그안에는 변수가 되고 주소창에 /뒤에 어떤걸 넣더라도 그것이 []안에 변수가 되어들어감

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      number: Number(router.query.number),
      // 주소는 전부 문자열인데 $number: Int 숫자로 표기해야 함으로
      // graphql에서의 숫자는 Int, 자바스크립트는 Number
    },
  });

  console.log(data);

  const onClickMovetoEdit = () => {
    router.push(`/09-01-boards/${router.query.number}/edit`);
    // 여기서의 router는 router안에 있는 query에 저장되어있는 [number]에 들어간 값을 가져오는것
    // 주소가 "08-05-boards/[number]/edit" 여기까지 이동해야함
    // [number]가 게시글 번호니까 24번줄에 있는 내용을 가져옴
  };

  return (
    <>
      <div> {router.query.number}번 게시글로 이동 완료!!</div>
      <div>작성자: {data ? data.fetchBoard.writer : "로딩중입니다.."}</div>
      <div>제목: {data && data.fetchBoard.title}</div>
      <div>내용: {data?.fetchBoard.contents}</div>
      <button onClick={onClickMovetoEdit}>내용 수정하기</button>
    </>
  );
}
