import * as S from "./BoardWrite.styles";

export default function BoardWriteUI(props) {
  return (
    <>
      작성자:
      <S.RedInput type="text" onChange={props.onChangeWriter}></S.RedInput>
      <br />
      제목: <input type="text" onChange={props.onChangeTitle} />
      <br />
      내용: <input type="text" onChange={props.onChangeContents} />
      <br />
      <S.BlueButton
        rrr="20px"
        qqq="white"
        zzz={props.mycolor}
        onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
      >
        {props.isEdit ? "수정하기" : "등록하기"}
      </S.BlueButton>
    </>
  );
}

/* 
17번의 onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
이건 버튼에 나올 글자인데.. isEdit가 false냐 true냐에 따라 등록하기 혹은 수정하기가 나오게됨
 */
