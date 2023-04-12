import styled from "@emotion/styled";

export const RedInput = styled.input`
  border-color: red;
`;

export const BlueButton = styled.button`
  font-size: ${(props) => {
    return props.rrr;
  }};
  color: ${(props) => props.qqq};
  background-color: ${(props) => (props.zzz ? "skyblue" : "default")};
`;

/* 간략한 표기

font-size:${(props) => {
  return props.rrr;
}} 

()=> {이 안에} 중괄호와 return 아무것도 없으면 전체를 ()로 대체 가능하고 
()은 별 의미가 없으면 바로 생략가능하여 

font-size:${props => props.rrr} 이렇게 바로 가능함

*/
