import axios from "axios";
import { useState } from "react";

export default function RestGetPage() {
  const [title, setTitle] = useState(""); // 화면에 받아온 title 보여주려고

  // 자바스크립트 함수는 기본적으로 동기함수
  // 데이터의 요청과 응답을 위해 axios API 사용하여 비동기 통신 적용
  // async/awiat - 비동기 실행방식을 동기방식으로 변경

  // 비동기
  // 여기도 밑에처럼 async를 붙여줘도 되지만 필수는 아님
  const onClickAsync = () => {
    const result = axios.get("http://koreanjson.com/posts/1");
    console.log(result); // 게시물을 받아오지 못하고 promise panding상태
  };

  // 동기
  // await는 항상 async가 함께 사용!!
  // await이 작성된 부분의 코드 실행이 완전히 완료되기 전까지는 하단의 코드로 실행이 넘어가지 않음
  const onClickSync = async () => {
    const result = await axios.get("http://koreanjson.com/posts/1");
    console.log(result);
    console.log(result.data);
    console.log(result.data.title);
  };

  return (
    <>
      <button onClick={onClickAsync}>REST-API 비동기(async) 요청하기</button>
      <button onClick={onClickSync}>REST-API 동기(sync) 요청하기</button>
      <div>{title}</div>
    </>
  );
}
