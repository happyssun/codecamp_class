import { PlayCircleOutlined } from "@ant-design/icons";
/* 
https://ant.design/components/overview/
현재 antDesign을 설치해서 사용하는 예제이다!
 */

import styled from "@emotion/styled";

const MyIcon = styled(PlayCircleOutlined)`
  font-size: 50px;
  color: red;
`;

export default function LibraryIconPage() {
  return (
    <div id="aaa">
      <MyIcon id="bbb" />
    </div>
  );
}
/* 아이콘을 가져다가 쓸때 id값을 사용할수가 없다 
그래서 부모 박스를 만들고 그안에 id값을 넣고 아이콘 컨트롤이 가능 */
