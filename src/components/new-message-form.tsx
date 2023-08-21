import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
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
};
export const NewMessageForm = (props: NewMessageFormProps) => {
  const { newMessage, setNewMessage, sendMessage } = props;

  return (
    <form
      className="p-2 fixed bottom-0 w-full lg:max-w-4xl flex items-center"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <input
        type="text"
        className="w-full bg-transparent outline outline-1 rounded-md p-2 pr-10 dark:outline-white dark:text-white"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Send a message..."
      />
      <button
        className="absolute right-3 rounded-lg p-1 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600"
        onClick={sendMessage}
        type="submit"
      >
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </form>
  );
};
