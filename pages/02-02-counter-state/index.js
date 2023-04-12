import { useState } from "react";

export default function CounterStatePage() {
  const [count, setCount] = useState(0); // 기존방식:let count = 0

  function onClickCountUp() {
    setCount(count + 1); // 기존방식: count = count +1
  }

  function onClickCountDown() {
    setCount(count - 1); // 기존방식: count = count -1
  }

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기</button>
      <button onClick={onClickCountDown}>카운트 내리기</button>
    </>
  );
}

/* 
기존방식은 변수를 만들고 화면애 보여주는 걸 또 해야하지만 현재 방식은
화면과 바로 연결이 가능하기에 현재방식 사용
*/
