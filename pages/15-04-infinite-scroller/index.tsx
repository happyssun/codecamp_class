// 여기서부터 플레이그라운드 서버 주소를 변경헸다. 코드젠도 변경
// 따라서 이전의 타입스크립트에 문제가 생긴것들은 무시

import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import {
  Query,
  QueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import InfiniteScroll from "react-infinite-scroller";

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

export default function infiniteScrollerPage() {
  const { data, fetchMore } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  // 스크롤이 해당 영역의 하단 끝에 닿았을때 실행되어야할 것을 함수로
  const onLoadMore = () => {
    if (data === undefined) return; // 데이타가 없다면 실행하지 않는다

    void fetchMore({
      // await는 이거 끝날때까지 다른거 진행 안되게.. 여선 그냥 진행해도 됨
      variables: { page: Math.ceil(data?.fetchBoards.length / 10) + 1 }, // 이걸 통해서 추가적인 10개를

      // 10개를 가지고 오면 기존에 있던거에 추가적으로 이번에 받아온애들을 fetchMoreResult란 이름으로 가져옴
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoards === undefined) {
          // fetchMoreResult로 받은 페치보드가 없다면
          return {
            fetchBoards: [...prev.fetchBoards], // 기존꺼만 보여줘
          };
        }
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <div style={{ height: "500px", overflow: "auto" }}>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {/* hasMore 트루일때만 loadMore 실행 - 페이지가 더 있냐 있으면.. */}
        {data?.fetchBoards.map((el) => (
          <Row key={el._id}>
            <Column>{el.writer}</Column>
            <Column>{el.contents}</Column>
          </Row>
        ))}
        ?? <div></div>
        {/* 리스트가 더 이상 없어서 아이템이 없을때 그냥 빈거 하나 보여주게 */}
      </InfiniteScroll>
    </div>
  );
}

/* 배열 합치기

const aaa = ["철수","영희","훈이"]
const bbb = ["sun", "thomas"]

const ccc = [...aaa, ...bbb]  - 이렇게 스프레드 연산자를 사용

스크롤을 내리면 댓글들이 보이게
const 전체댓글들 = [...이전댓글들, ...추가댓글들] - 이런식으로 map을 사용하여 배열을 만듦

fetchMore 내장함수를 사용

스크롤러는 npm에서 다운로드 (react-infinite-scroller) ,(react-infinite-scroll-component)
*/
