import { create } from "zustand";
import { Plan } from "../domain/plan";
import {
  getPlans,
  addPlanService,
  updatePlanService,
  deletePlanService,
} from "../service/planService";

interface StorePlan {
  plans: Plan[];
  isLoading: boolean;
  isError: boolean;
  getPlans: () => Promise<void>;
  setPlans: (plans: Plan[]) => void;
  addPlan: (title: string, details: string) => Promise<void>;
  updatePlan: (plan: Plan) => Promise<void>;
  deletePlan: (plan: Plan) => Promise<void>;
  reset: () => void;
}

export const useStorePlan = create<StorePlan>((set, get) => ({
  plans: [],
  isLoading: false,
  isError: false,
  getPlans: async () => {
    set({ isLoading: true });
    const plans = await getPlans();
    set({ plans, isLoading: false });
  },
  setPlans: (plans) => set({ plans }),
  addPlan: async (title, details) => {
    set({ isLoading: true });
    const res = await addPlanService(title, details);
    if (res === "success") {
      await get().getPlans();
    } else {
      alert("管理者に問い合わせてください。");
    }
    set({ isLoading: false });
  },
  updatePlan: async (plan) => {
    set({ isLoading: true });
    const res = await updatePlanService(plan);
    if (res === "success") {
      await get().getPlans();
    } else {
      alert("管理者に問い合わせてください。");
    }
    set({ isLoading: false });
  },
  deletePlan: async (plan) => {
    set({ isLoading: true });
    const res = await deletePlanService(plan);
    if (res === "success") {
      await get().getPlans();
    } else {
      alert("管理者に問い合わせてください。");
    }
    set({ isLoading: false });
  },
  reset: () => set({ plans: [] }),
}));
