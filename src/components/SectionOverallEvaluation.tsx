"use client";
import { useState } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { InputRange } from "../stories/InputRange/InputRange";
import { Textarea } from "../stories/TextArea/Textarea";
import { Button } from "../stories/Button/Button";
import { Dialog } from "../stories/Dialog/Dialog";

import menuInfoList from "../json/menuInfoList.json";
import modelTextList from "../json/modelTextList.json";

type EvaluationType = {
	[key: string]: number;
};

export default function SectionOverallEvaluation() {
	const initialEvaluationObjState: EvaluationType = Object.fromEntries(
		menuInfoList.map((item) => [item.pathId, 0]),
	);
	const [evaluationText, evaluationTextSet] = useState("");
	const [evaluationObj, evaluationObjSet] = useState<EvaluationType>(
		initialEvaluationObjState,
	);

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
	};

	return (
		<section className="section-level-up">
			<Title3h title="自分が評価したことを分析する" size="large" />
			<div className="details">
				<div className="text pb-4">
					自分で考えた改善方法を評価してみましょう。
				</div>
				<div className="details-menu-evaluation flex p-8 pb-4 pl-0">
					<div className="details-menu-list mr-8 p-4 border rounded-lg">
						{menuInfoList.map((menuItem, index) => (
							<div
								key={`overallEvaluation${menuItem.pathId}`}
								className={[
									"p-2",
									menuInfoList.length === index + 1 ? "" : "border-b",
								].join(" ")}
							>
								{menuItem.name}
								<div className="flex">
									<InputRange
										value={evaluationObj[menuItem.pathId]}
										max={100}
										onChange={(value) => {
											evaluationObjSet({
												...evaluationObj,
												[menuItem.pathId]: Number(value),
											});
										}}
									/>
									<span className="text-4xl text-slate-500 dark:text-slate-300">
										{evaluationObj[menuItem.pathId]}
									</span>
								</div>
							</div>
						))}
					</div>
					<div className="details-menu-evaluation-input">
						<div className="pt-2 pb-4">
							評価した項目で向上した内容、あるいは悪くなった
							<br />
							<div className="inline-block relative">
								検証効果を分析してみてください。
								<div className="absolute bottom-0 -right-8">
									<Dialog label="+" type="icon">
										<p className="pb-2">分析テキストのモデルです。</p>
										<p className="pb-2">
											追加して加工した上で、AIに質問してみてください。
										</p>
										<div className="text-model__box">
											<ul className="text-model--list pt-4">
												{modelTextList.map((item) => (
													<li
														className="text-model--item inline-block p-2"
														key={item.modelId}
													>
														<Button
															label={item.label}
															onClick={() => {
																if (evaluationText !== "") {
																	evaluationTextSet(
																		`${evaluationText} \n\n ${item.modelInfo}`,
																	);
																} else {
																	evaluationTextSet(`${item.modelInfo}`);
																}
															}}
														/>
													</li>
												))}
											</ul>
										</div>
									</Dialog>
								</div>
							</div>
						</div>
						<Textarea
							value={evaluationText}
							onChange={(value) => {
								evaluationTextSet(value);
							}}
							cols={34}
							placeholder="意識するポイントを明確な目印と数値を規定して、再現性ある情報化した。"
						/>
						<p className="pt-4 pb-4">
							<Button
								label="評価と分析内容をコピーする"
								onClick={() => {
									copyExperience();
								}}
							/>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
