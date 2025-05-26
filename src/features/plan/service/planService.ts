import { Plan, createNewPlan } from "../domain/plan";
import {
  fetchAllPlans,
  addPlan as repoAddPlan,
  updatePlanRepo,
  deletePlanRepo,
} from "../infrastructure/firestorePlanRepository";

export async function getPlans(): Promise<Plan[]> {
  return await fetchAllPlans();
}

export async function addPlanService(title: string, details: string): Promise<"success" | "error"> {
  const plan = createNewPlan(title, details);
  return await repoAddPlan(plan);
}

export async function updatePlanService(plan: Plan): Promise<"success" | "error"> {
  return await updatePlanRepo(plan);
}

export async function deletePlanService(plan: Plan): Promise<"success" | "error"> {
  return await deletePlanRepo(plan);
}
