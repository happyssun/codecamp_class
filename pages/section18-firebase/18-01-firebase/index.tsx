import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { firebaseApp } from "../../../src/commons/libraries/firebase";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

export default function FireBasePage(): JSX.Element {
  const onClickSubmit = (): void => {
    const board = collection(getFirestore(firebaseApp), "board");
    addDoc(board, {
      writer: "Tom",
      title: "This is a title",
      contents: "This is a contents",
    });
    console.log(board);
  };

  const onClickFetch = async (): Promise<void> => {
    const board = collection(getFirestore(firebaseApp), "board");
    const result = await getDocs(board);
    const datas = result.docs.map((el) => el.data());
    console.log(datas);
  };
  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={wrapAsync(onClickFetch)}>조회하기</button>
    </>
  );
}
