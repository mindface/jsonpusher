import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse, type NextRequest } from "next/server";
// import {
// 	sanitaizeText,
// } from "../../../lib/convertString";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function GET() {
	try {
		return NextResponse.json({ name: "Contact Api" });
	} catch (error) {
		throw error;
	}
}

export async function POST(reqest: NextRequest) {
	const { prompt } = await reqest.json();
	// const _prompt = sanitaizeText(prompt);
	console.log(prompt);
	try {
		const result = await client.messages.create({
			model: "claude-3-5-sonnet-20241022",
			max_tokens: 1000,
			temperature: 0,
			system: "短い詩でのみ応答してください。",
			messages: [
				{
					"role": "user",
					"content": [
						{
							"type": "text",
							"text": prompt
						}
					]
				}
			]
		});
		console.log('Response:', result.content);
		return NextResponse.json({ message: "Success", status: 200, content: result.content });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Failed", status: 500, content: "no content" });
	}
}
