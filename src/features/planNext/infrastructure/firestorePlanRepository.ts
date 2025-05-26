import type { Plan } from "../../../type/plan";
import { FirestorePlanActions } from "../../../lib/firestorePlanActions";

type responseType = "success" | "error";

const actions = new FirestorePlanActions();

export async function fetchAllPlans(): Promise<Plan[]> {
  const list = await actions.getAction("nextPlan");
  return list.map((item: Plan) => ({
    id: item.id,
    title: item.title,
    details: item.details,
    userId: item.userId,
    planId: item.planId,
    connectId: item.connectId,
    status: item.status,
    groupId: item.groupId,
    createAt: item.createAt,
    updateAt: item.updateAt,
  }));
}

export async function addPlan(plan: Plan): Promise<responseType> {
  const res = await actions.addAction(plan, "nextPlan");
  return res.status as responseType;
}

export async function updatePlan(plan: Plan): Promise<responseType> {
  console.log("Updating plan:", plan);
  const res = await actions.updatePlan(plan, "nextPlan");
  return res.status as responseType;
}

export async function deletePlan(plan: Plan): Promise<responseType> {
  const res = await actions.deletePlan(plan, "nextPlan");
  return res.status as responseType;
}
