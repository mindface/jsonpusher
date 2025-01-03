"use client";
import { useEffect, useState } from "react";
import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";
import { Textarea } from "../stories/TextArea/Textarea";

import { useStoreMemoery } from "../store/memory";

import type { Memory } from "../type/memory";

type Props = {
	type: string;
	item?: Memory;
};

export default function CMemoryTaskEdit(props: Props) {
	const [memoryTaskTitle, memoryTaskTitleSet] = useState("");
	const [memoryTaskDetail, memoryTaskDetailSet] = useState("");
	const { addMemory, updateMemory, deleteMemory } = useStoreMemoery();
	const { type, item } = props;

	useEffect(() => {
		if (type === "edit" && item?.title && item?.detail) {
			memoryTaskTitleSet(item?.title);
			memoryTaskDetailSet(item?.detail);
		}
	}, [type, item?.title, item?.detail]);

	const addPlanAction = () => {
		addMemory(memoryTaskTitle, memoryTaskDetail);
	};

	const updatePlanAction = () => {
		if (item?.id && item?.connectId) {
			const updateItem = {
				...item,
				title: memoryTaskTitle,
				detail: memoryTaskDetail,
			};
			updateMemory(updateItem);
		}
	};

	const deletePlanAction = () => {
		if (item) {
			deleteMemory(item);
		}
	};

	return (
		<div className="pb-4">
			<div className="pb-2">
				<Input
					type="text"
					value={memoryTaskTitle}
					className={type === "edit" ? "label-dark" : ""}
					label="タイトル"
					onChange={(value) => {
						memoryTaskTitleSet(value as string);
					}}
					max={1000}
				/>
			</div>
			<div className="pb-2">
				<Textarea
					value={memoryTaskDetail}
					outerClassName={type === "edit" ? "label-black" : ""}
					label="詳細"
					onChange={(value) => {
						memoryTaskDetailSet(value as string);
					}}
				/>
				<div className="pt-8">
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
		</div>
	);
}
