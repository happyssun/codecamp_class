import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

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

// 검색하는 부분을 키워드로
// 1. 키워드에 스타일을 넣으려면 우선 문장을 키워드 기준으로 분리
//    .split() 과 replaceAll()을 사용해서  "키워드" 양옆으로 시크릿코드를 넣어 분리해줌
// 2. 키워드 저장할 state 만들기
// 3. 분리된 문장 map으로 그리고 el이 키워드랑 같으면 색 변경되게

export default function SearchKeyword() {
  const [keyword, setKeyword] = useState("");

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
    setKeyword(value);
  }, 500);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(e.currentTarget.value);
  };

  return (
    <>
      검색어입력: <input type="text" onChange={onChangeSearch} />
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>
            {el.title
              .replaceAll(keyword, `!@#${keyword}!@#`)
              .split("!@#")
              .map((el) => (
                <span
                  style={{ color: el === keyword ? "red" : "black" }}
                  key={uuidv4()}
                >
                  {el}
                </span>
              ))}
          </Column>
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
