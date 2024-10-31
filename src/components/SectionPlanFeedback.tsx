"use client"
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";

import CPlanEdit from "../components/CPlanEdit";
import CNextPlanEdit from "../components/CNextPlanEdit";
import CPlanList from "../components/CPlanList";
import CNextPlanList from "../components/CNextPlanList";

import { useStorePlan } from "../store/plan";
import { useStoreNextPlan } from "../store/planNext";

import type { Plan } from "../type/plan";

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

	const copyTextAciton = (type: string) => {
		const columns = ["id", "title", "details", "connectId"];
		let formattedTable = "";
		if(type === "1") {
			const colWidths = columns.map(col => 
				Math.max(col.length, ...plans.map(row => row[col as keyof Plan].length))
			);
			const header = columns.map((col, index) => col.padEnd(colWidths[index])).join(" | ");
			const separator = "-".repeat(header.length);
			const formattedRows = plans.map(row => 
				columns.map((col, index) => row[col as keyof Plan].padEnd(colWidths[index])).join(" | ")
			);
			formattedTable = [separator, header, separator, ...formattedRows, separator].join("\n")
		}

		if(type === "2") {
			const colWidths = columns.map(col => 
				Math.max(col.length, ...nextPlans.map(row => row[col as keyof Plan].length))
			);
			const header = columns.map((col, index) => col.padEnd(colWidths[index])).join(" | ");
			const separator = "-".repeat(header.length);
			const formattedRows = nextPlans.map(row => 
				columns.map((col, index) => row[col as keyof Plan].padEnd(colWidths[index])).join(" | ")
			);
			console.log(colWidths);
			formattedTable = [separator, header, separator, ...formattedRows, separator].join("\n")
		}
		
		navigator.clipboard
			.writeText(formattedTable)
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
				<p className="text pb12">自分でどの状況で効果的になっていくかを考えることを評価することになります。</p>
				<Title3h title="計画の追加" size="small" />
				<div className="flex">
					<div className="pb-8 pr-8">
						<CPlanEdit type="add" />
						<CPlanList items={plans} />
					</div>
					<div className="pb-8">
						<CNextPlanEdit type="add" />
						<CNextPlanList items={nextPlans} />
					</div>
				</div>
				<div className="action-btns pb-4">
					<p className="pb-2"><Button label="現在の計画を次の計画にコピーする" onClick={() => { copyAciton(); }} /></p>
					<p className="pb-2"><Button label="jsonをコピーする" onClick={() => { copyJsonAciton(); }} /></p>
					<div className="flex">
						<p className="pr-2">
							<Button label="計画1のテキストをコピーする" onClick={() => { copyTextAciton("1"); }} />
						</p>
						<Button label="計画2のテキストをコピーする" onClick={() => { copyTextAciton("2"); }} />
					</div>
				</div>
				<p className="text pb-2">比較して計画を設計して更新していく。</p>
				<p className="text pb-2">健康でも計画を比較して、フィードバック構造を考えていくので参考にしてみてください。</p>
			</div>
		</section>
	);
}
