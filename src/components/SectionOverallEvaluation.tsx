"use client";
import { useState } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { InputRange } from "../stories/InputRange/InputRange";
import { Textarea } from "../stories/TextArea/Textarea";
import { Button } from "../stories/Button/Button";
import { Dialog } from "../stories/Dialog/Dialog";

import SectionValuationAssessment from "./SectionValuationAssessment";
import ContentDetailsMenuEvaluation from "./ContentDetailsMenuEvaluation";

import { copyClipbord } from "../lib/copyClipbord";

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
	const [leaveNumber,leaveNumberSet] = useState(0);
	const [evaluationObj, evaluationObjSet] = useState<EvaluationType>(
		initialEvaluationObjState,
	);

	const copyExperience = () => {
		let copyText = "";
		menuInfoList.forEach((menuItem) => {
			if(leaveNumber <= (evaluationObj[menuItem.pathId])) {
				copyText += `${menuItem.name} ${evaluationObj[menuItem.pathId]} \n\n`;
			}
		});
		copyText += "\n\n";
		copyText += evaluationText;
		copyClipbord(copyText);
	};

	return (
		<section className="section-level-up">
			<Title3h title="自分が評価したことを分析する" size="large" />
			<div className="details">
				<div className="text flex pb-4">
					自分で考えた改善方法を評価してみましょう。
					<Dialog label="?" type="icon">
						<SectionValuationAssessment />
					</Dialog>
				</div>
				<div className="details-menu-evaluation md:flex p-8 pb-4 pl-0">
					<ContentDetailsMenuEvaluation
						leaveNumber={leaveNumber}
						menuInfoList={menuInfoList}
						evaluationObj={evaluationObj}
						onEvaluationObjSet={(obj) => { evaluationObjSet(obj); }}
					/>
					<div className="details-menu-evaluation-input md:w-[50%]">
						<div className="pt-4 md:pt-2 pb-4">
							評価した項目で向上した内容、あるいは悪くなった
							<br className="hidden md:block" />
							<div className="inline-block relative">
								効果の検証について分析してみてください。
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
						<div className="reave pb-4">
							<p className="pt-4 pb-2">数値で残す項目を決める</p>
							<div className="flex">
								<InputRange
									value={leaveNumber}
									max={100}
									onChange={(value) => {
										leaveNumberSet(Number(value));
									}}
								/>
								<span className="text-4xl text-slate-500 dark:text-slate-300">
									{ leaveNumber }
								</span>
							</div>
						</div>
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
