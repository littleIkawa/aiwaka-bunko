import { collection, getDocs, query, where } from "@firebase/firestore";
import { Ref } from "vue";
import { db, getCurrentUser } from "@/settings/firebase";
import { DocumentRequest } from "@/modules/document-requests";

export const getAllRequestByUser = async (
  requestList: Ref<DocumentRequest[]>
) => {
  // あるユーザーに対するリクエストをすべて取得する.
  // fetch data from firestore
  const user = await getCurrentUser();
  const uid = user?.uid;
  if (!uid) return;
  const requestsQuery = query(
    collection(db, "requests"),
    where("uid", "==", uid)
  );
  const querySnapshot = await getDocs(requestsQuery);
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const newReq = new DocumentRequest(
      doc.id,
      docData.userId,
      docData.type,
      docData.target,
      docData.time,
      docData.message,
      docData.status
    );
    requestList.value.push(newReq);
  });
};

export const getRequestByUserAndTarget = async (
  requestList: Ref<DocumentRequest[]>,
  target: string
) => {
  const user = await getCurrentUser();
  const uid = user?.uid;
  if (!uid) return;
  const requestsQuery = query(
    collection(db, "requests"),
    where("uid", "==", uid),
    where("target", "==", target)
  );
  const querySnapshot = await getDocs(requestsQuery);
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const newReq = new DocumentRequest(
      doc.id,
      docData.userId,
      docData.type,
      docData.target,
      docData.time,
      docData.message,
      docData.status
    );
    requestList.value.push(newReq);
  });
};
