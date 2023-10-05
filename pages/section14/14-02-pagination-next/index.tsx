import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { MouseEvent, useState } from "react";

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

const Page = styled.span`
  cursor: pointer;
  font-size: 18px;
`;

export default function StaticRoutedPage() {
  const [startPage, setStartPage] = useState(1);

  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    refetch({ page: Number(e.currentTarget.id) });
  };

  const onClickPrevPage = () => {
    setStartPage((prev) => prev - 10); // (startPage -10)과 같음
    void refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    setStartPage(startPage + 10);
    void refetch({ page: startPage + 10 });
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.writer}</Column>
          <Column>{el.contents}</Column>
        </Row>
      ))}
      <span onClick={onClickPrevPage}>이전 페이지</span>

      {/* 새로운 배열을 10개 생성하는데 그 배열을 전부 1로 채워라! 
        map의 ((_,index))의 의미는 현재 el인자가 사용되지 않아서 써놓으면 회색처리 될텐데 개발자들 사이에서는 이런걸 이렇게 _로 표시한다   */}
      {new Array(10).fill(1).map((_, index) => (
        <Page
          key={index + startPage}
          id={String(index + startPage)}
          onClick={onClickPage}
        >
          {" "}
          {index + startPage}{" "}
        </Page>
      ))}

      {/* index는 배열의 값이 어떻게 들어가든 0부터 시작하는 숫자가 자동으로 들어감
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, index) => (
        <Page key={el} id={String(el)} onClick={onClickPage}>
          {" "}
          {index + 1}{" "}
        </Page>
      ))} */}

      {/* 원래의 비효율적인 방법
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
        <Page key={el} id={String(el)} onClick={onClickPage}>
          {" "}
          {el}{" "}
        </Page> 
      ))}
      */}

      <span onClick={onClickNextPage}>다음 페이지</span>
    </>
  );
}

/* const { data } = useQuery<,>(FETCH_BOARDS)
< data에 대한 타입, FETCH_BOARDS에 들어가는 variables의 타입 >

*/
