import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

// 변수에 받아서 넣기, $는 변수
// playground 참조하여 작성
const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    #변수의 타입 적음
    createBoard(writer: $writer, title: $title, contents: $contents) {
      #실제 전달할 변수를 적음
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutation() {
  const [createBoard] = useMutation(CREATE_BOARD);

  // input 값을 받을 저장소 생성
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        // variables가 $역할
        // state저장소에 있는 값 입력 - input 입력값이 저장
        writer: writer,
        title: title,
        contents: contents,
      },
    });

    console.log(result);
    alert(result.data.createBoard.message);
  };

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
