import { BlueButton, RedInput } from "./BoardWrite.styles";

export default function BoardWriteUI(props) {
  // 자바스크립트 영역

  //HTML 영역(return 아래)
  return (
    <>
      <div>presenter에서 작성 : 최하위 자식</div>
      작성자: <RedInput type="tet" onChange={props.onChangeWriter}></RedInput>
      <br />
      제목: <input type="tet" onChange={props.onChangeTitle} />
      <br />
      내용: <input type="tet" onChange={props.onChangeContents} />
      <br />
      <BlueButton onClick={props.onClickSubmit}>
        GRAPHQL-API(동기) 요청하기
      </BlueButton>
    </>
  );
}
