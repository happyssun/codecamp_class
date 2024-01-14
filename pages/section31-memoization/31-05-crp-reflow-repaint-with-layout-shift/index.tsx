// 여기서부터 플레이그라운드 서버 주소를 변경헸다. 코드젠도 변경
// 따라서 이전의 타입스크립트에 문제가 생긴것들은 무시

import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { MouseEvent } from "react";

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

export default function LayoutShiftPage(): JSX.Element {
  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (e: MouseEvent<HTMLSpanElement>): void => {
    refetch({ page: Number(e.currentTarget.id) });
  };

  return (
    <>
      {/* 기존 코드 
       {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el._id}</Column>
          <Column>{el.writer}</Column>
        </Row>
      ))} */}

      {/* 수정 코드 : 리플로우 현상 방자 
      // 화면에 데이터가 안뜨더라도 이미 게시판의 위치에 10개의 배열을 만들어둬서 빈칸으로 떠있음
      // 그 위에 데이터를 뿌려줌 */}
      {(data?.fetchBoards ?? new Array(10).fill(1)).map((el) => (
        <Row key={el._id} style={{ height: "30px" }}>
          <Column>{el._id}</Column>
          <Column>{el.writer}</Column>
        </Row>
      ))}

      {new Array(10).fill(1).map((_, index) => (
        <Page key={index + 1} id={String(index + 1)} onClick={onClickPage}>
          {" "}
          {index + 1}{" "}
        </Page>
      ))}
    </>
  );
}

/*
레이아웃 쉬프트 현상 
- 내용이 나오면서 위치가 확 바뀌면서 보여지는 현상
위에 처럼 처음엔 pagenation이 나왔다가 게시판 내용이 나오면 게시판이 위에 나오면서 page가 밑으로 훅 떨어짐
이게 reflow 현상이 일어나면서 발생하는 것 
성능에 안좋기 때문에 이것을 repaint처럼 한번만 동작이 일어나게
미리 자리를 선점해놓고 그 안에 내용을 채워지게 하자~
예를 들어 구글에서 이미지 보기할때, 이미 이미지가 들어갈 자리를 회색같은걸로 위치를 잡아놓고
데이터가 뜨면 그자리에 이미지를 넣어서 리플로우 현상이 안일어나게 하는것
 */
