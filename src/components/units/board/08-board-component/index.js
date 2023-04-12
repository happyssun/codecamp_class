export default function BoardComponent(props) {
  return (
    <>
      <h1>{props.isEdit ? "수정" : "등록"}페이지</h1>
      <input type="text">제목</input>
      <br />
      <input type="text">내용</input>
      <br />
      <button>{props.qqq}</button>
    </>
  );
}

/*
{props.isEdit? "수정" : "등록"}
isEdit가 true이면 "수정" : false이면 "등록" 
*/
