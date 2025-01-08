import { create } from "zustand";
import type { Memory } from "../type/memory";
import { db } from "../lib/firebaseClient";
import { doc, collection, addDoc, updateDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from "firebase/auth";
interface StoreMemoery {
	memories: Memory[];
	isLoading: boolean;

	getMemory: () => void;
	addMemory: (title: string, detail: string) => Promise<void | { saveResult: string }>;
	updateMemory: (memory: Memory) => void | { saveResult: string };
	deleteMemory: (memory: Memory) => void;
	setMemory: (memories: Memory[]) => void;
	reset: () => void;
}

export const useStoreMemoery = create<StoreMemoery>((set, get) => ({
	memories: [
		{
			id: 1,
			title: "check api memories title01",
			detail: "check api detail01",
			connectId: "",
			userId: "",
			memoryId: "",
			groupId: "",
			status: "",
			createAt: Timestamp.now(),
			updateAt: Timestamp.now(),
		},
	],
	isLoading: false,
	getMemory: async () => {
    const auth = await getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userCollectionRef = collection(db, "users", user.uid, "memories");
				const q = query(
					userCollectionRef,
					where("userId", "==", user.uid),
					where("status", "==", "run")
				);
				const querySnapshot = await getDocs(q);
				const list = querySnapshot.docs.map((doc) => ({
					 ...doc.data(),
					 memoryId: doc.id
					})) as Memory[];
				set({ memories: list });
			} else {
				console.log("No user is signed in.");
			}
		});
	},
	addMemory: async (title: string, detail: string) => {
		const memories = get().memories;
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
			const addMemory = {
				id: memories.length+1,
        title,
				detail,
				connectId: "string;",
				userId: user.uid,
				memoryId: "",
				groupId: "string;",
				status: "run",
				createAt: Timestamp.now(),
				updateAt: Timestamp.now()
			};
			const userDocRef = doc(db, "users", user.uid);
      const userCollectionRef = collection(userDocRef, "memories");
      await addDoc(userCollectionRef, {
        ...addMemory
      });
			set({
				memories: [...memories,addMemory],
			});
			return { saveResult: "success" }
    }
	},
	updateMemory: (updateMemories: Memory) => {
    const auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const memoryDocRef = doc(db, "users", user.uid, "memories", updateMemories.memoryId);
				await updateDoc(memoryDocRef, {
					...updateMemories,
					updateAt: new Date(),
				});
				get().getMemory();
			} else {
				console.log("No user is signed in.");
			}
		});
	},
	deleteMemory: (updateMemories: Memory) => {
		const auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const memoryDocRef = doc(db, "users", user.uid, "memories", updateMemories.memoryId);
				await updateDoc(memoryDocRef, {
					...updateMemories,
					status: "stop",
					updateAt: new Date(),
				});
				get().getMemory();
			} else {
				console.log("No user is signed in.");
			}
		});
	},
	setMemory: (memories: Memory[]) => {
		set({
			memories: memories,
		});
	},
	reset: () => {
		set({
			memories: [],
		});
	},
}));
