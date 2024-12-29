import type { GeminiResponse } from "../type/apiResponse";

export const fetchGeminiApi = async (sendPrompt: string): Promise<string> => {
	try {
		const res = await fetch("/api/gemini", {
			method: "POST",
			body: JSON.stringify({ prompt: sendPrompt }),
		});
		const data: GeminiResponse = await res.json();
		if (data.status <= 200) {
			return data.content;
		}
	} catch(error) {
		console.error(error);
	}
	return "no work api";
};

export const fetchClaudeApi = async (sendPrompt: string): Promise<string> => {
	try {
		const res = await fetch("/api/claude", {
			method: "POST",
			body: JSON.stringify({ prompt: sendPrompt }),
		});
		const data = await res.json();
		console.log(data)
		if (data.status <= 200) {
			return data.content;
		}
	} catch(error) {
		console.error(error);
	}
	return "no work api";
};


