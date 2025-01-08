"use client";
import { useState } from "react";
import { Button } from "../../stories/Button/Button";
import { Input } from "../../stories/Input/Input";

import { useStoreNextPlan } from "../../store/planNext";

import type { Plan } from "../../type/plan";

type Props = {
	type: string;
	item?: Plan;
};

export default function CNextPlanEdit(props: Props) {
	const { type, item } = props;
	const [planTitle, planTitleSet] = useState(item?.title ?? "");
	const [planDetails, planDetailsSet] = useState(item?.details ?? "");
	const { addNextPlan, updateNextPlan, deleteNextPlan } = useStoreNextPlan();

	const addPlanAction = () => {
		addNextPlan(planTitle, planDetails);
	};

	const updatePlanAction = () => {
		if (item?.id && item?.connectId) {
			const updateItem = {
				id: item?.id,
				title: planTitle,
				details: planDetails,
				connectId: item?.connectId,
			};
			updateNextPlan(updateItem);
		}
	};

	const deletePlanAction = () => {
		if (item?.id) {
			deleteNextPlan(item?.id);
		}
	};

	return (
		<div className="pb-4">
			<div className="pb-2">
				<Input
					type="text"
					value={planTitle}
					outerClassName={type === "edit" ? "label-dark" : ""}
					label="タイトル"
					onChange={(value) => {
						planTitleSet(value as string);
					}}
					max={1000}
				/>
			</div>
			<div className="flex pb-2">
				<Input
					type="text"
					label="詳細"
					value={planDetails}
					outerClassName={type === "edit" ? "label-dark" : ""}
					onChange={(value) => {
						planDetailsSet(value as string);
					}}
					max={1000}
				/>
				<Button
					label={type === "edit" ? "更新" : "追加"}
					size="small"
					primary={true}
					onClick={() => {
						if (type === "edit") {
							updatePlanAction();
						} else {
							addPlanAction();
						}
					}}
				/>
				{type === "edit" && (
					<Button
						label="削除"
						size="small"
						primary={false}
						onClick={() => {
							deletePlanAction();
						}}
					/>
				)}
			</div>
		</div>
	);
}
