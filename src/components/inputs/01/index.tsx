import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  type?: "text" | "password";
  // type? ?은 타입이 안들어왔을때.. 그래서 밑에서 지정가능 props.type ?? "text"
  // 타입이 안들어있는것은 "text"로 해라
  register: UseFormRegisterReturn;
  // register는 리액트훅폼에서 가져온것이라 거기것을 사용
}

export default function Input01(props: IInputProps): JSX.Element {
  return (
    <>
      <input type={props.type ?? "text"} {...props.register} />
    </>
  );
}
