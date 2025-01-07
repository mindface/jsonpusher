"use client";
import { useState } from "react";
import { Button } from "../../stories/Button/Button";
import { Input } from "../../stories/Input/Input";
import { Textarea } from "../../stories/TextArea/Textarea";

import { useStoreMemoery } from "../../store/memory";

import type { Memory } from "../../type/memory";

type Props = {
	type: string;
	item?: Memory;
};

export default function CMemoryTaskEdit(props: Props) {
	const { type, item } = props;
	const [memoryTaskTitle, memoryTaskTitleSet] = useState(item?.title ?? "");
	const [memoryTaskDetail, memoryTaskDetailSet] = useState(item?.detail ?? "");
	const { addMemory, updateMemory, deleteMemory } = useStoreMemoery();

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
			<div className="mb-4 pb-4 border-b">
				<Input
					type="text"
					value={memoryTaskTitle}
					className="w-full"
					outerClassName={type === "edit" ? "label-dark" : ""}
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
					className="w-full"
					outerClassName={type === "edit" ? "label-black" : ""}
					label="詳細"
					onChange={(value) => {
						memoryTaskDetailSet(value as string);
					}}
				/>
				<div className="pt-4 flex">
					<div className="pr-4">
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
					</div>
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
