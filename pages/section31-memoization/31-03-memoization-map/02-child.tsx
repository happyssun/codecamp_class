import React, { memo } from "react";

interface IChildWordProps {
  el: string;
}

 function ChildWordPage(props: IChildWordProps): JSX.Element {
  console.log("자식이 렌더링됩니다!", props.el);
  return <span>{props.el}</span>;
}

export default memo(ChildWordPage)