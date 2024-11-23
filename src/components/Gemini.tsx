"use client";
import { useState } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";
import { Textarea } from "../stories/TextArea/Textarea";

import { GeminiResponse } from "../type/apiResponse";

export default function Gemini() {
	const baseTextSize = 300;
	const [sendTitle, sendTitleSet] = useState("");
	const [validationText, validationTextSet] = useState("");
	const [displayedChunks, displayedChunksSet] = useState<string[]>([]);

	const setTextAction = (text: string) => {
		const chunks: string[] = [];
		let counter = 0;
		for (let index = 0; index < text.length; index += baseTextSize) {
			chunks.push(text.slice(index,index + baseTextSize));
		}

		const timer = setInterval(() => {
			if(chunks.length >= counter ) {
				displayedChunksSet((prevChunks) => {
					return [...prevChunks, chunks[counter-1]];
				});
			}else {
				clearInterval(timer);
			}
			counter++;
		}, 800);
	}

	const fetchGeminiApi = async () => {
		const res = await fetch("/api/gamini",{
			method: "POST",
			body: JSON.stringify({ prompt: sendTitle })
		});
		const data: GeminiResponse = await res.json();
		if(data.status <= 200){
			setTextAction(data.content);
			validationTextSet(data.content);
		}
	}

	return (
		<div className={["gemini"].join(" ")}>
			<div className="">
				<Title3h title="aiに質問する" />
			</div>
			<div className="pb-4">
				<div className="pb-4 flex">
					<Input
						type="text"
						value={sendTitle}
						onChange={(value) => { sendTitleSet(value as string); }}
					/>
					<Button
						label="質問"
						size="small"
					  onClick={() => { fetchGeminiApi(); }}
					/>
				</div>
				<div className="view-content pb-4">
					<Textarea
					  className="w-full"
						placeholder="aiの返答が返ってきます。"
					  value={validationText}
					/>
					{displayedChunks.map((chunk, index) => (
						<div key={index} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px' }}>
							{chunk}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}