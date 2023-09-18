import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const [createBoard] = useMutation(CREATE_BOARD);
  // input 값을 받을 저장소 생성
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onClickSubmit = async () => {
    // 코드를 잘 짜도 백엔드에서 실수가 있을수 있어서 try()에서 시도
    // try에 있는 내용은 순서대로 시도하다가 실패하면, 이후에것은 모두 무시하고 바로 catch가 실행됨
    try {
      const result = await createBoard({
        variables: {
          writer: writer,
          title: title,
          contents: contents,
        },
      });

      console.log(result);
      alert(result.data.createBoard.message);
      console.log(result.data.createBoard.number); //받아온 게시판의 번호

      router.push(
        `/05-10-dynamic-routed-board-mutation/${result.data.createBoard.number}` //백엔드에서 받아온 number
      );
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
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
      작성자: <input type="text" onChange={onChangeWriter} />
      <br />
      제목: <input type="text" onChange={onChangeTitle} />
      <br />
      내용: <input type="text" onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>게시물 등록하기</button>
    </>
  );
}
