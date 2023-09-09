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

    // 로컬스토리지에는 문자열만 저장 가능

    // 1. 기존 장바구니 가져오기
    // - 로컬스토리지에 문자열 형태로 저장되어있는것을 다시 자바스크립형태로 바꿔줘야함
    // - basket안에 뭐가 있으면 그걸 JSON.parse하겠지만 아무것도 없으면 그건 변형이 안되고 그냥 null이기 떄문에
    //   null일 경우엔 "[]"를 넣어주라는 것
    const baskets = JSON.parse(localStorage.getItem("basket") ?? "[]");

    // 2. 추가할 것 장바구니에 담기
    baskets.push(basket);

    // 3. 추가된 장바구니로 변경하기
    localStorage.setItem("baskets", JSON.stringify(baskets));
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
