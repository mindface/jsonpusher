"use client"
import { useState, useMemo, useEffect } from "react";
import { useStorePlan } from "../store/plan";
import { Title3h } from "../stories/title3h/Title3h";
import { Plan } from "../type/plan";

import CPlanItem from "./CPlanItem";

type Props = {
	items: Plan[];
}

export default function CPlanList(props: Props) {
	const { items } = props;

	return (
		<div className="pb-4">
			<Title3h title="現在の計画内容" size="small" />
			{items.map((plan) => <CPlanItem key={`CPlanItem${plan.id}`} item={plan} />)}
		</div>
	);
}
