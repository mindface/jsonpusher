import { Timestamp } from "firebase/firestore";

export type Plan = {
	id: string;
	title: string;
	details: string;
	userId: string;
	planId: string;
	connectId: string;
	status: string;
	groupId: string;
	createAt: Timestamp;
	updateAt: Timestamp;
};

export interface AddPlan extends Omit<Plan, "id"> {
	id?: string;
}
