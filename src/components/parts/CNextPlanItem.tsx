"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "../../stories/Button/Button";
import styles from "../../styles/cNextPlanItem.module.css";

import CNextPlanEdit from "./CNextPlanEdit";

import type { Plan } from "../../type/plan";

type Props = {
	item: Plan;
};

export default function CNextPlanItem(props: Props) {
	const [itemView, itemViewSet] = useState(false);
	const [editClass, editClassSet] = useState("left-0");
	const { item } = props;
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const taget = divRef.current?.getBoundingClientRect();
		if (taget && taget?.left > window.innerWidth / 2) {
			editClassSet("right-0");
		}
	}, []);

	return (
		<div className={["next-plan-item", "p-2"].join(" ")}>
			<div className="flex justify-between">
				<h4 className="next-plan-item__title pb-2">{item.title}</h4>
				<Button
					label={itemView ? "close" : "view edit"}
					size="small"
					onClick={() => {
						itemViewSet(!itemView);
					}}
				/>
			</div>
			<div
				className={[
					"next-plan-item__edit-wrap",
					"relative",
					itemView ? styles.open : "",
				].join(" ")}
			>
				<div
					ref={divRef}
					className={[
						styles["next-plan-item__edit"],
						editClass,
						"absolute",
						"p-2",
						"top-0",
						"w-[380px]",
						"bg-white",
						"shadow-lg",
						"rounded-lg",
					].join(" ")}
				>
					<CNextPlanEdit type="edit" item={item} />
				</div>
			</div>
		</div>
	);
}
