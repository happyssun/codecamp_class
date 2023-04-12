import { gql, useMutation } from "@apollo/client";

// 변수에 받아서 넣기, $는 변수
// playground 참조하여 작성
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
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        // variables가 $역할
        writer: "sun",
        title: "hi!!",
        contents: "i am Sun",
      },
    });

    console.log(result);
    alert(result.data.createBoard.message);
  };

  return (
    <>
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}
