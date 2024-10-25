"use client"
import { useState, useEffect } from "react";
import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";

import { useStoreNextPlan } from "../store/planNext";

import { Plan } from "../type/plan";

type Props = {
	type: string;
	item?: Plan;
}

export default function CNextPlanEdit(props: Props) {
	const [planTitle,planTitleSet] = useState("");
	const [planDetails,planDetailsSet] = useState("");
	const { addNextPlan, updateNextPlan, deleteNextPlan } = useStoreNextPlan();
	const { type, item } = props;

	useEffect(() => {
		if(type === "edit" && item?.title && item?.details) {
			planTitleSet(item?.title);
			planDetailsSet(item?.details);
		}
	},[type,item?.title,item?.details]);

	const addPlanAction = () => {
		addNextPlan(planTitle,planDetails);
	}

	const updatePlanAction = () => {
		if(item?.id && item?.connectId) {
			const updateItem = {
				id: item?.id,
				title: planTitle,
				details: planDetails,
				connectId: item?.connectId
			}
			updateNextPlan(updateItem);
		}
	}

	const deletePlanAction = () => {
		if(item?.id) {
			deleteNextPlan(item?.id);
		}
	}

	return (
		<div className="pb-4">
			<div className="pb-2">
				<Input
					type="text"
					value={planTitle}
					className={type === "edit" ? "label-dark":""}
					label="タイトル"
					onChange={(value) => { planTitleSet(value) }}
					max={1000}
				/>
			</div>
			<div className="flex pb-2">
				<Input
					type="text"
					label="詳細"
					value={planDetails}
					className={type === "edit" ? "label-dark":""}
					onChange={(value) => { planDetailsSet(value) }}
					max={1000}
				/>
				<Button
					label={type === "edit" ? "更新" : "追加"}
					size="small"
					primary={true}
					onClick={() => {
						if(type === "edit") {
							updatePlanAction();
						} else {
							addPlanAction();
						}
					}}
				/>
				{ type === "edit" && <Button
					label="削除"
					size="small"
					primary={false}
					onClick={() => { deletePlanAction(); }}
				/> }
			</div>
		</div>
	);
}
