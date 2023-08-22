import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
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

const Page = styled.span`
  cursor: pointer;
  font-size: 18px;
`;

export default function PagiNationPage() {
  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  /* 이 부분을 수정 - 기존것은 id를 직접 바인딩한 방법
  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    refetch({ page: Number(e.currentTarget.id) });
  };

  - onClickPage()(event) : 두번째인자는 react의 event값이 들어오고 첫번째에 내가 원하는 인자값(id)를 넣어줌
  - onClickPage(page)(event) : id값을 가져올 인자 이름을 page라고 한것
  - refetch({page: page}) : e.currentTarget.id 이 부분이 id값이니까 이것을 page로 대체
  - 숏핸드프로퍼티로 page 하나만 입력가능
  - (event) 자리는 써도되고 안써도 됨 그래서 지금 빈괄호()

  */

  const onClickPage = (page: number) => (): void => {
    refetch({ page });
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el._id}</Column>
          <Column>{el.writer}</Column>
          <Column>{el.contents}</Column>
        </Row>
      ))}

      {new Array(10).fill(1).map((_, index) => (
        // 이 부분 수정 <Page key={index + 1} id={String(index + 1)} onClick={onClickPage}> : id를 직접 바인딩한 부분
        <Page key={index + 1} onClick={onClickPage(index + 1)}>
          {" "}
          {index + 1}{" "}
        </Page>
      ))}
    </>
  );
}
