"use client";
import { useState } from "react";
import { Button } from "../../stories/Button/Button";
import { Input } from "../../stories/Input/Input";

import { useStoreCycle } from "../../features/cycle/store/cycleStore";

import type { Cycle } from "../../type/cycle";

type Props = {
	type: string;
	item?: Cycle;
  closeAction?: () => void;
};

export default function CMakeCycleIEdit(props: Props) {
	const { type, item, closeAction } = props;
	const [cycleTitle, cycleTitleSet] = useState(item?.title ?? "");
	const [cycleDetail, cycleDetailSet] = useState(item?.detail ?? "");
	const { addCycle, updateCycle, deleteCycle } = useStoreCycle();
  const modalCloseAction = closeAction ?? (() => {});

	const addCycleAction = () => {
		addCycle(cycleTitle, cycleDetail);
	};

	const updateCycleAction = () => {
		if (item?.id) {
			const updateItem = {
				id: item.id,
				title: cycleTitle,
				detail: cycleDetail,
				connectId: "0",
				userId: "0",
				groupId: "list1",
			};
			updateCycle(updateItem);
      modalCloseAction();
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
					outerClassName={type === "edit" ? "label-dark" : ""}
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
					outerClassName={type === "edit" ? "label-dark" : ""}
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
