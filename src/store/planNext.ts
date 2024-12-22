import { create } from "zustand";
import type { Plan } from "../type/plan";

interface StorePlanNext {
	nextPlans: Plan[];
	isLoading: boolean;

	getNextPlans: () => void;
	setNextPlans: (plans: Plan[]) => void;
	addNextPlan: (
		title: string,
		details: string,
	) => void | { saveResult: string };
	updateNextPlan: (plan: Plan) => void | { saveResult: string };
	deleteNextPlan: (planId: string) => void;
	nextReset: () => void;
	copyPlans: (plans: Plan[]) => void;
}

export const useStoreNextPlan = create<StorePlanNext>((set, get) => ({
	nextPlans: [],
	isLoading: false,
	getNextPlans: () => {},
	setNextPlans: (plans) => {
		set({
			nextPlans: plans,
		});
	},
	addNextPlan: (title: string, details: string) => {
		const plans = get().nextPlans;
		const addPlan = {
			id: `nextPlan${plans.length + 1}`,
			title: title,
			details: details,
			connectId: "addNextPlanId",
		};
		const list = [...get().nextPlans, addPlan];
		set({
			nextPlans: list,
		});
	},
	updateNextPlan: (updatePlan: Plan) => {
		const list = get().nextPlans.map((plan) => {
			if (plan.id === updatePlan.id) {
				return updatePlan;
			}
			return plan;
		});
		set({
			nextPlans: list,
		});
	},
	deleteNextPlan: (planId: string) => {
		const list = get().nextPlans.filter((item) => item.id !== planId);
		set({
			nextPlans: list,
		});
	},
	nextReset: () => {
		set({
			nextPlans: [],
		});
	},
	copyPlans: (plans: Plan[]) => {
		set({
			nextPlans: plans,
		});
	},
}));
