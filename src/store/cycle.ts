import { create } from "zustand";
import { Cycle } from "../type/cycle";

interface StoreCycle {
	cycles: Cycle[];
	isLoading: boolean;

	getCycle: () => void;
	setCycle: (cycles: Cycle[]) => void;
	addCycle: (title: string, details: string) => void | { saveResult: string };
	updateCycle: (cycle: Cycle) => void | { saveResult: string };
	deleteCycle: (cyclesId: number) => void;
	reset: () => void;
}

export const useStoreCycle = create<StoreCycle>((set, get) => ({
	cycles: [],
	isLoading: false,
	getCycle: () => {},
	setCycle: (cycles) => {
		set({
			cycles: cycles,
		});
	},
	addCycle: (title: string, details: string) => {
		const cycles = get().cycles;
		const addCycle = {
			id: cycles.length+1,
			title: title,
			detail: details,
			connectId: "0",
			userId: "0"
		};
		const list = [...get().cycles, addCycle];
		set({
			cycles: list,
		});
	},
	updateCycle: (updatePlan: Cycle) => {
		const list = get().cycles.map((cycle) => {
			if (cycle.id === updatePlan.id) {
				return updatePlan;
			}
			return cycle;
		});
		set({
			cycles: list,
		});
	},
	deleteCycle: (cycleId: number) => {
		const list = get().cycles.filter((item) => item.id !== cycleId);
		set({
			cycles: list,
		});
	},
	reset: () => {
		set({
			cycles: [],
		});
	},
}));
