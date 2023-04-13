import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    font-size: 16px;
    font-family: "myfont";
  }
  @font-face {
    font-family: "myfont";
    src: url("/fonts/scifibit.ttf");
  }
`;

/*
폰트 적용하기
*/
