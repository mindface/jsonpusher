import { create } from "zustand";
import type { Plan } from "../../../type/plan";
import {
  getPlans,
  addPlan,
  updatePlanService,
  deletePlanService,
} from "../service/planService";

interface StorePlanNext {
  nextPlans: Plan[];
  isLoading: boolean;
  getNextPlans: () => Promise<void>;
  addNextPlan: (title: string, details: string) => Promise<void>;
  updateNextPlan: (plan: Plan) => Promise<void>;
  deleteNextPlan: (plan: Plan) => Promise<void>;
  nextReset: () => void;
  setNextPlans: (plans: Plan[]) => void;
  copyPlans: (plans: Plan[]) => void;
}

export const useStoreNextPlan = create<StorePlanNext>((set, get) => ({
  nextPlans: [],
  isLoading: false,
  getNextPlans: async () => {
    set({ isLoading: true });
    const plans = await getPlans();
    set({ nextPlans: plans, isLoading: false });
  },
  addNextPlan: async (title, details) => {
    set({ isLoading: true });
    const res = await addPlan(title, details);
    if (res === "success") {
      await get().getNextPlans();
    } else {
      alert("管理者に問い合わせてください。");
    }
    set({ isLoading: false });
  },
  updateNextPlan: async (plan) => {
    set({ isLoading: true });
    const res = await updatePlanService(plan);
    if (res === "success") {
      await get().getNextPlans();
    } else {
      alert("管理者に問い合わせてください。");
    }
    set({ isLoading: false });
  },
  deleteNextPlan: async (plan) => {
    set({ isLoading: true });
    const res = await deletePlanService(plan);
    if (res === "success") {
      await get().getNextPlans();
    } else {
      alert("管理者に問い合わせてください。");
    }
    set({ isLoading: false });
  },
  nextReset: () => set({ nextPlans: [] }),
  setNextPlans: (plans) => set({ nextPlans: plans }),
  copyPlans: (plans) => set({ nextPlans: plans }),
}));
