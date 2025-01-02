"use client";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import type { Memory } from "../type/memory";

import CMemoryTaskItem from "./CMemoryTaskItem";

type Props = {
	items: Memory[];
};

export default function CMemoryTaskList(props: Props) {
	const { items } = props;

	return (
		<div className="pt-4 pb-4">
			<Titleline3h title="記録内容一覧" size="small" />
			<div className="memory-task-item-wrapper">
				<div className={["memory-task-item", "p-2", "border-b", ""].join(" ")}>
					<div className="memory-task-item--inner">
						<ul className="list flex">
							<li className="item flex-grow">
								<h4 className={["memory-task-item__title", "p-2"].join(" ")}>タイトル</h4>
							</li>
							<li className="item w-[120px]">
								<time className="p-2 flex justify-center items-center">登録時期</time>
							</li>
							<li className="item w-[80px]">
							</li>
						</ul>
					</div>
				</div>
				{ items.length > 0 ?
					items.map((memory,index) => (
						<CMemoryTaskItem key={`CMemoryTaskItem${memory.id}${index}`} item={memory} />
					)) :
					<div className="p-4">タスクを登録してください。</div>
				}
			</div>
		</div>
	);
}
