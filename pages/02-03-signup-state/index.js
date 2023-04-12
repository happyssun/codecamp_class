import { useState } from "react";
import {} from "../../styles/02-03-emotion";

export default function SignupStatePage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");

  function onChangeEmail(e) {
    /*
    예> 이메일에 e를 입력한다고 가정
    console.log(e) // 이벤트 행위 : input을 하는 것
    console.log(e.target) // 작동된 태그 : input창
    console.log(e.target.value) // 작동된 태그의 입력값 : input창에 입력된 e
    */
    setEmail(e.target.value); //setEmail의 state에 값이 저장
  }

  function onChangePw(e) {
    setPw(e.target.value);
  }

  function onClickSignup() {
    // state에 저장이 잘 되었는지 확인(검증) : 요 부분이 백엔드로 넘어가게 됨
    console.log(email);
    console.log(pw);

    // 검증
    if (email.includes("@") === false) {
      setEmailError("이메일 형식에 맞게 입력하여 주세요!");
    } else {
      // 메세지 알림 이전, 백엔드 컴퓨터에 있는 API(함수) 요청하기
      alert("회원 가입을 축하합니다!");
    }
  }
  return (
    <>
      이메일:<input type="text" onChange={onChangeEmail}></input>
      <div>{emailError}</div>
      비밀번호:<input type="password" onChange={onChangePw}></input>
      <button onClick={onClickSignup}>회원가입</button>
    </>
  );
}
