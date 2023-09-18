import { gql, useMutation } from "@apollo/client";

// 하드코딩 - 자료를 아예 지정한 경우 : 거의 사용안함!  예제기 때문에 이렇게 사용
const CREATE_BOARD = gql`
  mutation {
    createBoard(writer: "sun", title: "Title", contents: "this is contents") {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutation() {
  const [myFunction] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await myFunction();
    console.log(result);
    alert(result.data.createBoard.message);
  };

  return (
    <>
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}
