import { useState } from "react";

export default function CounterLetPage() {
  const [count, setCount] = useState(0);

  function onClickCountUp(): void {
    // 1. 화살표 함수 prev + 1는 리턴값인데 값이 하나여서 생략해서 쓴것
    setCount((prev) => prev + 1);

    // 2.  함수 선언식
    setCount(function (prev) {
      // 로직 추가 가능
      // if()
      // for () 등등

      return prev + 1;
    });

    // 3. 매개변수 바꾸기 : prev도 그냥 통상적인 이름일뿐
    setCount((asdfadf) => asdfadf + 5);
  }

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기</button>
    </>
  );
}
