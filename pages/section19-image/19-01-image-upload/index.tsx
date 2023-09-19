import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useState } from "react";
import {
  Mutation,
  MutationUploadFileArgs,
} from "../../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage(): JSX.Element {
  const [uploadFile] = useMutation<
    Pick<Mutation, "uploadFile">,
    MutationUploadFileArgs
  >(UPLOAD_FILE);

  const [imageUrl, setImageUrl] = useState("");

  const onChangeFile = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0]; // 배열로 들어오는 이유 :<input type="file" multiple/>  multiple속성으로 여러개 드래그 가능
    console.log(file);

    // 벡엔드에서 데이터를 가져올건데 이게 백엔드에서 잘못될수도 있기 때문에 이런부분에는 try{}catch{}로 한번 감싸준다
    try {
      const result = await uploadFile({
        variables: {
          file, // 여기있는 file이 위의 const file
        },
      });
      console.log(result.data?.uploadFile.url);
      setImageUrl(result.data?.uploadFile.url ?? ""); // 가저온 이미지 주소를 넣고 없으면 빈 문자열
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
      // if(error instanceof Error)가 없으면 error타입에러가 뜬다 그런데 catch(error:타입)을 지정할수 없다 이유는 백엔드 데이터이기때문에
      // 따라서 만약에(error가 Error의 자식중 하나라면..)이라는 조건을 달아준것
    }
  };

  return (
    <>
      <input type="file" onChange={onChangeFile} />
      <img src={`https://storage.googleapis.com/${imageUrl}`} />
    </>
  );
}

// 이미지 주소 앞에는 구글 컴퓨터 주소가 들어가야 한다.
