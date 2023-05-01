// import { useState } from "react";  - 부모로 state 이동

export default function Child1(props: any) {
  // 부모로 state를 끌어올리기
  // const [count, setCount] = useState(0);
  // const onClickCountUp = () => {
  //   setCount((prev) => prev + 1);
  // };

  // 부모의 조작방법 state - 2
  const onClick = () => {
    props.setCount((prev: number) => prev + 1);
  };

  return (
    <>
      <div>자식 1의 카운트 : {props.count}</div>
      <button onClick={onClick}>카운트 올리기!!</button>
    </>
  );
}
