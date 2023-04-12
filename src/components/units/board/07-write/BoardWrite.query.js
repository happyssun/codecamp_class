import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

/*
이건 컴포넌트가 아니다 - 그냥 파일을 나눠서 import하는것
return안에 있는 녹색 태그가 컴포넌트 - 자식들

*/
