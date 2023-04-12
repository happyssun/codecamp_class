import { gql, useMutation } from "@apollo/client";

// http://practice.codebootcamp.co.kr/graphql 자료 참조
const CREATE_PRODUCT = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutation() {
  // graphql API의 mutation 연결
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const onClickSubmit = async () => {
    const result = await createProduct({
      variables: {
        // variables가 $역할
        // state저장소에 있는 값 입력 - mutation
        seller: "sun",
        createProductInput: {
          name: "Mouse",
          detail: "ergonomic",
          price: 25,
        },
      },
    });

    console.log(result);
    alert(result.data.createProduct.message);
  };

  return (
    <>
      <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    </>
  );
}
