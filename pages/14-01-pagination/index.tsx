import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { MouseEvent } from "react";

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

export default function PagiNationPage() {
  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    refetch({ page: Number(e.currentTarget.id) }); // page는 variables 그래서 {}안에 넣음
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el.number}>
          <Column>{el.number}</Column>
          <Column>{el.writer}</Column>
          <Column>{el.contents}</Column>
        </Row>
      ))}

      {/* 새로운 배열을 10개 생성하는데 그 배열을 전부 1로 채워라! 
      ([1,2,3,4]이렇게 배열을 만들 필요가 없이 걍 배열이 몇개인지만 필요하니까 Array(10)을 사용)
        map의 ((_,index))의 의미는 현재 el인자가 사용되지 않아서 써놓으면 회색처리 될텐데 개발자들 사이에서는 이런걸 이렇게 _로 표시한다 
        
       el은 배열에 있는 값이지만 index는 값과 상관없이 무조건 0부터해서 0,1,2,3 이런식으로 값이 들어간다
       여기서는 el대신 넘버링 해줄꺼라 index를 넣고 인덱스는 0부터 시작이니까 1을 더한것
        */}
      {new Array(10).fill(1).map((_, index) => (
        <Page key={index + 1} id={String(index + 1)} onClick={onClickPage}>
          {" "}
          {index + 1}{" "}
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

      - [1,5,6,4...]                 .map((el)=>(넣을 값))
        10개의 배열을 만들고 그 각각 요소들의 자리에다가 =>() 요기에 지정하는 값을 넣기
        여기서 el값을 출력해보면 배열의 값인 1,5,6,4가 출력됨 그 값을 지정값으로 바꾸는것
      */}
    </>
  );
}

/* const { data } = useQuery<,>(FETCH_BOARDS)
< data에 대한 타입, FETCH_BOARDS에 들어가는 variables의 타입 >

*/
