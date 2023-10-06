import styled from "@emotion/styled";
import { Rate } from "antd";
import { useState } from "react";

const MyRate = styled(Rate)`
  font-size: 50px;
  color: red;
`;

export default function LibraryRatePage() {
  const [value, setValue] = useState(3);

  /* 
  이 것이 전체 단계, 밑에는 간략하게 축소한 단계
  const qqq = (value: number) => {
    setValue(value);
  };
  return <MyRate onChange={(value)=>setValue(value)} />;
  */

  return <MyRate onChange={setValue} />;
}

/*
여기에 있는 onchange={}는 html의 것이 아니라 ant design 자체내에서의 규칙이다. 
이렇게 라이브러리를 이용할때는 그 라이브러리 마다의 규칙들이 있으니 헷갈리지 않게 주의하자!
*/
