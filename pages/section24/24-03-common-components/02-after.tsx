import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./02-after.validation";
import Input01 from "../../../src/components/inputs/01";
import Button01 from "../../../src/components/buttons/01";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  email: string;
  password: string;
  phone: string;
}

export default function GraphqlMutation(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange", // 언제 검증을 할 것인지
  });

  const onClickSubmit = (data: IFormData): void => {
    console.log(data);
  };

  // react-hook-form은 리렌더링이 되지않아 빠르다
  console.log("리렌더링이 되나요?");

  // form형태는 한가지로 묶어서 사용할때 사용하기 좋다
  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자:
      <Input01 register={register("writer")} />
      <div style={{ color: "red" }}>{formState.errors.writer?.message}</div>
      제목: <Input01 register={register("title")} />
      <div style={{ color: "red" }}> {formState.errors.title?.message}</div>
      내용: <Input01 register={register("contents")} />
      <div style={{ color: "red" }}>{formState.errors.contents?.message}</div>
      이메일: <Input01 register={register("email")} />
      <div style={{ color: "red" }}>{formState.errors.email?.message}</div>
      비밀번호: <Input01 type="password" register={register("password")} />
      <div style={{ color: "red" }}>{formState.errors.password?.message}</div>
      핸드폰 번호: <Input01 register={register("phone")} />
      <div style={{ color: "red" }}>{formState.errors.phone?.message}</div>
      <Button01 title="등록하기" isActive={formState.isValid} />
    </form>
  );
}

// 헷갈리지 말자
// 여기서의  <Input01 type="text"은
// src / component / inputs와 바인딩이 된것이다.
// 만약에 지금처럼 훅폼이 register를 사용한 경우가 아니라면 onChagne={}이렇게 할텐데
// 실제로 이거을 props로 받아서 실행하는 것은 Input01 이것이다. 해당파일에 바인딩해야함

/* 

html에 있는 기능 - form안의 버튼은 submit가 기본값
<button type="reset">지우기</button>
<button type="submit">등록하기</button> // 기본값
<button type="button" onClick={}>장바구니</button> // form안에서 이 버튼기능을 따로 적용하고싶을때 - 함수 바인딩
*/
