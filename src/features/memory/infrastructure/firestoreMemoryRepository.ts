import type { Memory } from "../../../type/memory";
import { db } from "../../../lib/firebaseClient";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export async function fetchAllMemories(): Promise<Memory[]> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return [];
  const userCollectionRef = collection(db, "users", user.uid, "memories");
  const q = query(
    userCollectionRef,
    where("userId", "==", user.uid),
    where("status", "==", "run")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    memoryId: doc.id,
  })) as Memory[];
}

export async function addMemory(memory: Memory): Promise<"success" | "error"> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return "error";
  const userDocRef = doc(db, "users", user.uid);
  const userCollectionRef = collection(userDocRef, "memories");
  await addDoc(userCollectionRef, {
    ...memory,
    userId: user.uid,
    status: "run",
    createAt: Timestamp.now(),
    updateAt: Timestamp.now(),
  });
  return "success";
}

export async function updateMemoryRepo(memory: Memory): Promise<"success" | "error"> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return "error";
  const memoryDocRef = doc(db, "users", user.uid, "memories", memory.memoryId);
  await updateDoc(memoryDocRef, {
    ...memory,
    updateAt: Timestamp.now(),
  });
  return "success";
}

export async function deleteMemoryRepo(memory: Memory): Promise<"success" | "error"> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return "error";
  const memoryDocRef = doc(db, "users", user.uid, "memories", memory.memoryId);
  await updateDoc(memoryDocRef, {
    ...memory,
    status: "stop",
    updateAt: Timestamp.now(),
  });
  return "success";
}
