import { PaperAirplaneIcon, ArrowPathIcon  } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

export type NewMessageFormProps = {
  /**
   * The current value of the new message input field.
   */
  newMessage: string;
  /**
   * Sets the value of the `newMessage` input field.
   * @param {string} newMessage The new value of the new message input field.
   */
  setNewMessage: Dispatch<SetStateAction<string>>;
  /**
   * Sends the message contained in `newMessage` to the assistant.
   */
  sendMessage: () => void;
  
  /**
    * Whether the assistant is currently sending a message.
    */
  isLoading: boolean;
};

export const NewMessageForm = (props: NewMessageFormProps) => {
  const { newMessage, setNewMessage, sendMessage, isLoading } = props;

  return (
    <div className="bg-white-700/50 dark:bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form
        className="p-5 flex"
        onSubmit={(evt) => evt.preventDefault()}
      >
        <input
          type="text"
          className="w-full bg-transparent outline outline-1 rounded-md p-2 pr-10 dark:outline-white dark:text-white"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Send a message..."
          disabled={isLoading}
        />
        <button
          className="absolute right-5 rounded-lg p-1 pt-1.5 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600"
          onClick={sendMessage}
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <ArrowPathIcon className="animate-spin w-6 h-6" />
          )}
          {!isLoading && (
            <PaperAirplaneIcon className="w-6 h-6" />
          )}
        </button>
      </form>
    </div>
  );
};
