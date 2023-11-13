// import ReactQuill from "react-quill";
// import { Modal } from "antd";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage(): JSX.Element {
  // 원래 onChange는 event가 들어오는데 ReactQuill이런건 그 개발자들이 만든것이라 마다 다름 : 웹페이지 보고 확인
  // 여기선 value값이 들어옴
  const onChangeContents = (value: string): void => {
    console.log(value);
  };

  // useEffect(() => {
  //   async function aaa(): Promise<void> {
  //     const { Modal } = await import("antd"); // 성능 최적화 / code-splitting
  //   Modal.success({ content: "게시글이 등록되었습니다!" });
  //   }
  //   void aaa()
  // },[])

  const onClickSubmit = async (): Promise<void> => {
    // event.preventDefault(); 만들어둔 컴포넌트 불러다가 사용
    const { Modal } = await import("antd"); // 성능 최적화 / code-splitting
    Modal.success({ content: "게시글이 등록되었습니다!" });
  };

  return (
    <form onSubmit={wrapFormAsync(onClickSubmit)}>
      작성자: <input type="text" />
      <br />
      비밀번호: <input type="password" />
      <br />
      제목: <input type="text" />
      <br />
      내용:
      <ReactQuill theme="snow" onChange={onChangeContents} />
      <button>등록하기</button>
    </form>
  );
}

/* 
import ReactQuill from "react-quill"를 해서 가져오면 document is not defined 오류 발생
Next.js에서 document, localStorage, window와 같은 브라우저 전용 객체들을 사용할 때,
서버 사이드 렌더링(SSR) 환경에서는 이러한 객체들이 존재하지 않기 때문에 오류가 발생
그래서 dynamic import를 사용하여 서버사이드환경(SSR)이 아닌 곳에서 ReactQuill를 import한다

react-quill 사용할때는 css도 같이 가져와야 한다. 안그러면 오류 발생
웹페이지에 가서 보면 supported themes:Snow and Bubble 확인가능
*/

/**
 * form태그에는 onSubmit이 내장
 * onSubmit은 이게 실행이 되면 자동으로 페이지를 이동하려고 함 그래서 웹페이지 주소가 이상해짐
 * 그렇기에 태그의 기본 기능을 없애버림
 * event.preventDefault()
 * - libraries에 asyncFunc로 만들어 놨으니 요걸 불러와서 사용


 * import를 처음부터 하지 말고 필요시점에 다운받아 쓸수 있게  - 근데 이건 좀 느림
 * useEffect로도 가능 - 얜 코드가 복잡  - 상황에 따라 맞게하자
 */
