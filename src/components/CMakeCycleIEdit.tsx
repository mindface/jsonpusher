"use client";
import { useState, useEffect } from "react";
import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";

import { useStoreCycle } from "../store/cycle";

import { Cycle } from "../type/cycle";

type Props = {
	type: string;
	item?: Cycle;
};

export default function CMakeCycleIEdit(props: Props) {
	const [cycleTitle, cycleTitleSet] = useState("");
	const [cycleDetail, cycleDetailSet] = useState("");
	const { addCycle, updateCycle, deleteCycle } = useStoreCycle();
	const { type, item } = props;

	useEffect(() => {
		if (type === "edit" && item?.title && item?.detail) {
			cycleTitleSet(item?.title);
			cycleDetailSet(item?.detail);
		}
	}, [type, item?.title, item?.detail]);

	const addCycleAction = () => {
		addCycle(cycleTitle, cycleDetail);
	};

	const updateCycleAction = () => {
		if(item?.id) {
			const updateItem = {
				id: item.id,
				title: cycleTitle,
				detail: cycleDetail,
				connectId: "0",
				userId: "0",
				groupId: "list1"
			};
			updateCycle(updateItem);
		}
	};

	const deleteCycleAction = () => {
		if (item?.id) {
			deleteCycle(item?.id);
		}
	};

	return (
		<div className="pb-4">
			<div className="pb-2">
				<Input
					type="text"
					value={cycleTitle}
					className={type === "edit" ? "label-dark" : ""}
					label="タイトル"
					onChange={(value) => {
						cycleTitleSet(value as string);
					}}
					max={1000}
				/>
			</div>
			<div className="flex pb-2">
				<Input
					type="text"
					label="詳細"
					value={cycleDetail}
					className={type === "edit" ? "label-dark" : ""}
					onChange={(value) => {
						cycleDetailSet(value as string);
					}}
					max={1000}
				/>
				<Button
					label={type === "edit" ? "更新" : "追加"}
					size="small"
					primary={true}
					onClick={() => {
						if (type === "edit") {
							updateCycleAction();
						} else {
							addCycleAction();
						}
					}}
				/>
				{type === "edit" && (
					<Button
						label="削除"
						size="small"
						primary={false}
						onClick={() => {
							deleteCycleAction();
						}}
					/>
				)}
			</div>
		</div>
	);
}
