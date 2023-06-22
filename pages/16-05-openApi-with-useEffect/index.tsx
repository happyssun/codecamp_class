import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenapiWithUseEffectPage() {
  const [dogUrl, setDogUrl] = useState("");

  useEffect(() => {
    const fetchDog = async () => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      setDogUrl(result.data.massage);
    };
    void fetchDog();
  }, []);

  return (
    <>
      <img src={dogUrl} />
    </>
  );
}

/*

만약에 함수에(버튼같은것 안에) 담지 않고 바로 밑의 코드를 실행하면 무한루프가 됨 - 그래서 함수에 담고 사용해야하는데
그러면 화면이 아무것도 나오지 않고 버튼을 눌러야지 화면이 나온다 이러면 이상하니까 
const result = await axios.get("http://koreanjson.com");
    setQqq(result);

이때 useEffect()를 사용
처음 화면이 그려지고 그 다음 useEffect가 실행이 되는데 여기에 의존성배열이 [] 빈칸임으로 변경사항이 없으니 재렌더링이 되지 않음으로 한번만 실행댐


*/
