// 일종의 트릭, 별로 중요하지 않은 데이터에 한해서만 적용하자
// 요청한 데이터가 백엔드에서 수정이되어 받아와지기 이전에 미리 예상가능한, 분명 99%성공이 보장된, 여기의 예처럼 좋아요수 같은것들을
// 캐시데이터에서 미리 바꿔치기 한다 - 사용자 화면에는 이미 좋아요수가 더해져있음
// 그러는 사이에 백엔드에서 데이터 수정하고 그것을 가져와서 미리 변경해놓은 캐시와 비교해서 맞으면

import { gql, useMutation, useQuery } from "@apollo/client";

import {
  Mutation,
  MutationLikeBoardArgs,
  Query,
  QueryFetchBoardArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export default function OptimisticUIPage(): JSX.Element {
  const { data } = useQuery<Pick<Query, "fetchBoard">, QueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: { boardId: "65af6dfb5d6eaa0029f7d817" },
    }
  );

  const [likeBoard] = useMutation<
    Pick<Mutation, "likeBoard">,
    MutationLikeBoardArgs
  >(LIKE_BOARD);

  const onClickLike = (): void => {
    void likeBoard({
      variables: {
        boardId: "65af6dfb5d6eaa0029f7d817", // likeBoard 요청을 하면 백엔드데이터를 안기다리고 바로 내려감
      },

      // 여기 부분, 여기의 optimisticResponse를 안하면 기존과 같고, 요 부분 때문에 optimistic UI가 되는것임
      optimisticResponse: {
        // 응답을 받았다고 속여서 그값을 바로 update로 전달해서
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },

      // refetchQueries: [{}], 리페치하거나 캐시를 직접수정 - 여기서는 update로 캐시를 직접수정
      update: (cache, { data }) => {
        // cache.modify가 수정이라면 writeQuery는 기존에 없던것을 추가하는 기능
        cache.writeQuery({
          query: FETCH_BOARD, // 쿼리가 fetch_board인 요 데이터를 바꿀것
          variables: { boardId: "65af6dfb5d6eaa0029f7d817" }, // 요걸로 받은 데이터를 (하드코딩으로 넣어놓은것)
          data: {
            fetchBoard: {
              // 바꾸고싶은것이 여기
              _id: "65af6dfb5d6eaa0029f7d817", // 어떤 특정데이터인지 기준이 여기서는 _id이므로 반드시 이게 있어야함
              _typename: "Board", // 요청했을때 리턴받는 타입(플레이그라운드 fetchboard타입보면 됨) 이것도 함께 입력해야함
              likeCount: data?.likeBoard,
            },
          },
        });
      },
    });
  };

  return (
    <div>
      <div>현재 카운트(좋아요): {data?.fetchBoard.likeCount}</div>
      <button onClick={onClickLike}>좋아요 올리기!!</button>
    </div>
  );
}
