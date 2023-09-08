import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Board,
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



export default function PagiNationPage() {
  const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
  );
  const onClickBasket = (basket: Board) => () => {
    console.log(basket);
    const baskets = [basket];
    localStorage.setItem("baskets", baskets);
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el._id}</Column>
          <Column>{el.writer}</Column>
          <button onClick={onClickBasket(el)}> 장바구니 담기</button>
        </Row>
      ))}
    </>
  );
}
