import styled from "@emotion/styled";
import { gql, useQuery } from "@apollo/client";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;

// const Row = styled.div`
//   display: flex;
// `;

// const Column = styled.div`
//   width: 25%;
// `;

export default function FetchPolicyMovedPage() {
  const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  return (
    <>
      페이지 이동됨!
      {/* {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.writer}</Column>
          <Column>{el.contents}</Column>
        </Row>
      ))} */}
    </>
  );
}
