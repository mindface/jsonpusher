import { Title3h } from "../stories/Title3h/Title3h";
import { Plan } from "../type/plan";

import CNextPlanItem from "./CNextPlanItem";

type Props = {
	items: Plan[];
};

export default function CNextPlanList(props: Props) {
	const { items } = props;

	return (
		<div className="pb-4">
			<Title3h title="次の計画の内容" size="small" />
			{items.map((plan) => (
				<CNextPlanItem key={`CNextPlanItem${plan.id}`} item={plan} />
			))}
		</div>
	);
}
