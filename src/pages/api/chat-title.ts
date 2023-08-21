import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { CHAT_TITLE_MODEL, GPT_TEMPERATURE, CHAT_TITLE_GENERATOR_PROMPT} from "@/constants";
import { OpenAI } from "openai-streams";

/*
 * This is the API endpoint for chat title generation.
 * It is called when the user have no title for the chat and send first message.
 * It uses the OpenAI API to generate a title for the chat.
 */
const handler = async (req: NextRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(405).json({ message: 'Method not allowed' });

	const { firstMessage } = await req.json() as {
		firstMessage: string;
	};

	const stream = await OpenAI(
	"completions",
	{
		prompt: CHAT_TITLE_GENERATOR_PROMPT.replace('{firstMessage}', firstMessage),
		model: CHAT_TITLE_MODEL,
		temperature: GPT_TEMPERATURE,
	},
	{ apiKey: process.env.OPENAI_KEY }
	);

	return new Response(stream);
};

/* 
	 * This is the configuration for the serverless function.
	 * It tells Next.js to use the "edge" runtime, which means
	 * that the function will be executed on the serverless
*/ 
export const config = {
	runtime: "edge",
};

export default handler;
