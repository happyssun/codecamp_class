import * as yup from "yup";

export const schema = yup.object({
  writer: yup.string().required("작성자를 입력하세요"),
  title: yup.string().required("제목을 입력하세요"),
  contents: yup.string().required("내용을 입력하세요"),
  email: yup
    .string()
    .email("이메일 형식에 적합하지 않습니다")
    .required("이메일은 필수 입력입니다"),
  password: yup
    .string()
    .min(4, "비밀번호는 최소 4자리 이상입니다.")
    .max(10, "비밀번호는 최대 10자리 이하입니다")
    .required("비밀번호는 필수입력입니다"),
  phone: yup
    .string()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/, "휴대폰 번호입력에 맞지 않습니다")
    // 정규표현식 //안에 넣음 ^시작 $끝 \d 숫자
    .required("연락처는 필수입력입니다"),
});
