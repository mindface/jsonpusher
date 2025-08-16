"use client";
import { useState } from "react";
import { Button } from "../../stories/Button/Button";
import CommonModal from "./CommonModal";

import dynamic from "next/dynamic";
const CMemoryTaskEdit = dynamic(() => import("./CMemoryTaskEdit"), {ssr: false});
// import CMemoryTaskEdit from "./CMemoryTaskEdit";

import type { Memory } from "../../type/memory";

import { ForMatter } from "../../utils/formater";

type Props = {
	item: Memory;
};

export default function CMemoryTaskItem(props: Props) {
	const [itemView, itemViewSet] = useState(false);
	const { item } = props;

	return (
		<div className={["memory-task-item", "p-2"].join(" ")}>
			<div className="memory-task-item--inner">
				<ul className="list flex">
					<li className="item flex-grow">
						<h4 className={["memory-task-item__title", "p-2"].join(" ")}>
							{item.title}
						</h4>
					</li>
					<li className="item w-[120px]">
						<time
							className="p-2 flex justify-center items-center"
							dateTime={ForMatter.convertTimestampToDayjs(item.createAt)}
						>
							{ForMatter.convertTimestampToDayjs(item.createAt)}
						</time>
					</li>
					<li className="item w-[80px]">
						<Button
							label={itemView ? "close" : "view edit"}
							size="small"
							onClick={() => {
								itemViewSet(!itemView);
							}}
						/>
					</li>
				</ul>
			</div>
      <CommonModal
        isOpen={itemView}
        onClose={() => itemViewSet(false)}
        title="Memory Task Edit"
      >
        <CMemoryTaskEdit
          type="edit"
          item={item}
          closeAction={() => itemViewSet(false)}
        />
      </CommonModal>
		</div>
	);
}
