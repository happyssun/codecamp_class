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

  // 파일을 여러개 등록
  const [imageUrls, setImageUrls] = useState(["", "", ""]); // 이미지 미리보기
  const [files, setFiles] = useState<File[]>([]); // 이미지 등록

  const [createBoard] = useMutation(CREATE_BOARD);
  const [uploadFile] = useMutation<
    Pick<Mutation, "uploadFile">,
    MutationUploadFileArgs
  >(UPLOAD_FILE);

  const onClickSubmit = async (): Promise<void> => {
    // 1. uploadFile - 이미지를 업로드해서 미리보기하고 다음에 등록을 눌러 보드 생성

    /* 1-1) 안좋은 예제 - await를 매번 기다림 => for문 사용해도 마찬가지(이유: i값에 await가 의존함으로)
    const resultFile0 = await uploadFile({ variables: { file: files[0] } });
    const resultFile1 = await uploadFile({ variables: { file: files[1] } });
    const resultFile2 = await uploadFile({ variables: { file: files[2] } });

    const url0 = resultFile0.data?.uploadFile.url;
    const url1 = resultFile1.data?.uploadFile.url;
    const url2 = resultFile2.data?.uploadFile.url;

    const resultUrls = [url0, url1, url2] */

    /* 1-2) 좋은예제 - Promise.all 사용
    const results = await Promise.all([
      uploadFile({ variables: { file: files[0] } }),
      uploadFile({ variables: { file: files[1] } }),
      uploadFile({ variables: { file: files[2] } }),
    ]);

    console.log(results) // [resultFile0,resultFile1,resultFile2,]  -- 요기서 각각 url를 뽑아와햐함
    const resultUrls = results.map(el => el.data?.uploadFile.url) // [url0, url1, url2] */

    /* 1-3) 좋은예제 - Promise.all 사용 ==> 요것을 map을 통해 리펙토링
    const files = [file0, file1, file2]
    files.map(el => uploadFile({ variables: { file: el } }))  == 요거 자체가 배열 */
    const results = await Promise.all(
      files.map(async (el) => await uploadFile({ variables: { file: el } }))
    );
    console.log(results); // [resultFile0,resultFile1,resultFile2]
    const resultUrls = results.map((el) => el.data?.uploadFile.url); // [url0, url1, url2]

    // 2. createBoard
    const result = await createBoard({
      variables: {
        // variables가 $역할
        createBoardInput: {
          writer,
          password: "1234", // 지금 useState를 안만들어서 하드코드로 걍 넣어놓은것
          title,
          contents: "내용입니다!!!",
          images: resultUrls, //  [resultUrls] 이렇게 하면 안됨! 왜냐 map으로 한 결과값인 이것 자체가 배열임으로
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

  const onChangeFile =
    (index: number) =>
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
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
          // 이미지가 있는 주소 가져오기
          // 이미지를 변경한 부분만 변경되게  얕은복사[...]
          /* 얕은복사 - 스프레드연산자를 이용해 [...imageUrls]를 하지 않으면 깊은복사가 되어서 imageUrls에 영향을 주어
                tempUrls의 값을 변경하면 기존 imageUrls도 변경이 되어버림 - 영향을 안주기 위해서 */
          const tempUrls = [...imageUrls]; // 이미지 주소값을 복사헤와서 그것을 임시저장Url로 만듦
          tempUrls[index] = event.target?.result; // 해당 index부분에다 결과값을 가져와서
          setImageUrls(tempUrls); // 이미지를 변경

          // 그 파일을 가져오기
          const tempFiles = [...files]; // 불러온 이미지의 주소를 가져와서 파일이 미리보기 되게
          tempFiles[index] = file;
          setFiles(tempFiles);
        }
      };
    };

  return (
    <>
      작성자: <input type="tet" onChange={onChangeWriter} />
      <br />
      제목: <input type="tet" onChange={onChangeTitle} />
      <br />
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div>
          <input type="file" onChange={wrapAsync(onChangeFile(0))} />
          <img src={imageUrls[0]} />
        </div>
        <div>
          <input type="file" onChange={wrapAsync(onChangeFile(1))} />
          <img src={imageUrls[1]} />
        </div>
        <div>
          <input type="file" onChange={wrapAsync(onChangeFile(2))} />
          <img src={imageUrls[2]} />
        </div>
      </div>
      <div></div>
      <button onClick={wrapAsync(onClickSubmit)}>등록하기</button>
    </>
  );
}

// 이미지 주소 앞에는 구글 컴퓨터 주소가 들어가야 한다.
