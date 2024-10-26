"use client"
import { useState } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";
import { Textarea } from "../stories/TextArea/Textarea";

import CNextPlanEdit from "../components/CNextPlanEdit";
import CNextPlanList from "../components/CNextPlanList";

import { useStoreNextPlan } from "../store/planNext";

import type { Plan } from "../type/plan";

export default function SectionNextPlanEvaluation() {
	const { nextPlans, copyPlans } = useStoreNextPlan();
	const [planEvaluation,planEvaluationSet] = useState("");

	const copyTextAciton = () => {
		const columns = ["id", "title"];
		let formattedTable = "";

		const colWidths = columns.map(col => 
			Math.max(col.length, ...nextPlans.map(row => row[col as keyof Plan].length))
		);
		const header = columns.map((col, index) => col.padEnd(colWidths[index])).join(" | ");
		const separator = "-".repeat(header.length);
		const formattedRows = nextPlans.map(row => 
			columns.map((col, index) => row[col as keyof Plan].padEnd(colWidths[index])).join(" | ")
		);
		formattedTable = [separator, header, separator, ...formattedRows, separator].join("\n")

		const copyText = `${formattedTable}
		上記のように計画しています。
		-------------
		${planEvaluation}
		この評価を精査して、フィードバックしてください。`;

		navigator.clipboard
			.writeText(copyText)
			.then(() => {
				alert("コピーしました。");
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	}

	return (
		<section className="section-skill-comparison">
			<Title3h title="計画への評価について" size="large" />
			<div className="details">
				<p className="text pb-2">計画の評価を形成します。</p>
				<p className="text pb-4">自分で精査するための評価を記述します。</p>
				<Title3h title="計画の追加" size="small" />
				<div className="flex">
					<div className="pb-8">
						<CNextPlanEdit type="add" />
						<CNextPlanList items={nextPlans} />
					</div>
					<div className="p-8 pt-0">
						<div className="pb-2">計画に関する評価を記載してください。</div>
						<Textarea
							value={planEvaluation}
							onChange={(value) => { planEvaluationSet(value) }}
						/>
					</div>
				</div>
				<p className="text pb-8">
					<Button label="計画と評価を精査するテキストをコピーする" onClick={() => { copyTextAciton(); }} />
				</p>
				<p className="text pb-2">計画について評価しています。</p>
				<p className="text pb-2">AIに内容について精査してもらってください。</p>
			</div>
		</section>
	);
}
