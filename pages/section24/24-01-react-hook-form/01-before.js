import { useState } from "react";

export default function GraphqlMutation() {
  // input 값을 받을 저장소 생성
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onClickSubmit = async () => {};

  // input창에서 이름을 입력하면 e.target.value에 저장이 되고 그 값을 변경값인 setWriter에 저장
  const onChangeWriter = (e) => {
    setWriter(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  console.log("리렌더링이 되나요?");

  return (
    <>
      작성자: <input type="tet" onChange={onChangeWriter} />
      <br />
      제목: <input type="tet" onChange={onChangeTitle} />
      <br />
      내용: <input type="tet" onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}
