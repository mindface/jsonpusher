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

import { DialogContent } from "./common/DialogContent";

// AIの設定を定数として分離
const AI_CONFIG = {
	TYPES: {
		GEMINI: "gemini" as const,
		CLAUDE: "claude" as const
	},
	BUTTONS: [
		{ label: "Gemini", type: "gemini" },
		{ label: "claude", type: "claude" }
	]
} as const;

type AIType = typeof AI_CONFIG.TYPES[keyof typeof AI_CONFIG.TYPES];

// AIの選択ボタンコンポーネント
const AISelectButton = ({ 
	label, 
	type, 
	onClick 
}: { 
	label: string; 
	type: string; 
	onClick: (type: string) => void;
}) => (
	<div className={type === "gemini" ? "pr-4" : ""}>
		<Button
			label={label}
			size="small"
			onClick={() => onClick(type)}
		/>
	</div>
);

// 質問フォームコンポーネント
const QuestionForm = ({
	value,
	onChange,
	onSubmit,
	isLoading
}: {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	isLoading: boolean;
}) => (
	<div className="pb-4">
		<div className="pb-8">
			<Textarea
				className="w-full"
				placeholder=""
				value={value}
				onChange={(value) => onChange(value as string)}
			/>
		</div>
		<div className="pb-2">
			{isLoading ? (
				<Loading />
			) : (
				<Button
					label="質問する"
					size="small"
					onClick={onSubmit}
				/>
			)}
		</div>
	</div>
);

export default function SectionQuestionAi() {
	const [machineLearningType, machineLearningSet] = useState<AIType>(AI_CONFIG.TYPES.GEMINI);
	const [sendPrompt, sendPromptSet] = useState("");
	const [sendLoading, sendLoadingSet] = useState(false);
	const [_displayedChunks, _displayedChunksSet] = useState<string>("");
	const { sportsText } = useStoreSportsText();
	const { healthText } = useStoreHealthText();

	// テキスト変換ロジックを純粋関数として分離
	const textChange = (text: string): string => {
		const REGEX_PATTERNS = {
			DOUBLE_ASTERISK_WITH_SPACE: /\*\s\*\*(.*?)\*\*/g,
			DOUBLE_ASTERISK: /\*\*(.*?)\*\*/g
		};

		return text
			.replace(REGEX_PATTERNS.DOUBLE_ASTERISK_WITH_SPACE, "<br /><br /><h2>$1</h2>")
			.replace(REGEX_PATTERNS.DOUBLE_ASTERISK, "<br /><h2>$1</h2>");
	};

	// API呼び出しロジックを改善
	const fetchAIApi = async () => {
		sendLoadingSet(true);
		try {
			const apiMap = {
				[AI_CONFIG.TYPES.GEMINI]: fetchGeminiApi,
				[AI_CONFIG.TYPES.CLAUDE]: fetchClaudeApi
			};

			const selectedApi = apiMap[machineLearningType];
			const getText = await selectedApi(sendPrompt);
			
			if (typeof getText === "string") {
				_displayedChunksSet(textChange(getText));
			}
		} catch (error) {
			console.error('AI API Error:', error);
		} finally {
			sendLoadingSet(false);
		}
	};

	const selectAiAction = (selectId: string) => {
		machineLearningSet(selectId as AIType);
	};

	// AIクレジットチェックを簡略化
	const checkAiCredit = () => aiCredit.includes(machineLearningType);

	return (
		<section className="section-question-ai">
			<div className={[machineLearningType].join(" ")}>
				<div className="pb-2">
					<Titleline3h title={`ai [${machineLearningType}] に質問する`} />
					<div className="select-ai-box flex pb-4">
						{AI_CONFIG.BUTTONS.map(({ label, type }) => (
							<AISelectButton
								key={type}
								label={label}
								type={type}
								onClick={selectAiAction}
							/>
						))}
					</div>
					<div className="pb-4">
						<div className="flex flex-wrap">
							<div className="mr-4">
								<DialogContent label="計画を確認する">
									<ContentPlanFeedback />
								</DialogContent>
							</div>
							<div className="mr-4">
								<DialogContent label="スポーツの質問テキストを確認する">
									{sportsText !== "" ? sportsText : "質問を作成してください。"}
								</DialogContent>
							</div>
							<div>
								<DialogContent label="健康の質問テキストを確認する">
									{healthText !== "" ? healthText : "質問を作成してください。"}
								</DialogContent>
							</div>
						</div>
					</div>
				</div>
				{checkAiCredit() ? (
					<>
						<QuestionForm
							value={sendPrompt}
							onChange={sendPromptSet}
							onSubmit={fetchAIApi}
							isLoading={sendLoading}
						/>
						<div className="view-content pb-4">
							<p className="pb-4">aiの返答が返ってきます。</p>
							<div
								className="put-text p-8 border rounded-lg"
								dangerouslySetInnerHTML={{
									__html: _displayedChunks,
								}}
							/>
						</div>
					</>
				) : (
					<div className="pb-4">
						<p>現在apiを使える資金がないため停止しています。</p>
					</div>
				)}
			</div>
		</section>
	);
}
