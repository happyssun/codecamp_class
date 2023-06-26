import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { firebaseApp } from "../_app";

export default function FireBasePage() {
  const onClickSubmit = () => {
    const board = collection(getFirestore(firebaseApp), "board");
    addDoc(board, {
      writer: "Tom",
      title: "This is a title",
      contents: "This is a contents",
    });
  };

  const onClickFetch = async () => {
    const board = collection(getFirestore(firebaseApp), "board");
    const result = await getDocs(board);
    const datas = result.docs.map((el) => el.data());
    console.log(datas);
  };
  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  );
}
