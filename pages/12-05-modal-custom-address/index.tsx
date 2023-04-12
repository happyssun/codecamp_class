import { useState } from "react";
import { Button, Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

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

  const handleComplete = (address: Address) => {
    console.log(address);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Open Modal</Button>

      {/* 모달 종료 방식 - 1.모달을 숨기는 방법 (예: 화면에 저장이 되야하는 상황 이력서같은) */}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>

      {/* 모달 종료 방식 - 2.모달 삭제하는 방법 (예:비밀번호, 신용카드처럼 정보가 다시 실행되야할 때)
        조건부 렌더링 isModalOpen이 true이면 모달이 보이고 false면 안 보임 
        스테이트가 변경되면 컴포넌트가 재실행이 됨으로 새로 생성이 됨 : 이 작용으로 무언가 삭제되었다 재실행되길 바랄때 스테이트가 변경되게 하면됨 */}
      {isModalOpen && (
        <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
};

export default App;
