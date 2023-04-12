module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {},
    },
  ],
  parserOptions: {
    project: "**/tsconfig.json",
    createDefaultProgram: true,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/triple-slash-reference": "off",
  },
  ignorePatterns: ["*.js"],
};

// project: "**/tsconfig.json"를 사용하는 이유
/*
  tsconfig.json의 파일위치가 굉장히 중요한데.. eslint에서와 vscode에서의 파일을 찾는 경로가 서로 달라서 문제가 생긴다
  vscode는 파일을 연 처음 위치부터 찾기 떄문에 ./class/tsconfig.json로 했을때 문제가 없지만
  eslint에서의 에러파일 검색 명령어 npx eslint .를 하게되면 그 터미널 부터 찾기때문에 class/class/... 이런식으로 경로가 되기에 문제가 됨
  그래서 ** 를 사용
 */
