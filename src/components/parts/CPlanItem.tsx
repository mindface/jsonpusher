"use client";
import { useState } from "react";
import { Button } from "../../stories/Button/Button";
import CommonModal from "./CommonModal";

import CPlanEdit from "./CPlanEdit";

import type { Plan } from "../../type/plan";

type Props = {
	item: Plan;
};

export default function CPlanItem(props: Props) {
	const [itemView, itemViewSet] = useState(false);
	const { item } = props;

	return (
		<div className={["plan-item", "p-2"].join(" ")}>
			<div className="flex justify-between">
				<h4 className={["plan-item__title", "p-2"].join(" ")}>{item.title}</h4>
				<Button
					label={itemView ? "close" : "view edit"}
					size="small"
					onClick={() => {
						itemViewSet(!itemView);
					}}
				/>
			</div>
      <CommonModal
        isOpen={itemView}
        onClose={() => itemViewSet(false)}
        title="Plan Edit"
      >
        <CPlanEdit
          type="edit"
          item={item}
          closeAction={() => itemViewSet(false)}
        />
      </CommonModal>
		</div>
	);
}
