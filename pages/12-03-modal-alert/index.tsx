import { Modal } from "antd";

const success = () => {
  Modal.success({
    content: "게시글 등록에 성공하였습니다",
  });
};

const error = () => {
  Modal.error({
    content: "비밀번호가 틀렸습니다!",
  });
};

const App: React.FC = () => (
  <div>
    <button onClick={success}>성공!!</button>
    <button onClick={error}>실패!!</button>
  </div>
);

export default App;

/* 
const App: React.FC =() => 

이것은 원래 쓰던
export default fuction App() 이거랑 같은것이다.


*/
