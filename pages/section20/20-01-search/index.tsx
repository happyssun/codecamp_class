import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";

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

export default function SearchWithBtn() {
  const [search, setSearch] = useState("");
  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (e: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(e.currentTarget.id) }); // page는 variables 그래서 {}안에 넣음
    // 검색을 하고 싶어 refetch할 때, search 검색어가 onClickSearch()에 의해 refetch에 이미 저장되어 있는 상태이므로
    // 추가로 search를 포함하지 않아도 됨
  };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.currentTarget.value);
  };

  const onClickSearch = (): void => {
    void refetch({ search, page: 1 }); // 페이지를 1로 넣는 이유: 검색을 하면 그 검색결과가 3페이지에 있을수도 있도 10페이지 있을수도 있다 그런데 나는 검색한 내용이 있는 페이지가 아니라 검색결과의 페이지 1를 보고싶은거니까 페이지를 1로 넣음
  };
  return (
    <>
      검색어입력: <input type="text" onChange={onChangeSearch} />
      <button onClick={onClickSearch}>검색하기</button>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.writer}</Column>
          <Column>{el.contents}</Column>
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
