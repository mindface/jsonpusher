import { GoogleGenerativeAI } from "@google/generative-ai";
import { type NextRequest, NextResponse } from "next/server";
import { sanitaizeText } from "../../../utils/convertString";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI ?? "");

export async function GET() {
	try {
		return NextResponse.json({ name: "Contact Api" });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function POST(reqest: NextRequest) {
	const { prompt } = await reqest.json();
	const _prompt = sanitaizeText(prompt);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const result = await model.generateContent(_prompt);

	try {
		return NextResponse.json({
			message: "Success",
			status: 200,
			content: result.response.text(),
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			message: "Failed",
			status: 500,
			content: "no content",
		});
	}
}
