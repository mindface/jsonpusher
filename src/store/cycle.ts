import { create } from "zustand";
import { Cycle, CycleColumn } from "../type/cycle";

interface StoreCycle {
	cycleColumns:CycleColumn[];
	cycles: Cycle[];
	isLoading: boolean;

	getCycleColumns: () => void;
	setCycle: (cycles: Cycle[]) => void;
  addCycleColumns: (title: string, detail: string) => void;
	addCycle: (title: string, detail: string) => void | { saveResult: string };
	updateCycle: (cycle: Cycle) => void | { saveResult: string };
	deleteCycle: (cyclesId: number) => void;
	reset: () => void;
}

export const useStoreCycle = create<StoreCycle>((set, get) => ({
	cycleColumns: [ {
		cycleColumnId: "list1",
		title: "cycleColumn title1",
		detail: "cycleColumn detail1",
		cards: []
	}],
	cycles: [
			{
				id: 1,
				title: "title",
				detail: "detail",
				connectId: "0",
				userId: "0",
				groupId: "list1"
			},
			{
				id: 2,
				title: "title2",
				detail: "detail",
				connectId: "0",
				userId: "0",
				groupId: "list2"
			}
	],
	isLoading: false,
	getCycleColumns: () => {},
	setCycle: (cycles) => {
		set({
			cycles: cycles,
		});
	},
	addCycleColumns: (title: string, detail: string) => {
		const cycleColumns = get().cycleColumns;
		const addColumn = {
			cycleColumnId: `list${cycleColumns.length+1}`,
			title: "title1",
			detail: "detail1",
			cards: []
		};
		console.log(addColumn);
		set({
			cycleColumns: [...cycleColumns,addColumn],
		});
	},
	addCycle: (title: string, detail: string) => {
		let counter = 0;
		const cycleColumns = get().cycleColumns;
		// ToDo DBに保存する場合にIDの設定は変更する
		cycleColumns.forEach((cycleColumn) => {  counter = counter + cycleColumn.cards.length });
		const addCycle = {
			id: counter+1,
			title: title,
			detail: detail,
			connectId: "0",
			userId: "0",
			groupId: "list1"
		};
		cycleColumns[0].cards = [...cycleColumns[0].cards,addCycle];
		set({
			cycleColumns: cycleColumns,
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
