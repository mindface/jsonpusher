import { Titleline3h } from "../../stories/Titleline3h/Titleline3h";
import type { Plan } from "../../type/plan";

import CNextPlanItem from "./CNextPlanItem";

type Props = {
	items: Plan[];
};

export default function CNextPlanList(props: Props) {
	const { items } = props;

	return (
		<div className="pb-4">
			<Titleline3h title="次の計画の内容" size="small" />
			{items.map((plan) => (
				<CNextPlanItem key={`CNextPlanItem${plan.id}`} item={plan} />
			))}
		</div>
	);
}
