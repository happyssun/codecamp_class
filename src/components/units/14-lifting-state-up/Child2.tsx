export default function Child2(props: any) {
  return (
    <>
      <div>자식 2의 카운트 : {props.count}</div>
      <button onClick={props.onClickCountUp}>카운트 올리기!!</button>
    </>
  );
}
