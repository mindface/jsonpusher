"use client"
import { useState } from "react";
import { Button } from "../stories/Button/Button";
import styles from "../styles/cPlanItem.module.css";

import CPlanEdit from "../components/CPlanEdit";

import type { Plan } from "../type/plan";

type Props = {
	item: Plan;
}

export default function CPlanItem(props: Props) {
	const [itemView,itemViewSet] = useState(false);
	const { item } = props;

	return (
		<div className={["plan-item","p-2"].join(" ")}>
			<div className="flex justify-between">
			<h4 className={["plan-item__title","p-2"].join(" ")}>{item.title}</h4>
				<Button
					label={itemView ? "close":"view edit"}
					size="small"
					onClick={() => { itemViewSet(!itemView) }}
				/>
			</div>
			<div className={["plan-item__edit-wrap","relative",itemView ? styles.open : ""].join(" ")}>
				<div className={`${styles["plan-item__edit"]} absolute p-2 top-0 left-0 w-[380px] bg-white shadow-lg rounded-lg`}>
					<CPlanEdit type="edit" item={item} />
				</div>
			</div>
		</div>
	);
}
