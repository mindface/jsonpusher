"use client";
import { useEffect, useState } from "react";
import { Button } from "../../stories/Button/Button";
import { Input } from "../../stories/Input/Input";

import { useStorePlan } from "../../store/plan";

import type { Plan } from "../../type/plan";

type Props = {
	type: string;
	item?: Plan;
};

export default function CPlanEdit(props: Props) {
	const [planTitle, planTitleSet] = useState("");
	const [planDetails, planDetailsSet] = useState("");
	const { addPlan, updatePlan, deletePlan } = useStorePlan();
	const { type, item } = props;

	useEffect(() => {
		if (type === "edit" && item?.title && item?.details) {
			planTitleSet(item?.title);
			planDetailsSet(item?.details);
		}
	}, [type, item?.title, item?.details]);

	const addPlanAction = () => {
		addPlan(planTitle, planDetails);
	};

	const updatePlanAction = () => {
		if (item?.id && item?.connectId) {
			const updateItem = {
				id: item?.id,
				title: planTitle,
				details: planDetails,
				connectId: item?.connectId,
			};
			updatePlan(updateItem);
		}
	};

	const deletePlanAction = () => {
		if (item?.id) {
			deletePlan(item?.id);
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
					value={planDetails}
					outerClassName={type === "edit" ? "label-dark" : ""}
					label="詳細"
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
