"use client";
import { useState } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";

import { GeminiResponse } from "../type/apiResponse";

export default function Gemini() {
	const [sendTitle, sendTitleSet] = useState("");
	const [validationText, validationTextSet] = useState("");

	const fetchGeminiApi = async () => {
		const res = await fetch("/api/gamini",{
			method: "POST",
			body: JSON.stringify({ prompt: sendTitle })
		});
		const data: GeminiResponse = await res.json();
		if(data.status <= 200){
			console.log(data);
			validationTextSet(data.content);
		}
	}

	return (
		<div className={["gemini"].join(" ")}>
			<div className="pb-4">
				<Title3h title="gemini" />
			</div>
			<div className="pb-4">
				<div className="pb-2">
					<Input
						type="text"
						value={sendTitle}
						onChange={(value) => { sendTitleSet(value as string); }}
					/>
				</div>
				<div className="view-content">
					{validationText}
				</div>
				<div className="pb-2">
					<Button
						label="on"
					  onClick={() => { fetchGeminiApi(); }}
					/>
				</div>
			</div>
		</div>
	);
}
