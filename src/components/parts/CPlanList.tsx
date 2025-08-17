"use client";
import { useState } from "react";
import { Titleline3h } from "../../stories/Titleline3h/Titleline3h";
import type { Plan } from "../../type/plan";

import CPartsItem from "./CPartsItem";
import CommonModal from "./CommonModal";
import CPlanEdit from "./CPlanEdit";

type Props = {
	items: Plan[];
};

export default function CPlanList(props: Props) {
	const { items } = props;
	const [editId, setEditId] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const handleEdit = (id: string) => {
		setEditId(id);
		setModalOpen(true);
	};
	const handleClose = () => {
		setModalOpen(false);
		setEditId(null);
	};

	return (
		<div className="pb-4">
			<Titleline3h title="現在の計画内容" size="small" />
			{items.map((plan) => (
				<div key={`CPlanItem${plan.id}`} className="mb-2">
					<CPartsItem<Plan>
						item={plan}
						itemType="edit"
						renderTitle={(item) => item.title}
						onEdit={() => handleEdit(plan.id)}
					/>
				</div>
			))}
			<CommonModal
				isOpen={modalOpen}
				onClose={handleClose}
				title="Plan Edit"
			>
				{editId && (
					<CPlanEdit
						type="edit"
						item={items.find((p) => p.id === editId)!}
						closeAction={handleClose}
					/>
				)}
			</CommonModal>
		</div>
	);
}
