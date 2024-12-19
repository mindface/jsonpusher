import { Titleline3h } from "../stories/Titleline3h/Titleline3h";

import ContentPlanFeedback from "./ContentPlanFeedback";

export default function SectionPlanFeedback() {

	return (
		<section className="section-skill-comparison">
			<Titleline3h title="計画のフィードバック" size="large" />
			<div className="details">
				<p className="text pb-2">計画の設計していくことになります。</p>
				<p className="text pb-10">
					自分でどの状況で効果的になっていくかを考えることを評価することになります。
				</p>
				<ContentPlanFeedback />
				<p className="text pb-2">比較して計画を設計して更新していきます。</p>
				<p className="text pb-2">
					健康でも計画を比較して、フィードバック構造を考えてみてください。
				</p>
			</div>
		</section>
	);
}
