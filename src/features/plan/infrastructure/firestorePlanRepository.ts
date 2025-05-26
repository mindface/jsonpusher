import type { Plan } from "../../../type/plan";
import { FirestorePlanActions } from "../../../lib/firestorePlanActions";

type responseType = "success" | "error";

export async function fetchAllPlans(): Promise<Plan[]> {
  const firestorePlanActions = new FirestorePlanActions();
  const list = await firestorePlanActions.getAction("plan");
  return list;
}

export async function addPlan(plan: Plan): Promise<responseType> {
  const firestorePlanActions = new FirestorePlanActions();
  const res = await firestorePlanActions.addAction(plan, "plan");
  return res.status as responseType;
}

export async function updatePlanRepo(plan: Plan): Promise<responseType> {
  const firestorePlanActions = new FirestorePlanActions();
  const res = await firestorePlanActions.updatePlan(plan, "plan");
  return res.status as responseType;
}

export async function deletePlanRepo(plan: Plan): Promise<responseType> {
  const firestorePlanActions = new FirestorePlanActions();
  const res = await firestorePlanActions.deletePlan(plan, "plan");
  return res.status as responseType;
}
