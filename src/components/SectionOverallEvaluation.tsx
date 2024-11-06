"use client"
import { useState } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { InputRange } from "../stories/InputRange/InputRange";
import { Textarea } from "../stories/TextArea/Textarea";
import { Button } from "../stories/Button/Button";

import menuInfoList from "../json/menuInfoList.json";

type EvaluationType = {
	[key: string]: number;
};

export default function SectionOverallEvaluation() {
	const initialEvaluationObjState: EvaluationType = Object.fromEntries(
    menuInfoList.map((item) => [item.pathId, 0])
	);
	const [evaluationText,evaluationTextSet] = useState("");
	const [evaluationObj,evaluationObjSet] = useState<EvaluationType>(initialEvaluationObjState);
	
	const copyExperience = () => {
		let copyText = "";
		menuInfoList.map((menuItem) => {
			copyText += `${menuItem.name} ${evaluationObj[menuItem.pathId]} \n\n`;
		});
		copyText += "\n\n";
		copyText += evaluationText;
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
		<section className="section-level-up">
			<Title3h title="自分が評価したことを分析する" size="large" />
			<div className="details">
				<p className="text pb-2">自分で考えた改善方法を評価してみましょう。</p>
				<p className="text pb-2"></p>
				<div className="details-menu-evaluation flex p-8 pb-4">
					<div className="details-menu-list pr-8">
						{menuInfoList.map((menuItem) => <div key={`overallEvaluation${menuItem.pathId}`} className="p-2">
							{menuItem.name}
							<div className="flex">
								<InputRange
									value={evaluationObj[menuItem.pathId]}
									max={100}
									onChange={(value) => { evaluationObjSet({...evaluationObj, [menuItem.pathId]: Number(value)}) }}
								/>
								<span className="text-5xl text-slate-500 dark:text-slate-300">{ evaluationObj[menuItem.pathId] }</span>
							</div>
						</div>)}
					</div>
					<div className="details-menu-evaluation-input">
						<p className="pt-2 pb-4">評価した項目で向上した内容、あるいは悪くなった<br />検証効果を分析してみてください。</p>
						<Textarea value={evaluationText} onChange={(value) => { evaluationTextSet(value); }} />
						<p className="pt-4 pb-4">
							<Button label="評価と分析内容をコピーする" onClick={() => { copyExperience() }} />
						</p>
					</div>
				</div>
				<p className="text pb-2"></p>
				<p className="text pb-2"></p>
				<p className="text pb-2"></p>
			</div>
		</section>
	);
}
