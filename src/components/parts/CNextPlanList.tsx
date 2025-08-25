import { Titleline3h } from "../../stories/Titleline3h/Titleline3h";
import type { Plan } from "../../type/plan";

import CPartsItem from "./CPartsItem";
import CommonModal from "./CommonModal";
import CNextPlanEdit from "./CNextPlanEdit";
import { useState } from "react";

type Props = {
	items: Plan[];
};

export default function CNextPlanList(props: Props) {
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
			<Titleline3h title="次の計画の内容" size="small" />
			{items.map((plan) => (
				<CPartsItem<Plan>
					key={`CNextPlanItem${plan.id}`}
					item={plan}
					itemType="edit"
					renderTitle={(item) => item.title}
					renderDetails={(item) => item.details}
					onEdit={() => handleEdit(String(plan.id))}
				/>
			))}
			<CommonModal isOpen={modalOpen} onClose={handleClose} title="Next Plan Edit">
				{editId && (
					<CNextPlanEdit
						type="edit"
						colorType="dark"
						item={items.find((p) => String(p.id) === editId)!}
						closeAction={handleClose}
					/>
				)}
			</CommonModal>
		</div>
	);
}
