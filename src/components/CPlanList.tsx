"use client";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import type { Plan } from "../type/plan";

import CPlanItem from "./CPlanItem";

type Props = {
	items: Plan[];
};

export default function CPlanList(props: Props) {
	const { items } = props;

	return (
		<div className="pb-4">
			<Titleline3h title="現在の計画内容" size="small" />
			{items.map((plan) => (
			  <CPlanItem key={`CPlanItem${plan.id}`} item={plan} />
			))}
		</div>
	);
}
