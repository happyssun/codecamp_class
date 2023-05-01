import { useState } from "react";
import Child1 from "../../src/components/units/14-lifting-state-up/Child1";
import Child2 from "../../src/components/units/14-lifting-state-up/Child2";

export default function LiftingStateUpPage() {
  const [count, setCount] = useState(0);

  // 부모의 조작방법 state - 1
  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <Child1 count={count} setCount={setCount} />
      <div>=========================</div>
      <Child2 count={count} onClickCountUp={onClickCountUp} />
    </>
  );
}

/* 
부모로 state 끌어올리기 - 두가지 방법
1. 클릭 이벤트 (setState변경)도 부모페이지로 옮기고 전체를 props로 받기
2. count state만 부모로 옮기고 클릭이벤트는 직접 자식페이지에서 만들기
  : 이때 setCount는 리턴안에서 받지않고 함수안에서 props로 받는다
*/
