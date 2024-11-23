const { GoogleGenerativeAI } = require("@google/generative-ai");
import { NextResponse, type NextRequest } from "next/server";
import {
	sanitaizeText,
} from "../../../lib/convertString";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI);

export async function GET() {
	try {
		return NextResponse.json({ name: "Contact Api" });
	} catch (error) {
		throw error;
	}
}

export async function POST(reqest: NextRequest) {
	const { prompt } = await reqest.json();
	const _prompt = sanitaizeText(prompt);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const result = await model.generateContent(prompt);

	try {
		return NextResponse.json({ message: "Success", status: 200, content: result.response.text() });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Failed", status: 500, content: "no content" });
	}
}
