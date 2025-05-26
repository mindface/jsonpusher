import { Timestamp } from "firebase/firestore";

export type Plan = {
  id: string;
  title: string;
  details: string;
  userId: string;
  planId: string;
  connectId: string;
  status: string;
  groupId: string;
  createAt: Timestamp;
  updateAt: Timestamp;
};

export function createNewPlan(title: string, details: string): Plan {
  return {
    id: "",
    title,
    details,
    userId: "",
    planId: "",
    connectId: "string;",
    status: "run",
    groupId: "string;",
    createAt: Timestamp.now(),
    updateAt: Timestamp.now(),
  };
}
