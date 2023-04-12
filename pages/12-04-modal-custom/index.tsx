import { useState } from "react";
import { Button, Modal } from "antd";

const App: React.FC = () => {
  // false는 모달창이 안보이고 이게 true로 바뀌면 창이 보여짐
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Open Modal</Button>
      <Modal
        title="비밀번호 확인 창"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        비밀번호 입력: <input type="password" />
      </Modal>
    </>
  );
};

export default App;
