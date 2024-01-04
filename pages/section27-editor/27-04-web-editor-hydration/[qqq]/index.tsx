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
      <div style={{ color: "red" }}>작성자: {data?.fetchBoard.writer}</div>
      <div style={{ color: "blue" }}>제목: {data?.fetchBoard.title}</div>
      {/* <div>내용: {data?.fetchBoard.contents}</div> */}

      {/* next.js는 서버에서 먼지 프리렌더링을 하고 결과를 받아 브라우저에서 다시 조합하는 하이드레이션을 한다 
        - 하이드레이션 이슈 발생 -
        ssr에서 프리렌더링이 안되는 퀼때문애 현재 typeof window !== "undefined" 조건을 걸어놨다
        그래서 색상이 orange색이 보이지 않고 서버에서 프리렌더링이 되는 red, blue, green이 보일것이다. 
        그렇기 떄문에 서버의 프리렌더링을 위해 밑에 빈 div태를 넣어놓고 서버에선 이것을 보여줘 이렇게 조건을 걸어놓은것  */}
      {/* div 및 span 태그로 dangerouslySetInnerHTML 를 사용한다면 반드시 빈 태그 형식으로 작성해야함. */}
      {typeof window !== "undefined" ? (
        <div
          style={{ color: "orange" }}
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard?.contents),
          }}
        />
      ) : (
        <div style={{ color: "pink" }} /> // 서버에서는 이것을 프리 렌더링 할것임 - 그래서 핑크가 보여질것
      )}
      <div style={{ color: "green" }}>주소: 구로구</div>
    </>
  );
}

/**
 * next.js는 첫 접속때 모든 페이지를 서버에서 먼저 프리랜더링해서  next서버에 .next파일에 넣어놓는다 : build
 * 프리렌더링된 HTML코드 다운로드
 * TTV : time to view - 프리렌더링된 html, 먼저 필요한 공통 css, js를 렌더링하는데 걸리는 시간
 * Hydration : 클릭이벤트같은 현재페이지에서의 사용되는 JS를 적용시켜서 페이지가 완전히 상호작용 가능하게 되는것
 * TTI : time to interactive - Hydration 되는데까지 걸리는 시간
 */
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
 * DOMPurify 라이브러리를 사용하여 HTML을 정리하고, 안전하게 렌더링하기 위한 코드입니다.
 * DOMPurify는 브라우저에서 제공하는 기본적인 HTML 정리 능력을 보완하여 XSS 공격으로부터 보호
 */
