
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(
	req: Request,
) {
	try {
		const { userId } = auth();
		const { messages } = await req.json()
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 })
		}
		if (!messages) {
			return new NextResponse("Messages are required", { status: 400 })
		}
		if (!openai) {
			return new NextResponse("The server had an error while processing your request", { status: 500 })
		}

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{
				role: 'system',
				content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",

			}, ...messages]
		})

		return NextResponse.json(response.choices[0].message);
	} catch (error) {
		console.error("[CONVERSATION_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}