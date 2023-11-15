// import ReactQuill from "react-quill";
// import { Modal } from "antd";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    #변수의 타입 적음
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;


// xss - cross site script : 다른 사이트에 태그를 심는다
export default function WebEditorXssPage(): JSX.Element {
  // use-hook-form에서 quill의 value값을 사용할수 있도록 강제로 값을 넣어주는것 setValue
  const { handleSubmit, register, setValue, trigger } = useForm();

  const [createBoard] = useMutation(CREATE_BOARD);
  const router = useRouter();

  const onChangeContents = (value: string): void => {
    console.log(value);

    // register로 등록하지 않고, 강제로 값을 넣어줌
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onChange가 되었으니 에러검증 같은것들을 해달라고 react-hook-form에 알려줌
    void trigger("contents");
  };

  // useEffect(() => {
  //   async function aaa(): Promise<void> {
  //     const { Modal } = await import("antd"); // 성능 최적화 / code-splitting
  //   Modal.success({ content: "게시글이 등록되었습니다!" });
  //   }
  //   void aaa()
  // },[])

  const onClickSubmit = async (data: any): Promise<void> => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.contents,
        },
      },
    });

    // event.preventDefault(); 만들어둔 컴포넌트 불러다가 사용
    const { Modal } = await import("antd"); // 성능 최적화 / code-splitting
    Modal.success({ content: "게시글이 등록되었습니다!" });

    const boardId = result.data.createBoard._id;
    void router.push(
      `/section27-editor/27-03-web-editor-xss-detail/${boardId}`
    );
  };

  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type="text" {...register("writer", { required: true })} />
      <br />
      비밀번호:{" "}
      <input type="password" {...register("password", { required: true })} />
      <br />
      제목: <input type="text" {...register("title", { required: true })} />
      <br />
      내용:
      <ReactQuill theme="snow" onChange={onChangeContents} />
      <button>등록하기</button>
    </form>
  );
}

/**
 * 등록하기 버튼을 누르면 onClickSubmit의 async 다음에 있는 ()에 들어가면서
 * 리액트훅폼의 register로 작성자 비번 제목이 들어가고 quill의 값을 훅폼에 강제로
 * setValue를 통해 넣어줘서 값을 넣어준다.
 * 그런데 값을 넣어준 것이지 onChangeContents 값이 변경된것은 아니다
 * 이때, trigger를 통헤 훅폼에다가 값이 변경되었으니 이것도 함게 검증해줘라고 알려주는것
 * 그런데 contents값에 스페이스바를 눌러서 <p><br></p> 이런식으로 값은 없는데 빈칸이 입력된다면
 * 검증할때 내용이 있는것처럼 된다.. 그렇기 때문에
 * setValue("contents", value === "<p><br></p>"? "" :value);
 * "<p><br></p>"? "" 이런값들은 "" 빈값으로 바꿔치기하고 그렇지 않을 경우만 value값을 넣어줘
 * 이런 구문을 달아줘야 훅폼에서 검증이 제대로 잘 이루어짐
 * handlesubmit = register로 만든 입력된 값들을 넣어주는것 검증가능
 */
