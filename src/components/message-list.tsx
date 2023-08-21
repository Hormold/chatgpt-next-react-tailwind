import React from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
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
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-300">
            No messages yet. Say something!
          </p>
          <h2 className="mt-10 text-gray-500 dark:text-gray-300">
            <ArrowDownCircleIcon className="w-10 h-10 animate-bounce" />
          </h2>
        </div>
      )}
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
};
