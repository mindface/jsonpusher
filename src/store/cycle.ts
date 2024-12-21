import { create } from "zustand";
import { Cycle, CycleColumn } from "../type/cycle";

interface StoreCycle {
	cycleColumns:CycleColumn[];
	cycles: Cycle[];
	isLoading: boolean;

	getCycleColumns: () => void;
	settingCycleColumns: () => void;
	setCycleColumns: (cycleColumns: CycleColumn[]) => void;
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
				title: "Aモデル",
				detail: "動作検証",
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
			},
			{
				id: 3,
				title: "title3",
				detail: "detail",
				connectId: "0",
				userId: "0",
				groupId: "list2"
			},
			{
				id: 5,
				title: "title4",
				detail: "detail",
				connectId: "0",
				userId: "0",
				groupId: "list2"
			}
	],
	isLoading: false,
	getCycleColumns: () => {},
	settingCycleColumns: () => {
		const cycleColumns = get().cycleColumns;
		const cycles = get().cycles;
		const reColumns: CycleColumn[] = cycleColumns.map((column) => {
			const list:Cycle[] = [];
			cycles.forEach((cycle) => {
				if(column.cycleColumnId === cycle.groupId) {
					list.push(cycle);
				}
			});
			column.cards = list;
			return column;
		});
		set({
			cycleColumns: reColumns,
		});
	},
	setCycleColumns: (cycleColumns) => {
		set({
			cycleColumns: cycleColumns,
		});
	},
	addCycleColumns: (title: string, detail: string) => {
		const cycleColumns = get().cycleColumns;
		const addColumn = {
			cycleColumnId: `list${cycleColumns.length+1}`,
			title: title,
			detail: detail,
			cards: []
		};
		set({
			cycleColumns: [...cycleColumns,addColumn],
		});
	},
	addCycle: (title: string, detail: string) => {
		let cycles = get().cycles;
		// ToDo DBに保存する場合にIDの設定は変更する
		const addCycle = {
			id: cycles.length+1,
			title: title,
			detail: detail,
			connectId: "0",
			userId: "0",
			groupId: "list1"
		};
		cycles = [...cycles,addCycle];
		set({
			cycles: cycles,
		});
		get().settingCycleColumns();
	},
	updateCycle: (updateCycle: Cycle) => {
		const baseList = get().cycles;
		const list = baseList.map((cycle) => {
			if (cycle.id === updateCycle.id) {
				console.log(updateCycle);
				return updateCycle;
			}
			return cycle;
		});
		set({
			cycles: list,
		});
		get().settingCycleColumns();
	},
	deleteCycle: (cycleId: number) => {
		const list = get().cycles.filter((item) => item.id !== cycleId);
		set({
			cycles: list,
		});
		get().settingCycleColumns();
	},
	reset: () => {
		set({
			cycles: [],
		});
	},
}));
