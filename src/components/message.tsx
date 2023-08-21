import { MessageType } from "@/types";
import { UserIcon, CogIcon } from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown'

export type MessageProps = {
  /**
   * The message to display.
   * @see src/types.ts
   */
  message: MessageType;
};


export const Message = (props: MessageProps) => {
  const { message } = props;
  const isBot = message.role !== "user";
  // ref is used to scroll to the last message
  return (
    <div
      ref={(el) => {
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
      }}
      className={`py-5 text-white ${isBot?"dark:bg-[#434654] bg-[#bcb9ab]":"dark:bg-[#343541] bg-[#cbcabe]"}"`}>
      <div className="flex space-x-5 px-10 w-full">
        {isBot ? (
            <span className="" style={{transform: "scaleX(-1)"}}>
              <CogIcon className="h-8 w-8" />
            </span>
          ) : (
            <span className="">
              <UserIcon className="h-8 w-8 text-red-500 dark:text-red-300" />
            </span>
          )}
        <div className="pt-1 text-sm">
          {/* Add the `prose` class to render markdown as HTML + special markdown plugin to react */}
          <ReactMarkdown className="prose dark:prose-invert prose-neutral whitespace-pre-wrap max-w-max" disallowedElements={['p']} unwrapDisallowed={true}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
