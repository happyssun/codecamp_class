import { useQuery, gql, useMutation } from "@apollo/client";
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

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    #변수의 타입 적음
    createBoard(createBoardInput: $createBoardInput) {
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

export default function ApolloCacheStatePage(): JSX.Element {
  const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);

  interface IPrev {
    __ref: string;
  }

  const onClickDelete = (boardId: string) => (): void => {
    void deleteBoard({
      variables: { boardId },
      // refetchQueries: [{ query: FETCH_BOARDS }],
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev: IPrev[], { readField }) => {
              // __ref:string으로 담긴 그런 배열 IPrev[] - 타입체크
              // 현재 패치보드의 이전값 10개가 담긴거에서
              const deletedId = data.deleteBoard; // 삭제 완료된 ID를 만들고
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId
              ); // 근데 요기서 el이 담겨진 주소만 있기에 이걸 읽어와야함
              // 기존거에 필터를 해서 각각 10개의 el를 가져오는데 그 el은 deletId가 같지 않은것들 즉 삭제안된 아이디만 필터링
              return [...filteredPrev]; // 삭제된 ID를 제외한 나머지가 리턴
            },
          },
        });
      },
    });
  };

  const onClickSubmit = (): void => {
    void createBoard({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목",
          contents: "내용",
        },
      },
      // refetchQueries: [{ query: FETCH_BOARDS }], 기존에는 리페치를 해서 입력한 자료가 보이게 했었다

      /* 현재 캐시 스테이트를 업데이트
      update(cache, response) {
        response.data
      }
      */
      // 구조분해 할당으로
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev]; // 현재 입력한 최신자료에다가 ...prev 현재 기존에 있던 자료
            },
          },
        });
      },
    });
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id}>
          <Column>{el.title}</Column>
          <Column>{el.writer}</Column>
          <Column>{el.contents}</Column>
          <button onClick={onClickDelete(el._id)}>삭제하기</button>
          {/* hof방식으로 id를 받아와서 삭제  */}
        </Row>
      ))}
      <button onClick={onClickSubmit}>등록하기</button>
    </>
  );
}

/* apollo-cache-state가 
글로벌 캐시 스테이트에 저장되있는 것이므로 모든 페이지의 fetchBoards의 자료가 리렌더링 되면서 업데이트가 된다
디벨로퍼에 들어가서 apollo/cache에 들어보면 10개가 모두 캐시에 저장된것을 볼수있다
등록하기 버튼을 누르면 추가가 되는것을 확인할수있다
*/
