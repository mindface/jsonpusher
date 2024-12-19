"use client";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import { Cycle } from "../type/cycle";

import CMakeCycleItem from "./CMakeCycleItem";

type Props = {
	items: Cycle[];
};

export default function CMakeCycleList(props: Props) {
	const { items } = props;

	return (
		<div className="pb-4">
			<Titleline3h title="フレームワークの作成に関して" size="small" />
			{items.map((cycle) => (
				<CMakeCycleItem key={`CPlanItem${cycle.id}`} item={cycle} />
			))}
		</div>
	);
}
