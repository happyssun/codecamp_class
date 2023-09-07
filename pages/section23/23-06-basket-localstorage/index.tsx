// 여기서부터 플레이그라운드 서버 주소를 변경헸다. 코드젠도 변경
// 따라서 이전의 타입스크립트에 문제가 생긴것들은 무시

import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

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

const Page = styled.span`
  cursor: pointer;
  font-size: 18px;
`;

export default function PagiNationPage() {
  const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
  );
  const onClickBasket = () => {};

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el._id}</Column>
          <Column>{el.writer}</Column>
          <button onClick={onClickBasket} id={el.id}> 장바구니 담기</button>
        </Row>
      ))}
    </>
  );
}
