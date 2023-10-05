import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { useState, MouseEvent } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      number
      writer
      title
      contents
    }
  }
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
`;

export default function CommentEditPage() {
  const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const [myIndex, setMyIndex] = useState(5);

  const onClickEdit = (e: MouseEvent<HTMLButtonElement>) => {
    setMyIndex(Number(e.currentTarget.id));
  };

  return (
    <>
      {data?.fetchBoards.map((el, index) => (
        <Row key={el._id}>
          {index !== myIndex && (
            <>
              <Column>{index + 1}</Column>
              <Column>{el.writer}</Column>
              <Column>{el.contents}</Column>
              <button id={String(index)} onClick={onClickEdit}>
                수정하기
              </button>
            </>
          )}
          {index === myIndex && (
            <div>
              {" "}
              수정할 내용 : <input type="text"></input>
            </div>
          )}
        </Row>
      ))}
    </>
  );
}
