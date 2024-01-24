// 게시판에서 게시글에 사용자가 마우스를 오버했을때
// 그 게시물에 대한 내용을 미리 prefetch

import { useQuery, gql, useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

import { useRouter } from "next/router";
import _debounce from "lodash/debounce";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
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

export default function DataPrefetchPage(): JSX.Element {
  const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const client = useApolloClient();

  // 게시판에서 게시글에 마우스를 오버할때 미리 그 게시물 내용 다운해오기
  // 마우스오버가 될때마다 모든 게시물이 다 prefetch되니까 그걸 방지하기 위해
  // debounce 해줌 - 1초동안 마우스가 오버되었을때만 작동
  const prefetchBoard = _debounce(async (boardId: string) => {
    await client.query({
      query: FETCH_BOARD,
      variables: { boardId },
    });
  }, 1000);

  const router = useRouter();
  const onClickMove = (boardId: string) => () => {
    void router.push(
      `/section31-memoization/31-10-data-prefetch-moved/${boardId}`
    );
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column
            onMouseOver={() => prefetchBoard(el._id)}
            onClick={onClickMove(el._id)}
          >
            {el.title}
          </Column>
          <Column>{el.writer}</Column>
        </Row>
      ))}
    </>
  );
}
