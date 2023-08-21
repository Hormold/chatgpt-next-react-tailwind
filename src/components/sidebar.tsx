import React from "react";
import { ChatType } from "@/types";
import { SidebarItem } from "./sidebar-item";
import { PlusIcon } from "@heroicons/react/24/outline";

export type SidebarProps = {
  /* 
    * The list of chats to display.
    * @see src/types.ts
    */
  chats: ChatType[];
  /* 
    * A function that sets the chat id.
    */
  setChatId: (id: string) => void;

  /*
    * A function that creates a new chat.
    */
  createNextChat: () => void;

  /*
    * The id of the active chat.
    */
  activeChatId: string;
};
export const Sidebar = (props: SidebarProps) => {

  const { chats, setChatId, createNextChat, activeChatId } = props;

  return (
    <nav className="flex h-full w-full flex-col p-2">
      <div className="flex-col flex-1 transition-opacity duration-500 overflow-y-auto">
        
        {chats.map((chat, index) => (
          <SidebarItem chat={chat} key={index} setChatId={setChatId} isActive={chat.id === activeChatId} />
        ))}
        {/* We can reuse component to make it! */}
        <div className="rounded-lg my-2 text-sm flex items-center justify-center space-x-2 dark:hover:bg-gray-700/70 hover:bg-gray-300/70 cursor-pointer text-gray-300 transition-all duration-200 ease-out">
            <a className="flex py-3 px-3 items-center gap-3 relative rounded-md dark:hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 dark:bg-gray-900 bg-[#bcb9ab] text-black dark:text-white group w-full" onClick={createNextChat}>
              <PlusIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
              <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                  Create a new chat!
              </div>
            </a>
        </div>

      </div>
    </nav>
  );
};
