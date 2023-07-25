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

// 검증하기 - 이 검증은 다른곳에서도 쓸일이 있다?? 그러면 공통사용(commons/libraries)에 분리해놓고 재사용하자
export default function ImageUploadPage() {
  const [uploadFile] = useMutation<
    Pick<Mutation, "uploadFile">,
    MutationUploadFileArgs
  >(UPLOAD_FILE);

  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null); // 처음엔 연결된것이 없으니 초기값을 null로

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // <input type="file" multiple/>  multiple속성으로 여러개 드래그 가능
    console.log(file);

    // file을 mutation 보내기 전에 검증을 해야함 : 용량체크라든가 하는.. 먼저 필터링 하는것
    if (!file?.size) {
      alert("파일이 없습니다");
      return; // 이 조건이 맞으면 바로 onChangeFile 함수가 중단이 되고 밑의 과정이 일어나지 않음
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("파일용량이 너무 큽니다.(제한 : 5MB)");
      return;
    }

    // 확장자 선택하는 검증은 태그안에 accept를 이용해 바로 넣어서도 가능함
    // accept로 하면 아예 초기에 막는것이고 if문으로 넣으면 우선은 허용하되 조건문으로 불가하게 만드는것
    if (!file.type.includes("jpeg") && !file.type.includes("png")) {
      alert(" jpeg 파일 또는 png 파일만 업로드 가능합니다!");
      return;
    }

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
        accept="image/jpeg"
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

// 태그 안에 바로 accept="image/jpeg" 를 넣으면 image.jpeg파일 빼고는 아예 선택이 안됨 - 초기에 아예 막아버림 : 상황에 따라 사용
