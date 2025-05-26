import { create } from "zustand";
import type { Memory } from "../../../type/memory";

import {
  getMemories,
  addMemoryService,
  updateMemoryService,
  deleteMemoryService,
} from "../service/memoryService";

interface StoreMemory {
  memories: Memory[];
  isLoading: boolean;
  getMemory: () => Promise<void>;
  addMemory: (title: string, detail: string) => Promise<void>;
  updateMemory: (memory: Memory) => Promise<void>;
  deleteMemory: (memory: Memory) => Promise<void>;
  setMemory: (memories: Memory[]) => void;
  reset: () => void;
}

export const useStoreMemory = create<StoreMemory>((set, get) => ({
  memories: [],
  isLoading: false,
  getMemory: async () => {
    set({ isLoading: true });
    const memories = await getMemories();
    set({ memories, isLoading: false });
  },
  addMemory: async (title, detail) => {
    set({ isLoading: true });
    const res = await addMemoryService(title, detail);
    if (res === "success") {
      await get().getMemory();
    } else {
      alert("管理者に問い合わせてください。");
    }
    set({ isLoading: false });
  },
  updateMemory: async (memory) => {
    set({ isLoading: true });
    const res = await updateMemoryService(memory);
    if (res === "success") {
      await get().getMemory();
    } else {
      alert("管理者に問い合わせてください。");
    }
    set({ isLoading: false });
  },
  deleteMemory: async (memory) => {
    set({ isLoading: true });
    const res = await deleteMemoryService(memory);
    if (res === "success") {
      await get().getMemory();
    } else {
      alert("管理者に問い合わせてください。");
    }
    set({ isLoading: false });
  },
  setMemory: (memories) => set({ memories }),
  reset: () => set({ memories: [] }),
}));
