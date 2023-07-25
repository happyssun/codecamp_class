import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useState, useRef } from "react";
import {
  Mutation,
  MutationUploadFileArgs,
} from "../../src/commons/types/generated/types";
import { checkValidationFile } from "../../src/commons/libraries/validationFile";

// 변수에 받아서 넣기, $는 변수
// playground 참조하여 작성
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    #변수의 타입 적음
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function BoardWritePage() {
  const [createBoard] = useMutation(CREATE_BOARD);

  const [uploadFile] = useMutation<
    Pick<Mutation, "uploadFile">,
    MutationUploadFileArgs
  >(UPLOAD_FILE);

  // input 값을 받을 저장소 생성
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        // variables가 $역할
        createBoardInput: {
          writer,
          password: "1234",
          title,
          contents,
          images: [imageUrl],
        },
      },
    });

    console.log(result);
  };

  // input창에서 이름을 입력하면 e.target.value에 저장이 되고 그 값을 변경값인 setWriter에 저장
  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    try {
      const result = await uploadFile({
        variables: {
          file,
        },
      });
      console.log(result.data?.uploadFile.url);
      setImageUrl(result.data?.uploadFile.url ?? "");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  return (
    <>
      작성자: <input type="tet" onChange={onChangeWriter} />
      <br />
      제목: <input type="tet" onChange={onChangeTitle} />
      <br />
      내용: <input type="tet" onChange={onChangeContents} />
      <br />
      <div
        style={{ width: "80px", height: "30px", backgroundColor: "skyblue" }}
        onClick={onClickImage}
      >
        이미지 선택
      </div>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={onChangeFile}
        ref={fileRef}
      />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
      <button onClick={onClickSubmit}>등록하기</button>
    </>
  );
}
