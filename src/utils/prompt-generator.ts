import { GPT3_LIMIT, SYSTEM_MESSAGE, ANSWER_BUFFER } from "@/constants"
import getTokensCount from "@/utils/tiktoken"
import { MessageType } from "@/types"

/* 
	* This function limits the number of tokens in the messages array.
	* It removes the first message after system prompt if the limit is exceeded.
	* It is used to generate a prompt for the OpenAI API.
 */
const limitArrayOfMessages = async (
	messages: MessageType[],
	limit: number,
): Promise<MessageType[]> => {
	const result: MessageType[] = []
	let currentLength = 0
	for (const message of messages) {
		const tokens = await getTokensCount(message.content)
		if (currentLength + tokens > limit)
			return limitArrayOfMessages(messages.slice(1), limit) // Remove the second message 0,1,2,3 => 0,2,3. We need to stay system prompt
		currentLength += tokens
		result.push(message)
	}
	return result
}

/*
	* This function generates a prompt for the OpenAI API.
	* It is called when the user send a message.
	* It generates a prompt from the previous messages and the new message.
	* It adds a system prompt at the beginning of the prompt.
*/
export default async function generatePrompt(previousMessages: MessageType[], content: string): Promise<MessageType[]> {
	const promptLimit = GPT3_LIMIT - await getTokensCount(SYSTEM_MESSAGE) - ANSWER_BUFFER

	const messages: MessageType[] = await limitArrayOfMessages(
		[
			...previousMessages,
			{
				role: 'user',
				content,
				name: 'Buddy',
			},
		],
		promptLimit,
	)

	messages.unshift({
		role: 'system',
		content: SYSTEM_MESSAGE,
	})

	// FYI: looks like openai counts name as well as message content, because i think it transform it to something like "Buddy: Hello" in the prompt to real GPT model

	return messages;
}