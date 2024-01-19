import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  Mutation,
  MutationUploadFileArgs,
} from "../../../src/commons/types/generated/types";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

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

export default function ImageUploadPage(): JSX.Element {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File>();

  const [createBoard] = useMutation(CREATE_BOARD);
  const [uploadFile] = useMutation<
    Pick<Mutation, "uploadFile">,
    MutationUploadFileArgs
  >(UPLOAD_FILE);

  const onClickSubmit = async (): Promise<void> => {
    // 1. uploadFile - 이미지를 업로드해서 미리보기하고 다음에 등록을 눌러 보드 생성
    const resultFile = await uploadFile({ variables: { file } });
    const url = resultFile.data?.uploadFile.url;

    // 2. createBoard
    const result = await createBoard({
      variables: {
        // variables가 $역할
        createBoardInput: {
          writer,
          password: "1234", // 지금 useState를 안만들어서 하드코드로 걍 넣어놓은것
          title,
          contents: "내용입니다!!!",
          images: [url],
        },
      },
    });

    console.log(result);
  };

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>): void => {
    setWriter(e.target.value);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (file === undefined) return;
    console.log(file);

    // 1. 임시 URL 생성 => (가짜 URL - 내 브라우저에서만 접근 가능)
    const result = URL.createObjectURL(file);
    console.log(result);

    // 2. 임시 URL 생성 => (진짜 URL - 다른 브라우저에서만 접근 가능)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      // 이 결과값을 보면 엄청 긴 내용이 나오는데 이건 주소가 아니고 사진 그 자체!  이걸 db에 저장하는게 아님
      console.log(event.target?.result); // 게시판에서 event.target.id를 쓰면 eslint가 잡았던 이유: event.target은 꼭 태그만이 아니기에 id를 쓰면 eslint에 걸린것
      if (typeof event.target?.result === "string") {
        setImageUrl(event.target?.result); // 이 주소를 저장하는것
        setFile(file);
      }
    };
  };

  return (
    <>
      작성자: <input type="tet" onChange={onChangeWriter} />
      <br />
      제목: <input type="tet" onChange={onChangeTitle} />
      <br />
      <input type="file" onChange={wrapAsync(onChangeFile)} />
      <img src={imageUrl} />
      <button onClick={wrapAsync(onClickSubmit)}>등록하기</button>
    </>
  );
}

// 이미지 주소 앞에는 구글 컴퓨터 주소가 들어가야 한다.
