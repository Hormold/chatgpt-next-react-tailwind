import { MessageType } from "@/types";

const apiMessage = async (
	previousMessages: MessageType[], newMessage: string,
	setMessages: (messages: MessageType[]) => void
) => {
	const response = await fetch("/api/message", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			previousMessages,
			content: newMessage,
		}),
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = response.body;
	if (!data) {
		throw new Error("No response body");
	}
	const reader = data.getReader();
	const decoder = new TextDecoder();
	let done = false;
	let messageBuffer = "";

	while (!done) {
		const {
			value,
			done: doneReading
		} = await reader.read();
		done = doneReading;
		const chunkValue = decoder.decode(value);
		messageBuffer += chunkValue;

		setMessages([
			...previousMessages,
			{
				role: "user",
				content: newMessage
			}, {
				role: "assistant",
				content: messageBuffer
			}
		]);
	}
};

export default apiMessage;