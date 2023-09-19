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

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>): void => {
    setWriter(e.target.value);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onChangeContents = (e: ChangeEvent<HTMLInputElement>): void => {
    setContents(e.target.value);
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    // file을 mutation 보내기 전에 검증
    // libraries에 만든것 불러오기
    // early exit로 만든 if문(이렇게 불러오기 전 기존에 만들어놓은)이 조건에 따라 return되면서 밑의 모든 내용들이 중단
    // 그런데 이경우에는 checkValidation(file)함수만 중단이 됨으로 밑의 내용들이 실행된다
    // 그래서 libraries에 있는 파일의 retrun을 그냥 리턴이 아니고 return false로 변경 - false를 반환하게 만들고
    // isValid가 false라면(!isValid) 리턴해줘  --  밑에것을 실행 못하
    // 19-03번 파일과 libraries에 있는 validation.ts 비교
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

  const onClickImage = (): void => {
    fileRef.current?.click();
  };

  const onClickSubmit = async (): Promise<void> => {
    const result = await createBoard({
      variables: {
        // variables가 $역할
        createBoardInput: {
          writer,
          password: "1234", // 지금 useState를 안만들어서 하드코드로 걍 넣어놓은것
          title,
          contents,
          images: [imageUrl],
        },
      },
    });

    console.log(result);
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
