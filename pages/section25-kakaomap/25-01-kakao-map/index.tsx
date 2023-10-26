import { useEffect } from "react";

// 선언
declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage(): JSX.Element {
  // 웹페이지가 먼저 마운트 되고 실행이 될것이니까 useEfect안에
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(
        37.26799304495052,
        126.95866887280948
      ), // 지도의 중심좌표. 위치를 바꾸고 싶을때 여기를 바꿈(구글위치에서 마우스오른쪽버튼으로)
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    console.log(map);
  }, []);

  return (
    <>
      <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=4e2f9fc2515fd2b69162c4044bee0caa"
      ></script>
      <div id="map" style={{ width: 500, height: 400 }}>
        KakaoMapPage
      </div>
    </>
  );
}
