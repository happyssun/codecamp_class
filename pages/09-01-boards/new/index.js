import BoardWrite from "../../../src/components/units/board/09-write/BoardWrite.container";

export default function BoardWritePage() {
  return <BoardWrite isEdit={false} />;
}

/*
props drilling - 
isEdit={false }여기에서 isEdit는 
자식인 BoardWrite.container로 props되고 다시 
그 밑의 자식 BoardWrite.presenter로 props된다.

나중에 유지보수 하기 쉽지 않아서 props drilling을 자주 사용하면 좋지않다
지금은 흐름을 보기위해서 사용 -연습용으로는 좋으니  흐름을 보자!

*/
