import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useState, useRef } from "react";
import {
  Mutation,
  MutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

// 파일 선택하는 버튼은 없앨수가 없다
// 그래서 이 버튼을 안보이게 하고 다른 가짜버튼을 만들어서 가짜버튼을 클릭하면 안보이게 만든 그 버튼이 클릭되게 연결
export default function ImageUploadPage() {
  const [uploadFile] = useMutation<
    Pick<Mutation, "uploadFile">,
    MutationUploadFileArgs
  >(UPLOAD_FILE);

  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null); // 처음엔 연결된것이 없으니 초기값을 null로

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    // <input type="file" multiple/>  multiple속성이 기본 : 한번에 여러개 등록가능
    // multiple이 기본적용이라 file?이 아니고 files? 가 되는것이고
    // .[0]은 파일을 하나만 등록할것이라 [0]배열에 하나만 들어가게 지정 한것
    const file = e.target.files?.[0];
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

  const onClickImage = () => {
    fileRef.current?.click();
  };

  return (
    <>
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
    </>
  );
}

// 이미지 주소 앞에는 구글 컴퓨터 주소가 들어가야 한다.

/* useRef() 참조해라
  const qqq = useRef() 
  그리고 참조할 내용은 input tag에서 ref={qqq} 이렇게 넣으면 두개가 연결됨
  가짜로 만든 버튼을 클릭하면 연결해놓은 input tag가 실행되게 하기위해
    qqq.current?.click() 
  그러면 가짜버튼을 클릭하면 실제 type="file"인 이 것이 클릭되는 것

*/
