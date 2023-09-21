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

export default function BasketLocalStoragePage(): JSX.Element {
  const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
  );
  const onClickBasket = (basket: Board) => () => {
    console.log(basket);

    // 로컬스토리지에는 문자열만 저장 가능

    // 1. 기존 장바구니 가져오기
    // - 로컬스토리지에 문자열 형태로 저장되어있는것을 다시 자바스크립형태로 바꿔줘야함
    // - basket안에 뭐가 있으면 그걸 JSON.parse하겠지만 아무것도 없으면 그건 변형이 안되고 그냥 null이기 떄문에
    //   null일 경우엔 "[]"를 넣어줘서 string으로 만들어 준다음 parse가 될수있게
    const baskets: Board[] = JSON.parse(
      localStorage.getItem("baskets") ?? "[]"
    );

    // 2. 이미 장바구니에 같은것이 담겨있는지 확인하기
    // 잠시 임시로 담아놓는것이기 때문에 temporary를 사용
    const temp = baskets.filter((el) => el._id === basket._id);
    if (temp.length >= 1) {
      alert("이미 담겨있는 물품입니다!");
      return; // 중복된것을 못담게 하고 아래가 실행안되게 리턴해줌
    }

    // 3. 추가할 것 장바구니에 담기
    // delete basket.__typename ---- 원본을 삭제하기때문에 이렇게 사용하면 안됨
    const { __typename, ...rest } = basket; // 안전하게 삭제
    // 이때 ...rest의 이름은 마음대로 바꿀수있다. ...newBaske t이렇게

    baskets.push(rest);

    // 4. 추가된 장바구니로 변경하기
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.title}</Column>
          <Column>{el.writer}</Column>
          <button onClick={onClickBasket(el)}> 장바구니 담기</button>
        </Row>
      ))}
    </>
  );
}
