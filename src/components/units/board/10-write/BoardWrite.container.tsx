/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.query";
import BoardWriteUI from "./BoardWrite.presenter";
import { IBoardWriteProps, IMyvariables } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [mycolor, setMycolor] = useState(false);

  // 이  이벤트는 new 페이지에서 실행 - 등록하기 버튼
  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        writer,
        title,
        contents,
      },
    });

    console.log(result);
    alert(result.data.createBoard.message);
    router.push(`/10-01-typescript-boards/${result.data.createBoard.number}`);
    /* 여기서 router는 등록하기를 클릭했을때 페이지주소에 새로 입력된 게시글의 넘버가
      보여지게 하게 위해 그 값을 data에서 가져오는 것 */
  };

  // 이  이벤트는 [number]/edit 페이지에서 실행 - 수정하기 버튼
  const onClickUpdate = async () => {
    // 1. new에서 작성했던 값을 디폴트값으로 가져오기
    // 처음에 빈값을 만들고, 넘버는 현재 무조건 생성이 되게 지정되어있으니 나머지만 빈값
    const myvariables: IMyvariables = {
      number: Number(router.query.number),
    };
    // 만약에 writer에 값이 있으면(빈문자열이 아니면, true이면) if(true)랑 같은 의미
    // writer 키값안에 writer state의 값(new에서 입력된 값)을 넣어라
    if (writer) myvariables.writer = writer;
    if (title) myvariables.title = title;
    if (contents) myvariables.writer = contents;

    // 2.수정하는 뮤테이션 날리기 - 변경된 값만 뮤테이션 날리기
    const result = await updateBoard({
      variables: myvariables,
    });

    // 3.상세페이지로 이동하기
    console.log(result);
    alert(result.data.updateBoard.message);
    router.push(`/10-01-typescript-boards/${result.data.updateBoard.number}`);
  };

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
    if (e.target.value && title && contents) {
      setMycolor(true);
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (writer && e.target.value && contents) {
      setMycolor(true);
    }
  };

  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
    if (writer && title && e.target.value) {
      setMycolor(true);
    }
  };

  return (
    <>
      {BoardWriteUI({
        onClickSubmit,

        onClickUpdate,
        onChangeWriter,
        onChangeTitle,
        onChangeContents,
        mycolor,
        isEdit: props.isEdit,
        data: props.data,
      })}
    </>
  );
}
/* 아래 내용과 위의것이 같음 - 함수형태로 만들어놓은것 밑에는 emotion을 이용한것
  <BoardWriteUI
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      mycolor={mycolor}
      isEdit={props.isEdit}
      data={props.data}
    /> */
