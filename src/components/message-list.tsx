import React from "react";
import { MessageType } from "@/types";
import { Message } from "./message";

export type MessageListProps = {
  /**
   * The list of messages to display.
   * @see src/types.ts
   */
  messages: MessageType[];
};
export const MessageList = (props: MessageListProps) => {
  const { messages } = props;

  return (
    <div className="overflow-auto mt-10">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
};
