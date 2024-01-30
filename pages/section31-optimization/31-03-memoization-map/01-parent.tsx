/* eslint-disable array-callback-return */
import { useState } from "react";
import ChildWordPage from "./02-child";
// import { v4 as uuidv4 } from "uuid";

export default function MemoizationMapParentPage(): JSX.Element {
  const [data, setData] = useState("철수는 오늘 점심을 맛있게 먹었습니다");
  const onClickChange = (): void => {
    setData("영희는 오늘 저녁을 맛없게 먹었습니다");
  };

  return (
    <div>
      {data.split("").map((el, index) => {
        <ChildWordPage key={index} el={el} />; // 1. memo시, key또는 el이 변경된 부분만 리렌더링
      })}

      {/* 2. memo를 한다해도, uuid떄문에 key 자체가 변경되어 5개 모두 리렌더링 ==> 이런경우 memo를 사용하지 않아야함 */}
      {/* {data.split("").map((el, index) => {
        <ChildWordPage key={uuidv4()} el={el} />; 
      })} */}

      <button onClick={onClickChange}>문장 체인지</button>
    </div>
  );
}

/**
 * 부모가 리렌더링되면 자식도 자동으로 리렌더링이 된다
 * 그래서 memo(자식컴포넌트) 이렇게 해서 import해 옴
 * 자식 컴포넌트의 값이 저장이 됨으로 부모를 리렌더링해도 자식이 리렌더링 되지않음
 * 그런데 el={el} 이렇게 props를 넣어주면 이 경우는 memo()를 했더라도
 * 리액트가 자동으로 리렌더링을 한다
 * 버튼을 클릭해서 보면
 * 빈칸을 기준으로 spilt 하였으니 el이 총 5개
 * 철수는, 오늘, 점심을, 맛있게, 먹었습니다
 * 이 el값을 memo해 두었기에
 * 버튼을 눌러서 setData값을 "영희는 오늘 저녁을 맛없게 먹었습니다" 변경했을때
 * 값 중에서 변경된 영희는, 저녁을, 맛없게
 * 이렇게 3개의 변한 el값일 때만 리렌더링이 된다
 */
