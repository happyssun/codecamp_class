import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

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

export default function SpreadOperatorPage() {
  const [createBoard] = useMutation(CREATE_BOARD);

  // 인풋창에 들어갈 state 리팩토링
  const [inputs, setInputs] = useState({ writer: "", title: "", contents: "" });

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        ...inputs,
        /* 이 부분도 밑에와 같이 스프레드 연산자로 가능
        writer = inputs.writer,
        title,
        contents,
        */
      },
    });

    console.log(result);
    alert(result.data.createBoard.message);
  };

  /* 스프레드 연산자
  const onChangeWriter = (e) => {
    setInputs({
      writer: inputs.writer,        - 스프레드 연산자를 사용하는 원리
      title: inputs.title,          - 순서를 보면 아래의 writer가 위의 writer를 덮어쓴다 
      contents: inputs.contents,    - 그래서 inputs의 값을 흩뿌려주는 스프레드 연산자를 사용하고
      writer: e.target.value,       - 변경이 될 값을 e.target.value로 잡아주는것
    });
  };
  
    - 여기까지 보니,, 앞의 writer/title/contents만 다르고 e.target.value는 같다, 이걸 다시 리팩토링하면
    - 함수는 같은데 각 다른 값을 가져오게 하려면 id값을 넣어주면 된다 그렇기에 html부분에 id를 넣어주고 id값을 가져오게 만든다
      : 그러면 writer 자리에 그 대신 그 값을 나타내는 e.target.id을 넣어  e.target.id = e.target.value 게 만들어보자
      : 가능하게 보이겠지만 이것은 키(writer)가 들어가야할 자리에 e.target.id 이것이 키로 들어가는거라 이상한 것이 되는것
      : 그래서 e.target.id 라는 변수 안에 들어있는 그 값을 키로 만들고 싶을때 [e.target.id ] 이렇게 대괄호[]로 감싸준다
          - 여기서의 []는 배열이 아님으로 주의하자!!!!!!
      : 이렇게 되면 [e.target.id] 안에 writer가 들어있으니 키값은 writer가, 밑에는 title이 키값으로 들어갈 것이다
    - 그러면 각각 세개였던 함수를 다 같으니 한개로 줄일 수 있다. 

  */

  // 변경이 될 writer부분만 들어온 값으로 변경하고 나머지는 값을 변경없이 그대로 유지하기 위해 inputs.title
  const onChangeInputs = (e: any) => {
    setInputs({
      // writer: inputs.writer,     -
      // title: inputs.title,
      // contents: inputs.contents,
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  /* 이 함수들은 리팩토링하면서 하나로 만들어짐
  const onChangeTitle = (e) => {
    setInputs({
      ...inputs,
      [e.target.id] = e.target.value,
    });
  };

  const onChangeContents = (e) => {
    setInputs({
      ...inputs,
      [e.target.id] = e.target.value,
    });
  };
  */

  return (
    <>
      작성자: <input id="writer" type="text" onChange={onChangeInputs} />
      <br />
      제목: <input id="title" type="text" onChange={onChangeInputs} />
      <br />
      내용: <input id="contents" type="text" onChange={onChangeInputs} />
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}
