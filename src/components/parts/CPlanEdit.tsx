"use client";
import { useEffect, useState } from "react";
import { Button } from "../../stories/Button/Button";
import { Input } from "../../stories/Input/Input";
import { Textarea } from "../../stories/TextArea/Textarea";

import { useStorePlan } from "../../features/plan/store/planStore";

import type { Plan } from "../../type/plan";

type Props = {
	type: string;
	colorType?: string;
	item?: Plan;
	closeAction?: () => void;
};

export default function CPlanEdit(props: Props) {
	const [planTitle, planTitleSet] = useState("");
	const [planDetails, planDetailsSet] = useState("");
	const { addPlan, updatePlan, deletePlan } = useStorePlan();
	const { type, item, closeAction, colorType } = props;
  const modalCloseAction = closeAction ?? (() => {});

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
				...item,
				title: planTitle,
				details: planDetails,
				connectId: item?.connectId,
			};
			updatePlan(updateItem);
      modalCloseAction();
		}
	};

	const deletePlanAction = () => {
		if (item?.id) {
			deletePlan(item);
      modalCloseAction();
		}
	};

	return (
		<div className="pb-4">
			<div className="pb-2">
				<Input
					type="text"
					value={planTitle}
					className="w-full"
					outerClassName={colorType === "dark" ? "label-dark" : ""}
					label="タイトル"
					onChange={(value) => {
						planTitleSet(value as string);
					}}
					max={1000}
				/>
			</div>
			<div className="pb-2">
				<Textarea
					value={planDetails}
					outerClassName={colorType === "dark" ? "label-dark" : ""}
					label="詳細"
					onChange={(value) => {
						planDetailsSet(value as string);
					}}
				/>
			</div>
			<div className="pb-2">
				<Button
					label={colorType === "dark" ? "更新" : "追加"}
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
