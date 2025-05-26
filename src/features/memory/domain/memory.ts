import { Timestamp } from "firebase/firestore";
import type { Memory } from "../../../type/memory";

export function createNewMemory(title: string, detail: string): Memory {
  return {
    id: Date.now(),
    title,
    detail,
    connectId: "",
    userId: "",
    memoryId: "",
    groupId: "",
    status: "",
    createAt: Timestamp.now(),
    updateAt: Timestamp.now(),
  };
}
