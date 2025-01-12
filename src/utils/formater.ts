import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

export class ForMatter {
	static formatDay(day: string | Date) {
		if (typeof day === "object") {
			return dayjs(day).format("YYYY-MM-DD");
		}
	}
	static convertTimestampToDayjs(timestamp: Timestamp) {
		return dayjs(timestamp.toDate()).format("YYYY-MM-DD");
	}
}
