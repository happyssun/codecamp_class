import axios from "axios";
import { useState } from "react";

// 등록하기 버튼을 눌렀을때 실행될 동안은 버튼을 다시 못누르게 팬딩
export default function SubmittingPage(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClickSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    const result = await axios.get("http://koreanjson.com/posts/1");
    console.log(result);
    console.log(result.data);
    console.log(result.data.title);

    setIsSubmitting(false);
  };

  return (
    <>
      <button onClick={onClickSubmit} disabled={isSubmitting}>요청하기</button>
    </>
  );
}

/**
 * 원래 함수의 원리에서 보면
 * 함수안에 
    setIsSubmitting(true);
    setIsSubmitting(false);
  이렇게 되어있음 그냥 setIsSubmitting(false) 되고 끝나는게 정상인데
  중간의 await를 만나서 
   setIsSubmitting(true) 여기까지 진행하고
  axios.get("http://koreanjson.com/posts/1") 실행전 바로 마이크로큐에 함수가 저장되고
  onClickSubmit()는 끝남.. 
  그다음에 리렌더링되면서
  마이크로큐에있던 나머지 작업
  setIsSubmitting(false);이 실행

  따라서 처음에는 true.. 다음 렌더링에 false 이렇게 두개가 다 실행됨
 */