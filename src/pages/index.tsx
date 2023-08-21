import { MessageList } from "@/components/message-list";
import { NewMessageForm } from "@/components/new-message-form";
import { ChatType, MessageType } from "@/types";
import { useState } from "react";
import { ChatTitle } from "@/components/chat-title";
import { Sidebar } from "@/components/sidebar";
import apiMessage from '@/utils/client/apiMessage'
import apiChatTitle from '@/utils/client/apiChatTitle'
import { useEffect } from "react";
import ChatManager from '@/utils/client/chatManager'

// Create a chat manager to handle chats
const chatManager = new ChatManager()

export default function HomePage() {
  const [title, setTitle] = useState<string>("Untitled");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [chatId, setChatId] = useState<string>("");
  const [chats, setChats] = useState<ChatType[]>([]);

  // Send message to assistant
  const sendMessage = async () => {
    if (newMessage === "") return;

    if(!chatId) {
      setChatId(chatManager.createNewChat())
    }

    // If title is "Untitled" and there are no messages, generate a title (not blocking)
    if(title === "Untitled" && !messages.length) {
      apiChatTitle(newMessage, setTitle)
    }
    
    setNewMessage("");
    setMessages([...messages, { role: "user", content: newMessage }]); // Strange bug, user message is not displayed if we don't add it in apiMessage
    const previousMessages = messages;
    try {
      setIsLoading(true);
      await apiMessage(previousMessages, newMessage, setMessages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset chat on click icon
  const resetChat = () => {
    setMessages([]);
    setTitle("Untitled");
    setNewMessage("");

    if(chatId) {
      chatManager.removeChat(chatId);
      setChatId("");
      setChats(chatManager.getChats());
    }
  }

  const createNextChat = () => {
    setChatId(chatManager.createNewChat())
    setSideBarOpen(false)
  }

  // Save messages/title to localStorage on change
  useEffect(() => {
    if(title !== "Untitled")
      chatManager.saveChatTitle(title)

    if(messages.length)
      chatManager.saveChatMessage(messages)
    
  }, [title, messages])

  // Load messages/title from localStorage on change
  useEffect(() => {
    if(chatId) {
      const currentChat = chatManager.setCurrentChat(chatId)
      if(currentChat) {
        setTitle(currentChat.title)
        setMessages(currentChat.messages)
      }
      setSideBarOpen(false)
    }
  }, [chatId])

  // Load previous messages/title from localStorage
  useEffect(() => {
    setChats(chatManager.getChats());
    const currentChat = chatManager.getCurrentChat();
    if(currentChat) {
      setTitle(currentChat.title)
      setMessages(currentChat.messages)
      setChatId(currentChat.id)
    }
  }, [])

  return (
      <div className='bg-[#cbcabe] dark:bg-[#343541] flex'>
          <div className={'bg-[#dfdedc] dark:bg-[#202123] flex-shrink-0 w-64 flex flex-col border-r transition-all duration-300 '+(sideBarOpen?'':'-ml-64')}>
            <Sidebar chats={chats} setChatId={setChatId} createNextChat={createNextChat} activeChatId={chatId} />
          </div>
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <ChatTitle resetChat={resetChat} title={title} setSideBarOpen={() => setSideBarOpen(!sideBarOpen)} />
            <MessageList messages={messages} />
            <NewMessageForm
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              isLoading={isLoading}
            />
          </div>
          {/*sideBarOpen?(<div className='absolute top-0 left-0 w-full h-full bg-black/50 z-[10]' onClick={() => setSideBarOpen(false)}></div>):''*/}
      </div>
  );
}
