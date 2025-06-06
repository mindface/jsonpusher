"use client";
import { useState } from "react";
import { Button } from "../stories/Button/Button";
import { Dialog } from "../stories/Dialog/Dialog";
import { Textarea } from "../stories/TextArea/Textarea";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";

import ContentPlanFeedback from "./ContentPlanFeedback";

import { useStoreHealthText } from "../features/healthText/store/healthTextStore";
import { useStoreSportsText } from "../features/sportText/store/sportTextStore";

import type { GeminiResponse } from "../type/apiResponse";

export default function SectionQuestionAi() {
	// const baseTextSize = 300;
	const [useMachineLearningType] = useState("gemini");
	const [sendTitle, sendTitleSet] = useState("");
	// const [validationText, validationTextSet] = useState("");
	// const [displayedChunks, displayedChunksSet] = useState<string[]>([]);
	const [_displayedChunks, _displayedChunksSet] = useState<string>("");
	const { sportsText } = useStoreSportsText();
	const { healthText } = useStoreHealthText();

	// const setTextAction = (text: string) => {
	// 	const chunks: string[] = [];
	// 	let counter = 0;
	// 	for (let index = 0; index < text.length; index += baseTextSize) {
	// 		chunks.push(text.slice(index,index + baseTextSize));
	// 	}

	// 	const timer = setInterval(() => {
	// 		if(chunks.length >= counter ) {
	// 			displayedChunksSet((prevChunks) => {
	// 				return [...prevChunks, chunks[counter-1]];
	// 			});
	// 		}else {
	// 			clearInterval(timer);
	// 		}
	// 		counter++;
	// 	}, 800);
	// }

	const textChange = (text: string) => {
		const regex1 = /\*\s\*\*(.*?)\*\*/g;
		const regex2 = /\*\*(.*?)\*\*/g;
		return text
			.replace(regex1, "<br /><br /><h2>$1</h2>")
			.replace(regex2, "<h2>$1</h2>");
	};

	const fetchGeminiApi = async () => {
		const res = await fetch("/api/gemini", {
			method: "POST",
			body: JSON.stringify({ prompt: sendTitle }),
		});
		const data: GeminiResponse = await res.json();
		if (data.status <= 200) {
			_displayedChunksSet(textChange(data.content));
			// validationTextSet(data.content);
		}
	};

	return (
		<section className="section-question-ai">
			<div className={[useMachineLearningType].join(" ")}>
				<div className="pb-2">
					<Titleline3h title="ai [Gemini(google)] に質問する" />
					<div className="pb-4">
						<div className="flex flex-wrap">
							<div className="mr-4">
								<Dialog
									label="計画を確認する"
									type="button"
									className=""
									onChange={() => {}}
								>
									<ContentPlanFeedback />
								</Dialog>
							</div>
							<div className="mr-4">
								<Dialog
									label="スポーツの質問テキストを確認する"
									type="button"
									onChange={() => {}}
								>
									<div className="p-8">
										{sportsText !== ""
											? sportsText
											: "質問を作成してください。"}
									</div>
								</Dialog>
							</div>
							<div>
								<Dialog
									label="健康の質問テキストを確認する"
									type="button"
									onChange={() => {}}
								>
									<div className="p-8">
										{healthText !== ""
											? healthText
											: "質問を作成してください。"}
									</div>
								</Dialog>
							</div>
						</div>
					</div>
				</div>
				<div className="pb-4">
					<div className="pb-8">
						<Textarea
							className="w-full"
							placeholder=""
							value={sendTitle}
							onChange={(value) => {
								sendTitleSet(value as string);
							}}
						/>
					</div>
					<p className="pb-2">
						<Button
							label="質問する"
							size="small"
							onClick={() => {
								fetchGeminiApi();
							}}
						/>
					</p>
					<div className="view-content pb-4">
						<p className="pb-4">aiの返答が返ってきます。</p>
						{/* 出力するパタン次第で採用 */}
						{/* {displayedChunks.map((chunk, index) => (
							<div key={index} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px' }}>
								{chunk}
							</div>
						))} */}
						<div
							className="put-text"
							dangerouslySetInnerHTML={{
								__html: _displayedChunks,
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
