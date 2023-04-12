import { useState } from "react";
import { Button, Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

const App: React.FC = () => {
  // false는 모달창이 안보이고 이게 true로 바뀌면 창이 보여짐
  const [isModalOpen, setIsOpen] = useState(false);

  /* 전부 내용이 같다. 왜냐?? 스위치를 껐다 켰다 하는 그런거니까 간략하게 아래와 같이
  const showModal = () => {
    setIsOpen((prev) => !prev);
    // setIsOpen(true) 과 같음
    // 기존에 모달이 false로 닫혀있으니 보여주려고 true를 넣는것일 테니 여기서의 prev값은 false.. 이것을 !prev로 해서 true가 됨
  };

  const handleOk = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCancel = () => {
    setIsOpen((prev) => !prev);
  };
  */

  // 스위치 형태 : Toggle
  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (address: Address) => {
    console.log(address);
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Button onClick={onToggleModal}>Open Modal</Button>

      {/* 모달 종료 방식 - 1.모달을 숨기는 방법 (예: 화면에 저장이 되야하는 상황 이력서같은) 
      <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>
      */}

      {/* 모달 종료 방식 - 2.모달 삭제하는 방법 (예:비밀번호, 신용카드처럼 정보가 다시 실행되야할 때)
        조건부 렌더링 isModalOpen이 true이면 모달이 보이고 false면 안 보임 
        스테이트가 변경되면 컴포넌트가 재실행이 됨으로 새로 생성이 됨 : 이 작용으로 무언가 삭제되었다 재실행되길 바랄때 스테이트가 변경되게 하면됨 */}
      {isModalOpen && (
        <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
};

export default App;
