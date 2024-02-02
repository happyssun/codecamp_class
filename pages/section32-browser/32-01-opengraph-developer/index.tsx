// 개발자일때 => 디스코드. 카카오톡, 슬랙 등

import axios from "axios";

export default function OpengraphDeveloper(): JSX.Element {
  const onClickEnter = async (): Promise<void> => {
    // 1. 채팅데이터에 주소가 있는지 찾기 (http~~ 로 시작하는것)

    // 2. 해당 주소로 스크랩핑하기
    const result = await axios.get(
      "http://localhost:3000/section32-browser/32-01-opengraph-provider"
    );
    console.log(result.data);
    /// 해당 주소의 백엔드에서 cors(cross-origin-resource-sharing)을 열어주지 않으면 스크랩핑불가
    /// www.naver.com 같은 사이트들은 막혀있음
    /// openAPI에서 API를 우회하는 프록시서버를 만들어서 거기서 해야함

    // 3. meta태그에서 오픈그래프(og:)찾기
    console.log(result.data.split("<meta"));
    result.data.split("<meta").filter((el: string) => el.includes("og"));
  };

  return (
    <>
      <button onClick={onClickEnter}>채팅 입력 후 엔터치기!</button>
    </>
  );
}
