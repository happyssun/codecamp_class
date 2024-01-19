// import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
// import {
//   Mutation,
//   MutationUploadFileArgs,
// } from "../../../src/commons/types/generated/types";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

// const UPLOAD_FILE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       url
//     }
//   }
// `;

export default function ImageUploadPage(): JSX.Element {
  // const [uploadFile] = useMutation<
  //   Pick<Mutation, "uploadFile">,
  //   MutationUploadFileArgs
  // >(UPLOAD_FILE);

  const [imageUrl, setImageUrl] = useState("");

  const onChangeFile = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0]; // 배열로 들어오는 이유 :<input type="file" multiple/>  multiple속성으로 여러개 드래그 가능
    if (file === undefined) return;
    console.log(file);

    // 벡엔드에서 데이터를 가져올건데 이게 백엔드에서 잘못될수도 있기 때문에 이런부분에는 try{}catch{}로 한번 감싸준다
    /*   try {
        const result = await uploadFile({
          variables: {
            file, // 여기있는 file이 위의 const file
          },
        });
        console.log(result.data?.uploadFile.url);
        setImageUrl(result.data?.uploadFile.url ?? ""); // 가저온 이미지 주소를 넣고 없으면 빈 문자열
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
        }
    */

    // 1. 임시 URL 생성 => (가짜 URL - 내 브라우저에서만 접근 가능)
    const result = URL.createObjectURL(file);
    console.log(result);

    // 2. 임시 URL 생성 => (진짜 URL - 다른 브라우저에서만 접근 가능)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      // 이 결과값을 보면 엄청 긴 내용이 나오는데 이건 주소가 아니고 사진 그 자체!  이걸 db에 저장하는게 아님
      console.log(event.target?.result); // 게시판에서 event.target.id를 쓰면 eslint가 잡았던 이유: event.target은 꼭 태그만이 아니기에 id를 쓰면 eslint에 걸린것
      if (typeof event.target?.result === "string")
        setImageUrl(event.target?.result); // 이 주소를 저장하는것
    };
  };

  return (
    <>
      <input type="file" onChange={wrapAsync(onChangeFile)} />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
    </>
  );
}

// 이미지 주소 앞에는 구글 컴퓨터 주소가 들어가야 한다.
