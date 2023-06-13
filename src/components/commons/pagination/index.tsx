import { gql, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";
import { Query } from "../../../commons/types/generated/types";
import styled from "@emotion/styled";

const Page = styled.span`
  cursor: pointer;
  font-size: 18px;
  margin: 10px;
`;

export default function PageNation() {
  const FETCH_BOARDS_COUNT = gql`
    query fetchBoardsCount {
      fetchBoardsCount
    }
  `;

  const [startPage, setStartPage] = useState(1);

  const { data, refetch } =
    useQuery<Pick<Query, "fetchBoardsCount">>(FETCH_BOARDS_COUNT);

  const lastPage = data ? Math.ceil(data.fetchBoardsCount / 10) : 0;

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
      <span onClick={onClickPrevPage}>이전 페이지</span>

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
