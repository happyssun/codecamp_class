import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./02-after.validation";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  // boardAddress: {
  //   addressDetail: string;
  // };
  email: string;
  password: string;
  phone: string;
}

/* yup을 통해 검증하기 - 이부분은 따로 검증부분으로 컴포넌트
const schema = yup.object({
  writer: yup.string().required("작성자를 입력하세요"),
  title: yup.string().required("제목을 입력하세요"),
  contents: yup.string().required("내용을 입력하세요"),
  email: yup
    .string()
    .email("이메일 형식에 적합하지 않습니다")
    .required("이메일은 필수 입력입니다"),
  password: yup
    .string()
    .min(4, "비밀번호는 최소 4자리 이상입니다.")
    .max(10, "비밀번호는 최대 10자리 이하입니다")
    .required("비밀번호는 필수입력입니다"),
  phone: yup
    .string()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/, "휴대폰 번호입력에 맞지 않습니다"),
  // 정규표현식 //안에 넣음 ^시작 $끝 \d 숫자
});
*/

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
      작성자: <input type="text" {...register("writer")} />
      <div style={{ color: "red" }}>{formState.errors.writer?.message}</div>
      제목: <input type="text" {...register("title")} />
      <div style={{ color: "red" }}> {formState.errors.title?.message}</div>
      내용: <input type="text" {...register("contents")} />
      <div style={{ color: "red" }}>{formState.errors.contents?.message}</div>
      {/* 주소: <input type="text" {...register("boardAddress.addressDetail")} /> */}
      이메일: <input type="text" {...register("email")} />
      <div style={{ color: "red" }}>{formState.errors.email?.message}</div>
      비밀번호: <input type="text" {...register("contents")} />
      <div style={{ color: "red" }}>{formState.errors.password?.message}</div>
      핸드폰 번호: <input type="text" {...register("phone")} />
      <div style={{ color: "red" }}>{formState.errors.phone?.message}</div>
      <button style={{ backgroundColor: formState.isValid ? "yellow" : "" }}>
        GRAPHQL-API(동기) 요청하기
      </button>
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
