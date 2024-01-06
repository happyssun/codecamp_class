import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type {
  Mutation,
  MutationLoginUserArgs,
} from "../../../src/commons/types/generated/types";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/stores";
import { useRouter } from "next/router";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

const LOGIN_USER = gql`
  mutation loginUserExample($password: String!, $email: String!) {
    loginUserExample(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginUserExample] = useMutation<
    Pick<Mutation, "loginUserExample">,
    MutationLoginUserArgs
  >(LOGIN_USER);

  // const [accessToken, setAccessToken] 안쓰는것을 지워도 됨
  // 앞에 있는건 , 지우면 불가능하고
  // 뒤에있는 건 , 까지 지워도 가능
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };
  const onChangePw = (e: ChangeEvent<HTMLInputElement>): void => {
    setPw(e.currentTarget.value);
  };
  const onClickLogin = async (): Promise<void> => {
    if (email === "" || pw === "") {
      alert("이메일과 비밀번호를 입력하세요!");
      return;
    }

    try {
      // 1. 로그인 뮤테이션 날려서 accessToken 받아오기
      const result = await loginUserExample({
        variables: {
          password: pw,
          email,
        },
      });
      const accessToken = result.data?.loginUserExample.accessToken;
      console.log(accessToken);

      // 2. 받아온 accessToken을 globalState에 저장하기
      if (accessToken === undefined) {
        alert("로그인 실패! 다시 시도하세요!");
        return;
      }
      setAccessToken(accessToken);

      // 3. 로그인 성공 페이지로 이동하기
      void router.push("/section30-auth/30-01-login-refreshtoken-success");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return (
    <>
      이메일:
      <input type="text" onChange={onChangeEmail} />
      비밀번호:
      <input type="password" onChange={onChangePw} />
      <button onClick={wrapAsync(onClickLogin)}>로그인</button>
    </>
  );
}
