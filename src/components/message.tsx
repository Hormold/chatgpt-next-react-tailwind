import { MessageType } from "@/types";
import { SparklesIcon, UserIcon } from "@heroicons/react/24/outline";

export type MessageProps = {
  /**
   * The message to display.
   * @see src/types.ts
   */
  message: MessageType;
};
export const Message = (props: MessageProps) => {
  const { message } = props;

  return (
    <div className="flex flex-row gap-4 p-2 first:rounded-t-md last:rounded-b-md text-black dark:text-white bg-white dark:bg-slate-800">
      <div className="shrink">
        {message.role === "user" ? (
          <>
            <span className="sr-only">Message from you</span>
            <p className="text-gray-500 dark:text-gray-300">You</p>
          </>
        ) : (
          <>
            <span className="sr-only">Message from bot</span>
            <p className="text-gray-500 dark:text-gray-300">Bot</p>
          </>
        )}
      </div>

      {/* Maybe a non-plaintext format would be a bit nicer to read? */}
      <p className="grow">{message.content}</p>
    </div>
  );
};
