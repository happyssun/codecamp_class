// 부모가 리렌더링 되면 자식은 자동으로 리렌더링이 된다
// 이것을 막기위해 자식에 가서 자식부분을 전부 memo로 감싸서 가져옴

import React, { useCallback, useMemo, useState } from "react";
import MemoizationWithChildPage from "./02-child";

export default function MemeizationPage(): JSX.Element {
  console.log("부모 컴포넌트가 렌더링 되었습니다");

  let countLet = 0; // 리렌더링이 되지 않아 숫자가 증가는 되지만 화면에 숫자가 올라간것이 보이지 않음
  const [countState, setCountState] = useState(0); // 리렌더링이 됨

  const aaa = useMemo(() => Math.random(), []);
  console.log(aaa);

  // 2. useCallbak()으로 함수 기억하기
  const onClickCountLet = useCallback((): void => {
    console.log(countLet + 1);
    countLet += 1; // countLet = countLet + 1,[])
  }, []);

  // 3. useCallback() 주의사항 ==> state 사용 주의
  const onClickCountState = useCallback((): void => {
    setCountState((prev) => prev + 1);
  }, []);

  return (
    <>
      <div>=================================================</div>
      <h1>부모 컴포넌트 입니다!!</h1>
      <div>카운트(let) : {countLet} </div>
      <button onClick={onClickCountLet}> +1 올리기</button>
      <div>카운트(state) : {countState} </div>
      <button onClick={onClickCountState}>+1 올리기</button>
      <div>=================================================</div>
      <MemoizationWithChildPage />
    </>
  );
}

/**
 // 리렌더링이 되지않음 : 버튼클릭시 숫자는 증가해서 콘솔창에 찍히기는 하나 화면에 보이지 않음
 * let countLet = 0; 
 *  const onClickCountLet = (): void => {
    console.log(countLet + 1);
    countLet += 1; // countLet = countLet + 1
  };

 // state에 값을 저장한 상태로 리렌더링이 됨 : 그러면서 위의 위의 let도 여기 state도 전부 리렌더링
 그래서 useState()는 값을 저장한채로 리렌더링이 되니 버튼 누를떄 값이 변화하지만
 let은 리렌더링이 되지않기에 밑에서 onClickCountState() 버튼을 누르면 다시 초기화가 되어 0이다



 */
