import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { useState, MouseEvent } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
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

  const [myIndex, setMyIndex] = useState([
    false, // index 0
    false, // index 1
    false, // index 2
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onClickEdit = (e: MouseEvent<HTMLButtonElement>) => {
    // const qqq = myIndex;
    // 위의 값은 myIndex 배열의 값이 아닌 주소만 같은 값이다. 따라서 밑에서 ===false로 값을 비교할때 두개의 값이 같기에 작동이 되지 않는다

    const qqq = [...myIndex]; // 배열의 주소를 하나 더 만들어서 그곳에 값을 넣는것
    qqq[Number(e.currentTarget.id)] = true;
    setMyIndex(qqq);
  };

  return (
    <>
      {data?.fetchBoards.map((el, index) => (
        <Row key={el._id}>
          {!myIndex[index] && (
            <>
              <Column>{index + 1}</Column>
              <Column>{el.writer}</Column>
              <Column>{el.contents}</Column>
              <button id={String(index)} onClick={onClickEdit}>
                수정하기
              </button>
            </>
          )}
          {!myIndex[index] && (
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
