import { create } from "zustand";
import type { Memory } from "../type/memory";
import { db } from "../lib/firebaseClient";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface StoreMemoery {
	memories: Memory[];
	isLoading: boolean;

	getMemory: () => void;
	addMemory: (title: string, detail: string) => Promise<void | { saveResult: string }>;
	updateMemory: (memory: Memory) => void | { saveResult: string };
	deleteMemory: (memoryId: number) => void;
	setMemory: (memories: Memory[]) => void;
	reset: () => void;
}

export const useStoreMemoery = create<StoreMemoery>((set, get) => ({
	memories: [
		{
			id: 1,
			title: "memories title1",
			detail: "memories detail1",
			connectId: "",
			userId: "",
			groupId: "",
			status: "",
			createAt: new Date,
			updateAt: new Date,
		},
	],
	isLoading: false,
	getMemory: async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userCollectionRef = collection(db, "memories", user.uid);
      const querySnapshot = await getDocs(userCollectionRef);
			const list = querySnapshot.docs.map((doc) => ({ ...doc.data() })) as Memory[];
      set({ memories: list });
    }
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
				groupId: "string;",
				status: "string;",
				createAt: new Date(),
				updateAt: new Date()
			};
			console.log(addMemory);
      const userCollectionRef = collection(db, "memories", user.uid);
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
		const baseList = get().memories;
		const list = baseList.map((cycle) => {
			if (cycle.id === updateMemories.id) {
				return updateMemories;
			}
			return cycle;
		});
		set({
			memories: list,
		});
	},
	deleteMemory: (memoriesId: number) => {
		const memories = get().memories.filter((item) => item.id !== memoriesId);
		set({
			memories: memories,
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
