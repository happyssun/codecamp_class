import { gql, useQuery } from "@apollo/client";
import type {
  Query,
  QueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { useState } from "react";
import FetchPolicyComponentPage from "../../../src/components/units/22-fetch-policy";
import { useRouter } from "next/router";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

export default function FetchPolicyPage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data } = useQuery<Pick<Query, "fetchBoards">, QueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  // 1. 새로운 컴포넌트 등장시에도 글로벌 스테이트 값이 유지되는지?
  const onClickIsOpen = (): void => {
    setIsOpen(true);
  };

  // 2. 새로운 컴포넌트 등장시에도 글로벌 스테이트 값이 유지되는지?
  const onClickMove = (): void => {
    router.push("/section22/22-01-fetch-policy-moved");
  };

  return (
    <>
      <button onClick={onClickIsOpen}>
        1. 버튼을 클릭하면 새로운 컴포넌트가 나타남
      </button>
      {isOpen && <FetchPolicyComponentPage />}
      <div style={{ margin: "10px 0px" }}></div>

      <button onClick={onClickMove}>2. 버튼을 클릭하면 페이지가 이동됨!</button>
    </>
  );
}

// isOpen이 true면 <FetchPolicyComponentPage />가 보이게
