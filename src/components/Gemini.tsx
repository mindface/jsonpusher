"use client";
import { useState } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";
import { Textarea } from "../stories/TextArea/Textarea";

import { GeminiResponse } from "../type/apiResponse";

export default function Gemini() {
	const baseTextSize = 300;
	const [sendTitle, sendTitleSet] = useState("");
	// const [validationText, validationTextSet] = useState("");
	// const [displayedChunks, displayedChunksSet] = useState<string[]>([]);
	const [_displayedChunks, _displayedChunksSet] = useState<string>("");

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
		return text.replace(regex1, "<br /><br /><h2>$1</h2>").replace(regex2, "<h2>$1</h2>");
	}

	const fetchGeminiApi = async () => {
		const res = await fetch("/api/gamini",{
			method: "POST",
			body: JSON.stringify({ prompt: sendTitle })
		});
		const data: GeminiResponse = await res.json();
		if(data.status <= 200){
			_displayedChunksSet(textChange(data.content));
			// validationTextSet(data.content);
		}
	}

	return (
		<div className={["gemini"].join(" ")}>
			<div className="">
				<Title3h title="aiに質問する" />
			</div>
			<div className="pb-4">
				<div className="pb-8">
					<Textarea
					  className="w-full"
						placeholder=""
					  value={sendTitle}
						onChange={(value) => { sendTitleSet(value as string); }}
					/>
				</div>
				<p className="pb-2">
					<Button
						label="質問する"
						size="small"
					  onClick={() => { fetchGeminiApi(); }}
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
					<div className="put-text"
						dangerouslySetInnerHTML={{
							__html: _displayedChunks
						}}
					></div>
				</div>
			</div>
		</div>
	);
}
