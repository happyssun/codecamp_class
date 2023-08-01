import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";

import type { ChangeEvent, MouseEvent } from "react";
import _ from "lodash";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
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

// 검색하기 버튼 없이 검색 - 그러면 글자 칠때마다 API요청이 들어감 : 완전 안좋은 방법
// 그래서 디바운싱과 쓰로틀링 개념을 알 필요가 있다
// 디바운싱 : 특정시간 이내, 추가 입력이 없을시, 마지막 1회만 실행
// 쓰로틀링 : 특정시간 이내, 추가 입력이 있어도, 처음 1회만 실행 - 스크롤 내릴때
// 라이브러리 다운받아 사용 : lodash

export default function SearchWithoutBtn() {
  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (e: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(e.currentTarget.id) }); // page는 variables 그래서 {}안에 넣음
    // 검색을 하고 싶어 refetch할 때, search 검색어가 onClickSearch()에 의해 refetch에 이미 저장되어 있는 상태이므로 추가로 search를 포함하지 않아도 됨
  };

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
  }, 500);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(e.currentTarget.value);
  };

  // const onClickSearch = (): void => {
  //   void refetch({ search, page: 1 });
  // };
  return (
    <>
      검색어입력: <input type="text" onChange={onChangeSearch} />
      {/* <button onClick={onClickSearch}>검색하기</button> */}
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.title}</Column>
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
