import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { ChatType } from "@/types";

export type SideBarProps = {
  /**
   * The chat row to display.
   * @see src/types.ts
   */
  chat: ChatType;

  /* 
    * A function that sets the chat id.
    */
  setChatId: (id: string) => void;

  /* 
    * A boolean that indicates if the chat is active.
    */
  isActive: boolean;
};
export const SidebarItem = (props: SideBarProps) => {
  const { chat, setChatId, isActive } = props;

  return (
    <div className={`rounded-lg my-2 text-sm flex items-center justify-center space-x-2 dark:hover:bg-gray-700/70 hover:bg-gray-300/70 cursor-pointer text-gray-300 transition-all duration-200 ease-out ${isActive && "dark:bg-gray-700/50 bg-gray-400"}`}>
      <a className="flex py-3 px-3 items-center gap-3 relative rounded-md dark:hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 dark:bg-gray-900 bg-[#bcb9ab] text-black dark:text-white group w-full" onClick={() => setChatId(chat.id)}>
        <ChatBubbleLeftIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
          {chat.title}
        </div>
      </a>
	</div>
  );
};
