"use client";
import { useState } from "react";
import { Button } from "../stories/Button/Button";
import { Dialog } from "../stories/Dialog/Dialog";
import { Textarea } from "../stories/TextArea/Textarea";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import { Loading } from "../stories/Loading/Loading";

import ContentPlanFeedback from "./ContentPlanFeedback";

import { useStoreHealthText } from "../store/healthText";
import { useStoreSportsText } from "../store/sportText";

import { fetchGeminiApi, fetchClaudeApi } from "../lib/fetchApiForAI";

import aiCredit from "../json/aiCredit.json";

export default function SectionQuestionAi() {
	const [useMachineLearningType, useMachineLearningSet] = useState("gemini");
	const [sendPrompt, sendPromptSet] = useState("");
	const [sendLoading, sendLoadingSet] = useState(false);
	const [_displayedChunks, _displayedChunksSet] = useState<string>("");
	const { sportsText } = useStoreSportsText();
	const { healthText } = useStoreHealthText();

	const textChange = (text: string) => {
		const regex1 = /\*\s\*\*(.*?)\*\*/g;
		const regex2 = /\*\*(.*?)\*\*/g;
		return text
			.replace(regex1, "<br /><br /><h2>$1</h2>")
			.replace(regex2, "<br /><h2>$1</h2>");
	};

	const fetchAIApi = async () => {
		let getText = "";
		sendLoadingSet(true);
		try {
			if(useMachineLearningType === "gemini" && getText !== null && typeof getText === "string") {
				getText = await fetchGeminiApi(sendPrompt);
			}else if(useMachineLearningType === "claude" && getText !== null && typeof getText === "string"){
				getText = await fetchClaudeApi(sendPrompt);	
			}
			console.log(getText);
			sendLoadingSet(false);
			_displayedChunksSet(textChange(getText));
		} catch (error) {
			console.log(error);
		}
	};

	const selectAiAction = (selectId: string) => {
		useMachineLearningSet(selectId);
	};

	const checkAiCredit = () => {
		if(aiCredit.includes(useMachineLearningType)) {
			return true;
		}else {
			return false;
		}
	}

	return (
		<section className="section-question-ai">
			<div className={[useMachineLearningType].join(" ")}>
				<div className="pb-2">
					<Titleline3h title={`ai [${useMachineLearningType}] に質問する`} />
					<div className="select-ai-box flex pb-4">
						<div className="pr-4">
							<Button
								label="Gemini"
								size="small"
								onClick={() => {
									selectAiAction("gemini");
								}}
							/>
						</div>
						<Button
							label="claude"
							size="small"
							onClick={() => {
								selectAiAction("claude");
							}}
						/>
					</div>
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
										{sportsText !== "" ? sportsText : "質問を作成してください。"}
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
										{healthText !== "" ? healthText : "質問を作成してください。"}
									</div>
								</Dialog>
							</div>
						</div>
					</div>
				</div>
				{ checkAiCredit() ?  
					<div className="pb-4">
						<div className="pb-8">
							<Textarea
								className="w-full"
								placeholder=""
								value={sendPrompt}
								onChange={(value) => {
									sendPromptSet(value as string);
								}}
							/>
						</div>
						<div className="pb-2">
							{sendLoading ?
								<Loading /> :
								<Button
									label="質問する"
									size="small"
									onClick={() => {
										fetchAIApi();
									}}
								/>}
						</div>
						<div className="view-content pb-4">
							<p className="pb-4">aiの返答が返ってきます。</p>
							{/* 出力するパタン次第で採用 */}
							{/* {displayedChunks.map((chunk, index) => (
								<div key={index} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px' }}>
									{chunk}
								</div>
							))} */}
							<div
								className="put-text p-8 border rounded-lg"
								dangerouslySetInnerHTML={{
									__html: _displayedChunks,
								}}
							/>
						</div>
					</div>
					:
					<div className="pb-4">
						<p>現在apiを使える資金がないため停止しています。
						</p>
					</div>}
			</div>
		</section>
	);
}
