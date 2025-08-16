"use client";
import { useState } from "react";
import { Button } from "../../stories/Button/Button";
import CommonModal from "./CommonModal";

import CMakeCycleIEdit from "./CMakeCycleIEdit";

import type { Cycle } from "../../type/cycle";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
	item: Cycle;
};

export default function CMakeCycleItem(props: Props) {
	const [itemView, itemViewSet] = useState(false);
	const { item } = props;

	const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } =
		useSortable({
			id: item.id,
		});

	const style = {
		margin: "10px",
		opacity: 1,
		color: "#333",
		background: "white",
		padding: "10px",
		transform: CSS.Transform.toString(transform),
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={["make-cycle-item", "p-2"].join(" ")}
		>
			<div className="flex justify-between">
				<span ref={setActivatorNodeRef} {...attributes} {...listeners}>
					+
				</span>
				<h4 className="next-plan-item__title pb-2">{item.title}</h4>
				<Button
					label={itemView ? "close" : "view edit"}
					size="small"
					className="text-black"
					onClick={() => {
						itemViewSet(!itemView);
					}}
				/>
			</div>
      <CommonModal
        isOpen={itemView}
        onClose={() => itemViewSet(false)}
        title="Make Cycle Edit"
      >
        <CMakeCycleIEdit
          type="edit"
          item={item}
          closeAction={() => itemViewSet(false)}
        />
      </CommonModal>
		</div>
	);
}
