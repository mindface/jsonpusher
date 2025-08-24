"use client";
import { Titleline3h } from "../../stories/Titleline3h/Titleline3h";
import type { Memory } from "../../type/memory";

import CPartsItem from "./CPartsItem";
import CommonModal from "./CommonModal";
import CMemoryTaskEdit from "./CMemoryTaskEdit";
import { useState } from "react";
import { ForMatter } from "../../utils/formater";

type Props = {
	items: Memory[];
};

export default function CMemoryTaskList(props: Props) {
	const { items } = props;
	const [editId, setEditId] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const extractHtmlText = (htmlString: string): string => {
		const withoutTags = htmlString.replace(/<[^>]*>/g, '');
		const decodedText = withoutTags
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#039;/g, "'")
			.replace(/&nbsp;/g, ' ');
		return decodedText.substring(0, 92);
	};

	const handleEdit = (id: string) => {
		setEditId(id);
		setModalOpen(true);
	};

	const handleClose = () => {
		setModalOpen(false);
		setEditId(null);
	};

	return (
		<div className="pt-4 pb-4">
			<Titleline3h title="記録内容一覧" size="small" />
			<div className="memory-task-item-wrapper">
				<div className={["memory-task-item", "p-2", "border-b", ""].join(" ")}>
					<div className="memory-task-item--inner">
						<ul className="list flex">
							<li className="item flex-grow">
								<h4 className={["memory-task-item__title", "p-2"].join(" ")}>
									タイトル
								</h4>
							</li>
							<li className="item w-[120px]">
								<time className="p-2 flex justify-center items-center">
									登録時期
								</time>
							</li>
							<li className="item w-[80px]"></li>
						</ul>
					</div>
				</div>
				{items.length > 0 ? (
					items.map((memory, index) => (
						<CPartsItem<Memory>
							key={`CMemoryTaskItem${memory.id}${index}`}
							item={memory}
							itemType="edit"
							renderTitle={(item) => (
								<div className="flex items-center inline-block">
									<span className={["memory-task-item__title", "p-2"].join(" ")}>{item.title}</span>
									<span className="p-2 text-xs text-gray-500">
										{ForMatter.convertTimestampToDayjs(item.createAt)}
									</span>
								</div>
							)}
							renderDetails={(item) => (
								<span className="inline-block p-2">{extractHtmlText(item.detail || '')}</span>
							)}
							onEdit={() => handleEdit(String(memory.id))}
						/>
					))
				) : (
					<div className="p-4">タスクを登録してください。</div>
				)}
				<CommonModal
					isOpen={modalOpen}
					onClose={handleClose}
					title="Memory Task Edit"
				>
					{editId && (
						<CMemoryTaskEdit
							type="edit"
							item={items.find((item) => String(item.id) === editId)!}
							closeAction={handleClose}
						/>
					)}
				</CommonModal>
			</div>
		</div>
	);
}
