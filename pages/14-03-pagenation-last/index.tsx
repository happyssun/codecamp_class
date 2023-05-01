import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { MouseEvent, useState } from "react";

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
`;

const Page = styled.span`
  cursor: pointer;
  font-size: 18px;
  margin: 10px;
`;

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

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export default function StaticRoutedPage() {
  const [startPage, setStartPage] = useState(1);

  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  // 전체 게시글 수 가져오기
  // 1.전체 페이지수를 확인 할수 있는 데이터를 백엔드에서 가져오기
  // 요기서의 data: dataBoardCount 한 이유는 위에 data라는 변수를 사용했기에 여기에서 data를 다른이름으로 지정한 것임
  const { data: dataBoardCount } =
    useQuery<Pick<Query, "fetchBoardsCount">>(FETCH_BOARDS_COUNT);

  // 페이지를 10으로 나눠서 올림한 수  마지막페이지 = 올림(전체게시글 /10)
  const lastPage = dataBoardCount
    ? Math.ceil(dataBoardCount.fetchBoardsCount / 10)
    : 0;

  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    refetch({ page: Number(e.currentTarget.id) });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return; // 페이지가 1이면 진행 무시.. -10때문에 1이전페이지는 -가 나오기 때문에 무시해야함
    setStartPage((prev) => prev - 10); // (startPage -10)과 같음 : 한가지로 통일시켜주는것이 좋음
    void refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage)
      // if(시작이되는 페이지 +10 >= 마지막페이지)
      setStartPage(startPage + 10);
    void refetch({ page: startPage + 10 });
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

      <span onClick={onClickPrevPage}>이전 페이지</span>

      {/* 인덱스에 스타트페이지를 더한 값이 마지막페이지보다 작을때  */}
      {new Array(10).fill(1).map((_, index) => {
        return (
          index + startPage <= lastPage && (
            <Page
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
            >
              {index + startPage}
            </Page>
          )
        );
      })}

      <span onClick={onClickNextPage}>다음 페이지</span>
    </>
  );
}

/* 
      <span onClick={onClickPrevPage}>이전 페이지</span>

  // 새로운 배열을 10개 생성하는데 그 배열을 전부 1로 채워라! 
    map의 ((_,index))의 의미는 현재 el인자가 사용되지 않아서 써놓으면 회색처리 될텐데 개발자들 사이에서는 이런걸 이렇게 _로 표시한다 

      {new Array(10).fill(1).map((_, index) => {
        if (index + startPage <= lastPage) {
          return (
            <Page
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
            >
              {index + startPage}
            </Page>
          );
        } else {
          // eslint-disable-next-line react/jsx-key
          return <Page></Page>;
        }
      })}



      // index는 배열의 값이 어떻게 들어가든 0부터 시작하는 숫자가 자동으로 들어감
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, index) => (
        <Page key={el} id={String(el)} onClick={onClickPage}>
          {" "}
          {index + 1}{" "}
        </Page>
      ))} 

      // 원래의 비효율적인 방법
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
        <Page key={el} id={String(el)} onClick={onClickPage}>
          {" "}
          {el}{" "}
        </Page> 
      ))}
      

      <span onClick={onClickNextPage}>다음 페이지</span>
    
*/

/* const { data } = useQuery<,>(FETCH_BOARDS)
< data에 대한 타입, FETCH_BOARDS에 들어가는 variables의 타입 >

*/
