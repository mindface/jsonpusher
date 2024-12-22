export type Cycle = {
	id: number;
	title: string;
	detail: string;
	connectId: string;
	userId: string;
	groupId: string;
};

export type CycleColumn = {
	cycleColumnId: string;
	title: string;
	detail: string;
	cards: Cycle[];
};

// export type CycleKanban = {
// 	id: number;
// 	title: string;
// 	detail: string;
// 	connectId: string;
// 	userId: string;
// 	groupNumber: string;
// };
