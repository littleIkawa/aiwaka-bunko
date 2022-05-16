import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db, getCurrentUser } from "@/settings/firebase";
import { DocumentRequest } from "@/modules/document-requests";

export const createRequestToFirestore = async (
  type: number,
  target: string,
  message: string
): Promise<DocumentRequest | null> => {
  if (type !== 2 && message === "") {
    alert("修正依頼または意見を送る場合はメッセージが必須です。");
  }
  const user = await getCurrentUser();
  const uid = user?.uid;
  if (!uid) return null;

  const userRecordsRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRecordsRef);
  if (!userSnap.exists()) return null;
  const currentDate = Timestamp.now();
  const newRequestRef = doc(collection(db, "requests"));
  const newRequestData = {
    uid,
    type,
    time: currentDate,
    target,
    message,
    status: 0,
  };
  await setDoc(newRequestRef, newRequestData);
  // リロードなしで使えるようにする.
  const newRec = new DocumentRequest(
    newRequestRef.id,
    uid,
    type,
    target,
    currentDate,
    message,
    0
  );
  return newRec;
};
