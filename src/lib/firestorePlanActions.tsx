import type { Plan } from "../type/plan";
import { db } from "../lib/firebaseClient";
import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
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

type SetType = "plan" | "nextPlan";

export class FirestorePlanActions {
	auth:Auth;
	constructor() {
		this.auth = getAuth();
	}
	async getAction(targetType: string): Promise<Plan[]> {
		const auth = await this.auth;
		const currentId = auth.currentUser;
		return new Promise((resolve, reject) => {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					try {
						const userCollectionRef = collection(db, "users", user.uid, targetType);
						const q = query(
							userCollectionRef,
							where("userId", "==", user.uid),
							where("status", "==", "run"),
						);
						const querySnapshot = await getDocs(q);
						const list = querySnapshot.docs.map((doc) => ({
							...doc.data(),
						})) as Plan[];
						resolve(list);
					} catch (error) {
						reject(error);
					}
				} else {
					console.log("No user is signed in.");
					resolve([]);
				}
			});
		});
	}
	async addAction(addPlan: Plan, targetType: SetType): Promise<{status:string}> {
		const auth = await this.auth;
		const user = auth.currentUser;
		return new Promise( async (resolve, reject) => {
			if (user) {
				try {
					const userDocRef = doc(db, "users", user.uid);
					const userCollectionRef = collection(userDocRef, targetType);
					const planId = userCollectionRef.id;
					delete addPlan.id;
					const docRef = await addDoc(userCollectionRef, {
						...addPlan,
						userId: user.uid,
						planId
					});
					await updateDoc(docRef, { id: docRef.id, planId: docRef.id });
					resolve({status:"success"});
				} catch (error) {
					reject({status:"error"});
					console.error(error);
				}
			} else {
				console.log("No user is signed in.");
				resolve({status:"no user"});
			}
		});
	}
	async updatePlan(updatePlan: Plan, targetType: SetType): Promise<{status:string}> {
		const auth = await this.auth;
		return new Promise((resolve, reject) => {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					const planDocRef = doc(
						db,
						"users",
						user.uid,
						targetType,
						updatePlan.id ?? "",
					);
					try {
						await updateDoc(planDocRef, {
							...updatePlan,
							updateAt: Timestamp.now(),
						});
						resolve({status:"success"});
					} catch (error) {
						reject({status:"error"});
						console.error(error);
					}
				} else {
					console.log("No user is signed in.");
					resolve({status:"no user"});
				}
			});		
		});
	}
	deletePlan(updatePlan: Plan, targetType: SetType): Promise<{status:string}> {
		const auth = getAuth();
		return new Promise((resolve, reject) => {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					const planDocRef = doc(
						db,
						"users",
						user.uid,
						targetType,
						updatePlan.id ?? "",
					);
					try {
						await updateDoc(planDocRef, {
							...updatePlan,
							status: "stop",
							updateAt: Timestamp.now(),
						});
						resolve({status:"success"});
					} catch (error) {
						reject({status:"error"});
						console.error(error);
					}
				} else {
					console.log("No user is signed in.");
					resolve({status:"no user"});
				}
			});
		});
	}
}
