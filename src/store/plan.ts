import { create } from "zustand";
import type { Plan } from "../type/plan";
import {
	Timestamp,
} from "firebase/firestore";

import { FirestorePlanActions } from "../lib/firestorePlanActions";

interface StorePlan {
	plans: Plan[];
	isLoading: boolean;
	isError: boolean;

	getPlans: () => void;
	setPlans: (plans: Plan[]) => void;
	addPlan: (title: string, details: string) => Promise<void | { saveResult: string }>;
	updatePlan: (plan: Plan) => Promise<void | { saveResult: string }>;
	deletePlan: (updatePlan: Plan) => void;
	reset: () => void;
}

export const useStorePlan = create<StorePlan>((set, get) => ({
	plans: [],
	isLoading: false,
	isError: false,
	getPlans: async () => {
		const firestorePlanActions = new FirestorePlanActions();
		const list = await firestorePlanActions.getAction("plan");
		set({ plans: list });
	},
	setPlans: (plans) => {
		set({
			plans: plans,
		});
	},
	addPlan: async (title: string, details: string) => {
		const firestorePlanActions = new FirestorePlanActions();
		const plans = get().plans;
		//TODO idは自動で割り振られるので空にしているが、実装で困るケースを調査して改善予定
		const addPlan = {
			id: "",
			title: title,
			details: details,
			userId: "",
			planId: "",
			connectId: "string;",
			status: "run",
			groupId: "string;",
			createAt: Timestamp.now(),
			updateAt: Timestamp.now(),
		};
		const res = await firestorePlanActions.addAction(addPlan,"plan");
		if(res.status === "success") {
			get().getPlans();
		} else if(res.status === "error") {
			alert("管理者に問い合わせてください。");
		}
		return { saveResult: "success" };
	},
	updatePlan: async (updatePlan: Plan) => {
		const firestorePlanActions = new FirestorePlanActions();
		const res = await firestorePlanActions.updatePlan(updatePlan,"plan");
		if(res.status === "success") {
			get().getPlans();
		} else if(res.status === "error") {
			alert("管理者に問い合わせてください。");
		}
	},
	deletePlan: async (updatePlan: Plan) => {
		const firestorePlanActions = new FirestorePlanActions();
		const res = await firestorePlanActions.deletePlan(updatePlan,"plan");
		if(res.status === "success") {
			get().getPlans();
		} else if(res.status === "error") {
			alert("管理者に問い合わせてください。");
		}
	},
	reset: () => {
		set({
			plans: [],
		});
	},
}));
