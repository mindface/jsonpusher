import { create } from "zustand";
import type { Plan } from "../type/plan";
import { db } from "../lib/firebaseClient";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	doc,
	collection,
	addDoc,
	updateDoc,
	getDocs,
	query,
	where,
	Timestamp,
} from "firebase/firestore";

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
	updateNextPlan: (plan: Plan) => void | { saveResult: string };
	deleteNextPlan: (planId: string) => void;
	nextReset: () => void;
	copyPlans: (plans: Plan[]) => void;
}

export const useStoreNextPlan = create<StorePlanNext>((set, get) => ({
	nextPlans: [],
	isLoading: false,
	getNextPlans: async () => {
		const auth = await getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userCollectionRef = collection(db, "users", user.uid, "nextPlan");
				const q = query(
					userCollectionRef,
					where("userId", "==", user.uid),
					where("status", "==", "run"),
				);
				const querySnapshot = await getDocs(q);
				const list = querySnapshot.docs.map((doc) => ({
					...doc.data(),
				})) as Plan[];
				console.log(list);
				set({ nextPlans: list });
			} else {
				console.log("No user is signed in.");
			}
		});
	},
	setNextPlans: (plans) => {
		set({
			nextPlans: plans,
		});
	},
	addNextPlan: async (title: string, details: string) => {
		const plans = get().nextPlans;
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
				const addPlan = {
					id: `plan${plans.length + 1}`,
					title: title,
					details: details,
					userId: user.uid,
					planId: "",
					connectId: "string;",
					status: "run",
					groupId: "string;",
					createAt: Timestamp.now(),
					updateAt: Timestamp.now(),
				};
				const userDocRef = doc(db, "users", user.uid);
				const userCollectionRef = collection(userDocRef, "nextPlan");
				const planId = userCollectionRef.id;
				await addDoc(userCollectionRef, {
					...addPlan,
					planId
				});
			const list = [...get().nextPlans, addPlan];
			set({
				nextPlans: list,
			});
		} else {
			console.log("No user is signed in.");
		}
		return { saveResult: "success" };
	},
	updateNextPlan: (updatePlan: Plan) => {
		const auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const planDocRef = doc(
					db,
					"users",
					user.uid,
					"nextPlan",
					updatePlan.planId,
				);
				await updateDoc(planDocRef, {
					...updatePlan,
					updateAt: new Date(),
				});
				get().getNextPlans();
			} else {
				console.log("No user is signed in.");
			}
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
