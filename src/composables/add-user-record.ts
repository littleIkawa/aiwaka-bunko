import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/settings/firebase";

export const addUserRecord = async (
  uid: string,
  name: string,
  belongs: string
) => {
  const newUserRef = doc(db, "users", uid);
  const currentDate = Timestamp.now();
  const newUserData = {
    name,
    belongs,
    createdAt: currentDate,
  };
  await setDoc(newUserRef, newUserData);
};
