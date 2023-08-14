import styled from "@emotion/styled";
import { gql, useQuery } from "@apollo/client";
import type {
  Query,
  QueryFetchBoardsArgs,
} from "../../../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
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

export default function FetchPolicyComponentPage() {
  const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.writer}</Column>
          <Column>{el.contents}</Column>
        </Row>
      ))}
    </>
  );
}

/* 
fetch policy 
  - 기본적으로 API 데이터를 요청하면 캐시에 가서 이미 요청해서 저장된 자료가 있는지를 확인한다
    : 이것이 cache-first
  - 그런데 캐시에 저장된 데이터가 아닌 무조건 백엔드에 가서 데이터를 다시 가져오고 싶을때는 정책변경을 해줘야 함

    const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
    , { fetchPolicy: "network-only}




*/
