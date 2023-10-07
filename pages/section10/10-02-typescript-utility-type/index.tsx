export default function TypescriptUtilityPage() {
  interface IProfile {
    name: string;
    age: number;
    school: string;
    hobby?: string;
  }

  // 1. Pick 타입 : 필요한 애들만 골라서
  type aaa = Pick<IProfile, "name" | "age">;

  // 2. Omit 타입 : 빼고 싶은거만 골라서 없애기
  type bbb = Omit<IProfile, "school">;

  // 3. Partial 타입 : 전체에 물음표가 붙음 - 있을수도 있고, 없을수도 있고
  type ccc = Partial<IProfile>;

  // 4. Required 타입 : Partial과 반대 - 전체가 다 필수로 있어야함
  type ddd = Required<IProfile>;

  // 5. Record 타입
  type eee = "철수" | "영희" | "훈이"; // Union 타입 : 무조건 저 세가지 중에서만 값이 가능
  let child: eee;
  child = "철수"; // "맹구" 이런 다른것들은 못들어감

  type fff = Record<eee, IProfile>; // union타입인 eee를 레코드 타입에 넣으면 각각의 이름을 가진키가 값으로 IProfile을 갖는다

  // ==== type vs interface 차이 ======
  // interface는 선언한것을 기존것에 합치기 가능 , type은 불가능
  interface IProfile {
    candy: number;
  }

  let profile: Partial<IProfile> = {};
  profile.candy = 10;
}
