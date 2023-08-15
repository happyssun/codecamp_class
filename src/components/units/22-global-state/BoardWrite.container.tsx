import BoardWriteUI from "./BoardWrite.presenter";

// 원래 isEdit를 props로 받아와서 보내야 하지만 recoil을 사용해서 그럴 필요가 없음
// export default function BoardWrite(props: any) {
//   return <BoardWriteUI isEdit={props.isEdit} />;
// }

export default function BoardWrite() {
  return <BoardWriteUI />;
}
