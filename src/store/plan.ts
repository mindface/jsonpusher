import { create } from "zustand";
import { Plan } from "../type/plan";

interface StorePlan {
  plans: Plan[];
  isLoading: boolean,

  getPlans: () => void;
  addPlan: (title:string,details: string) => void | { saveResult: string };
  updatePlan: (plan: Plan) => void | { saveResult: string };
  deletePlan: (planId: string) => void;
  reset: () => void;
}

export const useStorePlan = create<StorePlan>((set, get) => ({
  plans: [],
  isLoading: false,
  getPlans: () => {},
  addPlan: (title:string,details: string) => {
    const plans = get().plans;
    const addPlan = {
      id: `plan${plans.length+1}`,
      title: title,
      details: details,
      connectId: "addPlanId",
    }
    const list = [...get().plans,addPlan];
    set({
      plans: list,
    });
  },
  updatePlan: (updatePlan: Plan) => {
    const list = get().plans.map((plan) => {
      if(plan.id === updatePlan.id) {
        return updatePlan;
      }
      return plan;
    });
    set({
      plans: list,
    });
  },
  deletePlan: (planId: string) => {
    const list = get().plans.filter((item) => item.id !== planId);
    set({
      plans: list,
    });
  },
  reset: () => {
    set({
      plans: [],
    });
  },
}));
