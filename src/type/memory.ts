import { Timestamp } from "firebase/firestore";

export type Memory = {
	id: number;
	title: string;
	detail: string;
	connectId: string;
	userId: string;
	memoryId: string;
	groupId: string;
	status: string;
	createAt: Timestamp;
	updateAt: Timestamp;
};
