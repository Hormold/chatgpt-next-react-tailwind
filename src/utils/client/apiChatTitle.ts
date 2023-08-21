/*
	API call to get the title of a chat from the first message
	If the response is ok, the function reads the response body as a stream of data and decodes it using a TextDecoder.
	The decoded data is then appended to a messageBuffer variable.
	The setTitle function is called with the messageBuffer variable as an argument, with any quotes removed and the string trimmed of whitespace.
	This process continues until the entire response body has been read and processed. Finally, the function returns nothing.
*/
const apiChatTitle = async (firstMessage: string, setTitle: (title: string) => void) => {
	const response = await fetch("/api/chat-title", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			firstMessage
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

		setTitle(
			messageBuffer
			.replace(/"/g, '')
			.trimStart()
			.trimEnd()
		); // Remove quotes from title and trim it
	}
};

export default apiChatTitle;