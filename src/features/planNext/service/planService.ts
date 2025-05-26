import type { Plan } from "../../../type/plan";
import { createNewPlan } from "../domain/plan";

import {
  fetchAllPlans,
  addPlan as repoAddPlan,
  updatePlan as repoUpdatePlan,
  deletePlan as repoDeletePlan,
} from "../infrastructure/firestorePlanRepository";

export async function getPlans(): Promise<Plan[]> {
  return await fetchAllPlans();
}

export async function addPlan(title: string, details: string): Promise<"success" | "error"> {
  const plan = createNewPlan(title, details);
  return await repoAddPlan(plan);
}

export async function updatePlanService(plan: Plan): Promise<"success" | "error"> {
  console.log("Updating plan in service:", plan);
  return await repoUpdatePlan(plan);
}

export async function deletePlanService(plan: Plan): Promise<"success" | "error"> {
  return await repoDeletePlan(plan);
}
