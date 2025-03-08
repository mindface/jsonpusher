import { create } from "zustand";
import type { Plan } from "../type/plan";
import { Timestamp } from "firebase/firestore";

import { FirestorePlanActions } from "../lib/firestorePlanActions";

interface StorePlanNext {
	nextPlans: Plan[];
	isLoading: boolean;

	getNextPlans: () => void;
	setNextPlans: (plans: Plan[]) => void;
	addNextPlan: (
		title: string,
		details: string,
	) => Promise<void | { saveResult: string }>;
	updateNextPlan: (updatePlan: Plan) => Promise<void>;
	deleteNextPlan: (updatePlan: Plan) => void;
	nextReset: () => void;
	copyPlans: (plans: Plan[]) => void;
}

export const useStoreNextPlan = create<StorePlanNext>((set, get) => ({
	nextPlans: [],
	isLoading: false,
	getNextPlans: async () => {
		const firestorePlanActions = new FirestorePlanActions();
		const list = await firestorePlanActions.getAction("nextPlan");
		set({ nextPlans: list });
	},
	setNextPlans: (plans) => {
		set({
			nextPlans: plans,
		});
	},
	addNextPlan: async (title: string, details: string) => {
		const firestorePlanActions = new FirestorePlanActions();
		//TODO idは自動で割り振られるので空にしているが、実装で困るケースを調査して改善予定
		const addNextPlan = {
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
		const res = await firestorePlanActions.addAction(addNextPlan, "nextPlan");
		if (res.status === "success") {
			get().getNextPlans();
		} else if (res.status === "error") {
			alert("管理者に問い合わせてください。");
		}
		return { saveResult: "success" };
	},
	updateNextPlan: async (updatePlan: Plan) => {
		const firestorePlanActions = new FirestorePlanActions();
		const res = await firestorePlanActions.updatePlan(updatePlan, "nextPlan");
		if (res.status === "success") {
			get().getNextPlans();
		} else if (res.status === "error") {
			alert("管理者に問い合わせてください。");
		}
	},
	deleteNextPlan: async (updatePlan: Plan) => {
		const firestorePlanActions = new FirestorePlanActions();
		const res = await firestorePlanActions.deletePlan(updatePlan, "nextPlan");
		if (res.status === "success") {
			get().getNextPlans();
		} else if (res.status === "error") {
			alert("管理者に問い合わせてください。");
		}
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
