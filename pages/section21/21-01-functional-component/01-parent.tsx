import ChildPage from "./02-child";

export default function ParentPage(): JSX.Element {
  return (
    <>
      {/* <ChildPage count={10} /> */}
      {ChildPage({ count: 10 })}
    </>
  );
}

/* 함수형 컴포넌트는 말그대로 함수다
  <ChildPage count={10} />  =  {ChildPage({ count: 10 })}

  childPage 안에있는 props는 매개 변수로 사실 이름을 마음대로 바꿀수 있다. 그냥 통상적으로 props 쓰는것뿐
*/
