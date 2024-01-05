import { gql, useMutation } from "@apollo/client";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

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

export default function GraphqlMutation(): JSX.Element {
  const [myFunction] = useMutation(CREATE_BOARD);

  const onClickSubmit = async (): Promise<void> => {
    const result = await myFunction();
    console.log(result);
    alert(result.data.createBoard.message);
  };
  /* @eslint 형식때문에 비동기 타입일 경우 함수를 바로 바인딩을 할수가 없다
    꼭 이 규칙을 따를 필요가 없다면 
    "@typescript-eslint/no-misused-promises": "off"  - 부분을 eslint.js에 넣어주기

  따로 컴포넌트로 만들어 commons/libraries에 만들어놓은것을 사용
  (asyncFunc) 여기에는 함수의 타입형태로 들어가야 한다
  
  const wrapAsync = (asyncFunc:()=> Promise<void>) => () => {
    void asyncFunc()
  };
*/

  return (
    <>
      <button onClick={wrapAsync(onClickSubmit)}>
        GRAPHQL-API(동기) 요청하기
      </button>
    </>
  );
}
