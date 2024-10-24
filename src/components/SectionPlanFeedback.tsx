"use client"
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";

import CPlanEdit from "../components/CPlanEdit";
import CNextPlanEdit from "../components/CNextPlanEdit";
import CPlanList from "../components/CPlanList";
import CNextPlanList from "../components/CNextPlanList";

import { useStorePlan } from "../store/plan";
import { useStoreNextPlan } from "../store/planNext";

export default function SectionPlanFeedback() {
	const { plans } = useStorePlan();
	const { nextPlans, copyPlans } = useStoreNextPlan();

	const copyAciton = () => {
		copyPlans(plans);
	}

	const copyJsonAciton = () => {
		navigator.clipboard
			.writeText(JSON.stringify(plans))
			.then(() => {
				alert("コピーしました。");
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	}

	return (
		<section className="section-skill-comparison">
			<Title3h title="計画のフィードバック" size="large" />
			<div className="details">
				<p className="text pb-2">計画の設計していくことになります。</p>
				<p className="text pb-2">自分でどの状況で効果的になっていくかを考えることを評価することになります。</p>
				<p className="text pb-10"></p>
				<Title3h title="計画の追加" size="small" />
				<div className="flex">
					<div className="pb-8 pr-8">
						<CPlanEdit type="add" />
						<CPlanList items={plans} />
						<Button label="次の計画にコピーする" onClick={() => { copyAciton(); }} />
						<Button label="jsonをコピーする" onClick={() => { copyJsonAciton(); }} />
					</div>
					<div className="pb-8">
						<CNextPlanEdit type="add" />
						<CNextPlanList items={nextPlans} />
					</div>
				</div>
				<p className="text pb-2">比較して計画を設計して更新していく。</p>
				<p className="text pb-2">健康でも計画を比較して、フィードバック構造を考えていくので参考にしてみてください。</p>
			</div>
		</section>
	);
}
