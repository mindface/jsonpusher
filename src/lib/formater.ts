import dayjs from "dayjs"
import { Timestamp } from "firebase/firestore";

export const formatDay = (day: string | Date) => {
	if(typeof day === "object") {
		return dayjs(day).format("YYYY-MM-DD");
	}
};

export const  convertTimestampToDayjs = (timestamp: Timestamp) => {
  return dayjs(timestamp.toDate()).format("YYYY-MM-DD");
}
