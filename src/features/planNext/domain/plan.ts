import { Timestamp } from "firebase/firestore";
import type { Plan } from "../../../type/plan";


export function createNewPlan(title: string, details: string): Plan {
  return {
    id: "",
    title,
    details,
    userId: "",
    planId: "",
    connectId: "",
    status: "run",
    groupId: "",
    createAt: Timestamp.now(),
    updateAt: Timestamp.now(),
  };
}
