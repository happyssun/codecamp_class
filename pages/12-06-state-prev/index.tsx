import { useState } from "react";

export default function CounterStatePage() {
  const [count, setCount] = useState(0); // 기존방식:let count = 0

  function onClickCountUp() {
    // prev - 매개변수라 이름은 아무거나 상관없지만 통상적으로 prev로 사용 
    // 이 경우는 임시저장소에 전의 값을 찾아서 거기에 +1을 하고 또 +1을 하고 그래서 실행을 하면 3씩증가
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);

    // 이렇게 계속해도 그냥 count+1 : 현재는 임시저장소에 저장만 하는데, 함수가 끝나서 실행된게 아님으로 count값은 그냥 계속 0 - 1씩증가
    // setCount(count + 1)
    // setCount(count + 1)
    // setCount(count + 1)
  }

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기</button>{" "}
    </>
  );
}

/* 
기존방식은 변수를 만들고 화면애 보여주는 걸 또 해야하지만 현재 방식은
화면과 바로 연결이 가능하기에 현재방식 사용
*/
