"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "../../stories/Button/Button";
import CommonModal from "./CommonModal";

import CNextPlanEdit from "./CNextPlanEdit";

import type { Plan } from "../../type/plan";

type Props = {
	item: Plan;
  closeAction: () => void;
};

export default function CNextPlanItem(props: Props) {
	const [itemView, itemViewSet] = useState(false);
	const [editClass, editClassSet] = useState("left-0");
	const { item, closeAction } = props;
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const taget = divRef.current?.getBoundingClientRect();
		if (taget && taget?.left > window.innerWidth / 2) {
			editClassSet("right-0");
		}
	}, []);

	return (
		<div className={["next-plan-item", "p-2"].join(" ")}>
			<div className="flex justify-between">
				<h4 className="next-plan-item__title pb-2">{item.title}</h4>
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
        title="Next Plan Edit"
      >
        <CNextPlanEdit
          type="edit"
          item={item}
          closeAction={() => itemViewSet(false)}
        />
      </CommonModal>			
		</div>
	);
}
