import { useRouter } from "next/router";

export default function StaticRoutingPage() {
  const router = useRouter();

  const onClickMove1 = () => {
    router.push("/05-08-dynamic-routed-board-query/238"); //앞에 서버주소는 생략가능
  };
  const onClickMove2 = () => {
    router.push("/05-08-dynamic-routed-board-query/880");
  };
  const onClickMove3 = () => {
    router.push("/05-08-dynamic-routed-board-query/900");
  };

  const onClickMove4 = () => {
    router.push("/05-08-dynamic-routed-board-query/950");
  };

  return (
    <>
      <button onClick={onClickMove1}>238번 게시글로 이동하기!</button>
      <br />
      <button onClick={onClickMove2}>880번 게시글로 이동하기!</button>
      <br />
      <button onClick={onClickMove3}>900번 게시글로 이동하기!</button>
      <br />
      <button onClick={onClickMove4}>950번 게시글로 이동하기!</button>
      <br />
      <p>직접 주소창에 입력해서 하고싶으면 05-08번 주소로 /뒤에 번호입력</p>
    </>
  );
}
