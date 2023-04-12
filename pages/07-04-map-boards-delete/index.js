import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      number
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARD = gql`
  mutation deleteBoard($number: Int) {
    deleteBoard(number: $number) {
      message
    }
  }
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
`;

export default function StaticRoutedPage() {
  const [deleteBoard] = useMutation(FETCH_BOARD);

  const { data } = useQuery(FETCH_BOARDS);

  const onClickDelete = async (event) => {
    await deleteBoard({
      variables: {
        number: Number(event.target.id), // 버튼클릭시 이벤트 발생 그 타겟은 버튼이고 버튼에 id값(문자열) : 숫자로 바꿔줌
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el.number}>
          <Column>
            <input type="checkbox"></input>
          </Column>
          <Column>{el.number}</Column>
          <Column>{el.title}</Column>
          <Column>{el.contents}</Column>
          <Column>
            <button id={el.number} onClick={onClickDelete}>
              삭제
            </button>
          </Column>
        </Row>
      ))}
    </>
  );
}

/* 
  Row key={el.number} 
  : key는 고유한 값 -그렇기에 키값은 중복이 되지 않는것으로 지정
  : 한 줄이 고유한 한개의 값이라고 인식시킴 
  : 여기에 키값으로 index를 쓰지 못한다
  : 인덱스는 고유한 값인데 왜 안되냐??   
    - 예로 인덱스 3번을 지웠다.. 인덱스는 고유한 넘버링인데 3번이 지워지면 4번이 다시 3번이 되니까
*/
