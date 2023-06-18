import styled from "@emotion/styled";
import { useState } from "react";
import { Board } from "../../../commons/types/generated/types";

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
`;

interface IProps {
  el: Board;
}

export default function BoardCommentItem(props: IProps) {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  return (
    <Row>
      {!isEdit && (
        <>
          <Column>{props.el.writer}</Column>
          <Column>{props.el.contents}</Column>
          <button onClick={onClickEdit}>수정하기</button>
        </>
      )}
      {!isEdit && (
        <div>
          {" "}
          수정할 내용 : <input type="text"></input>
        </div>
      )}
    </Row>
  );
}
