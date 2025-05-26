import type { Memory } from "../../../type/memory";
import { createNewMemory } from "../domain/memory";
import {
  fetchAllMemories,
  addMemory as repoAddMemory,
  updateMemoryRepo,
  deleteMemoryRepo,
} from "../infrastructure/firestoreMemoryRepository";

type responseType = "success" | "error";

export async function getMemories(): Promise<Memory[]> {
  return await fetchAllMemories();
}

export async function addMemoryService(title: string, detail: string): Promise<responseType> {
  const memory = createNewMemory(title, detail);
  return await repoAddMemory(memory);
}

export async function updateMemoryService(memory: Memory): Promise<responseType> {
  return await updateMemoryRepo(memory);
}

export async function deleteMemoryService(memory: Memory): Promise<responseType> {
  return await deleteMemoryRepo(memory);
}
