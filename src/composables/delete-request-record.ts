import { doc, deleteDoc } from "firebase/firestore";
import { db, getCurrentUser } from "@/settings/firebase";

export const deleteRequestFromFirestore = async (
  requestId: string
): Promise<void | null> => {
  const user = await getCurrentUser();
  const uid = user?.uid;
  if (!uid) return null;
  await deleteDoc(doc(db, "requests", requestId));
};
