import Layout from "../../src/components/units/13-props-children";

export default function PropsChildrenPage() {
  return (
    <Layout school="다람쥐 초등학교">
      {/* <input type="text" /> */}
      {/* <button>클릭해주세요</button>
      <div>게시글 등록</div> */}
      <div>
        여기가 바디부분 hearder와 footer는 변하기 않게 components units 안에서
        만들어 놓고 props.children을 이용하여 여기에 내용을 넣는 구조로 작성
        이런식으로
      </div>
    </Layout>
  );
}
