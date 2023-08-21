import React from "react";
import { TrashIcon, Bars3Icon } from "@heroicons/react/24/outline";

export type ChatTitleProps = {
	/**
	 * A function that resets the chat.
	 */
	resetChat: () => void;

	/**
	 * A function that toggle the sidebar.
	 */
	setSideBarOpen: () => void;

	/**
	 * The title of the chat.
	 */
	title: string;
};
export const ChatTitle = (props: ChatTitleProps) => {
const { resetChat, title, setSideBarOpen } = props;

return (
	<header className="sticky top-0 z-[9] w-full">
		<div className="relative z-20 flex min-h-[60px] flex-wrap items-center justify-between border-b border-black/10 bg-white p-2 text-gray-500 dark:border-gray-900/50 dark:bg-gray-800 dark:text-gray-300">
			<div className="flex flex-shrink flex-row">
				<button aria-label="Open sidebar" className="flex p-3 items-center gap-3 transition-colors duration-200 text-gray-600 dark:text-gray-200 cursor-pointer text-sm rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 h-11" onClick={() => setSideBarOpen()}>
					<Bars3Icon className="w-5 h-5" />
				</button>
			</div>
			<div className="flex flex-1 flex-grow items-center gap-1 p-1 text-gray-600 dark:text-gray-200 sm:justify-center sm:p-0">
				{title && (
					<h1 className="text-sm font-semibold">{title}</h1>
				)}

				{!title && (
					<h1 className="text-sm font-semibold">New chat</h1>
				)}

			</div>
			<div className="flex flex-shrink flex-row">
				<button aria-label="Reset chat" className="flex p-3 items-center gap-3 transition-colors duration-200 text-gray-600 dark:text-gray-200 cursor-pointer text-sm rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 h-11" onClick={() => resetChat()}>
					<TrashIcon className="w-5 h-5" />
				</button>
			</div>
		</div>
	</header>
);
};