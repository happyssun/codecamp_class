import { useQuery, gql } from "@apollo/client";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;

/* mutation은 함수로 만들어서 내가 함수를 요청할때만 실행이 되지만
   query는 함수를 만들수없어 페이지 열리면 바로 백엔드로 요청이 들어가고 실행된다 */

/*
    useQuery가 비동기 방식으로 작동하기 때문에 await를 사용할수 없다
    그렇기 때문에 백엔드에 요청한 data가 채 불러와지기 전에 다음으로 넘어간다
    그래서 처음 실행이 되면 data가 없기에 undifinded가 나오게된다
    몇 초후에 data가 들어오면 그 때 다시한번 함수가 실행이 되어서
    콘솔창에서는 처음 실행에 undefinded 그 밑에 data가 보여지게 되지만
    이미 출력이 되어 나타난 return문 {data.fetchBoard.writer}은
    data가 없는채로 화면에 출력이 되어야 하니 에러문이 뜨는 것이다.
    이것을 해결하기 위해 if문과 같은 '조건부 렌더링'을 사용한다
    {data && data.fetchBoard.writer}
      - data가 있으면 &&의 오른쪽 것을 보여줘, 없으면 앞에 것 보여줘
    앞에는 undefinded니까  보여지지 않고 후에 data 받고나면 보여짐
    개발자모드 네트워크탭에서 no throtiling에 들어가서 속도를 낮춰보면
    두번 실행되는 것을 확인할 수 있는데
    처음에는 하드코딩되어있는 '1번 게시글 보여줘'같은 부분들이 보이고
    두번째에 데이터가 들어오는 것을 확인할 수 있다.

  */

export default function StaticRoutedPage() {
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      number: 238,
    },
  });
  console.log(data);

  return (
    <>
      <div> 1번 게시글로 이동 완료!!</div>
      <div>작성자: {data ? data.fetchBoard.writer : "로딩중입니다.."}</div>
      <div>제목: {data && data.fetchBoard.title}</div>
      <div>내용: {data?.fetchBoard.contents}</div>
    </>
  );
}

/* 조건부 렌더링
1. 삼항 연산자
  data ? data.fetchBoard.write : "로딩중입니다.."
    - data가 있으면 ? 뒤에 있는 것을 보여주고 없으면 : 뒤에있는것을 보여줘
2. && 연산자
  data && data.fetchBoard.writer
  - data가 있으면 &&의 오른쪽 것을 보여줘, 없으면 앞에 것 보여줘 
3. 옵셔널 체이닝
  data?.fetchBoard.write
  - 위와 같음
  */
