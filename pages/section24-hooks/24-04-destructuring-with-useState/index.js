import { useState } from "react";

export default function CounterStatePage() {
  // 기존방식 : const [count, setCount] = useState(0);
  const result = useState(0);

  function onClickCountUp() {
    // 기존방식: setCount(count + 1);
    result[1](result[0] + 1);
  }

  function onClickCountDown() {
    // 기존방식: setCount(count - 1);
    result[1](result[0] - 1);
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
  구조 분해 할당으로 적용
*/
