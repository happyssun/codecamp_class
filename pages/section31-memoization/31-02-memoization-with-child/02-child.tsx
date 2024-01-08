// 부모가 리렌더링 되도 자식이 리렌더링 되지 않게 하기위해 memo를 사용하여 함수 전체를 감싸서 내보냄

import { memo } from "react";

function MemoizationWithChildPage(): JSX.Element {
  console.log("자식 컴포넌트가 렌더링 됩니다!");

  return (
    <div>
      <div>=================================================</div>
      <h1>자식 컴포넌트 입니다!!</h1>
      <div>=================================================</div>
    </div>
  );
}

export default memo(MemoizationWithChildPage);
