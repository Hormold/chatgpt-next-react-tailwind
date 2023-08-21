import { MessageList } from "@/components/message-list";
import { NewMessageForm } from "@/components/new-message-form";
import { MessageType } from "@/types";
import { useState } from "react";

/**
 * The list of messages displayed when the page is first loaded. You may remove or modify it as you wish.
 * @see src/types.ts
 */
const initialMessages: MessageType[] = [
  { role: "user", content: "Hey there, who are you?" },
  {
    role: "assistant",
    content:
      "Hey there! I am a language model created by [OpenAI](https://openai.com).",
  },
  {
    role: "user",
    content:
      "Oh neat! Can you show me a table of the 3 most populous provinces in Canada?",
  },
  {
    role: "assistant",
    content:
      "Certainly! Here's a table of the 3 most populous provinces in Canada as of my last update in 2021:\n\n| Province         | Population   |\n|------------------|--------------|\n| Ontario          | ~14.7 million|\n| Quebec           | ~8.5 million |\n| British Columbia | ~5.1 million |",
  },
];

export default function HomePage() {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");

  /**
   * Sends a message to the assistant.
   * TODO: Hook up to the OpenAI API.
   */
  const sendMessage = () => {
    setMessages([...messages, { role: "user", content: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen lg:max-w-4xl lg:mx-auto justify-between">
      <MessageList messages={messages} />
      <NewMessageForm
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
