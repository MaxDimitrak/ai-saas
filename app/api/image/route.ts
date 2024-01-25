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
		const { prompt, amount = 1, resolution = "512x512" } = await req.json()
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 })
		}
		if (!prompt) {
			return new NextResponse("Prompt is required", { status: 400 })
		}
		if (!amount) {
			return new NextResponse("Amount is required", { status: 400 })
		}
		if (!resolution) {
			return new NextResponse("Resolution is required", { status: 400 })
		}
		if (!openai) {
			return new NextResponse("The server had an error while processing your request", { status: 500 })
		}



		const response = await openai.images.generate({
			prompt,
			size: resolution,
			n: parseInt(amount, 10)
		})

		console.log(response)
		return NextResponse.json(response.data);
	} catch (error) {
		console.error("[IMAGE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}