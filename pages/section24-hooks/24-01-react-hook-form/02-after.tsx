import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  boardAddress: {
    addressDetail: string;
  };
}

export default function GraphqlMutation(): JSX.Element {
  // register를 통해 속성을 등록
  // 폼태그에 handleSubmit에 return에 지정해놓은 onClick을 매개변수
  const { register, handleSubmit } = useForm<IFormData>();

  const onClickSubmit = (data: IFormData): void => {
    console.log(data);
  };

  // react-hook-form은 리렌더링이 되지않아 빠르다
  console.log("리렌더링이 되나요?");

  // form형태는 한가지로 묶어서 사용할때 사용하기 좋다
  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type="text" {...register("writer")} />
      제목: <input type="text" {...register("title")} />
      내용: <input type="text" {...register("contents")} />
      주소: <input type="text" {...register("boardAddress.addressDetail")} />
      <button>GRAPHQL-API(동기) 요청하기</button>
      {/* <button type="button" onClick={onClickBasket}>장바구니 담기</button> */}
    </form>
  );
}

/* 

html에 있는 기능 - form안의 버튼은 submit가 기본값
<button type="reset">지우기</button>
<button type="submit">등록하기</button> // 기본값
<button type="button" onClick={}>장바구니</button> // form안에서 이 버튼기능을 따로 적용하고싶을때 - 함수 바인딩
*/
