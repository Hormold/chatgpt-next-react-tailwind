import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import generatePrompt from "@/utils/prompt-generator";
import { PostRequest } from "@/types";
import { DEFAULT_MODEL, GPT_TEMPERATURE } from "@/constants";
import { OpenAI } from "openai-streams";

/*
	* This is the API endpoint for chat message generation.
	* It is called when the user send a message.
	* It uses the OpenAI API to generate a response to the message in streaming mode.
	* Before generating the response, it generates a prompt from the previous messages and the new message.
*/
const handler = async (req: NextRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}
	const { previousMessages, content } = await req.json() as PostRequest;
	const stream = await OpenAI(
	"chat",
	{
		messages: await generatePrompt(previousMessages, content), // Generate prompt from previous messages and new content
		model: DEFAULT_MODEL,
		temperature: GPT_TEMPERATURE,
	},
	{ apiKey: process.env.OPENAI_KEY }
	);

	return new Response(stream);
};

export const config = {
	runtime: "edge",
};
export default handler;
