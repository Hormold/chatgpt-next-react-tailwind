"use client"
import { set, get, remove } from "./localStorage";
import { MessageType, ChatType, ChatOutput } from "../../types";

// Simple client-side chat manager, using localStorage
// Maybe todo: add a client-side chat manager, using a database like firebase

class ChatManager {
	private chatStorage: ChatType[] = []; // All chats (in-memory)
	private currentChatId: string | null = null; // Current chat id (selected)
	private defaultChat: string | null = null; // Default chat to open when the user logs in

	constructor() {
		this.chatStorage = get("chatStorage", []);
		this.defaultChat = get("defaultChat", null);
		if(this.defaultChat && this.chatStorage.find((chat) => chat.id === this.defaultChat))
			this.currentChatId = this.defaultChat;
		else
			// If no default chat, select the first one
			if(this.chatStorage.length > 0)
				this.currentChatId = this.chatStorage[0].id;
	}

	public getChats(): ChatType[] {
		return this.chatStorage;
	}

	public getCurrentChatId(): string | null {
		return this.currentChatId;
	}

	public removeChat(id: string): void {
		console.log(`Removing chat ${id}`, this.chatStorage)
		this.chatStorage = this.chatStorage.filter((chat) => chat.id !== id);
		remove(`chatMessages-${id}`);
		this.saveChats();
		console.log(`Removed chat ${id}`, this.chatStorage)
	}

	public getCurrentChat(): ChatOutput | null {
		if (this.currentChatId) return this.getChat(this.currentChatId);
		return null;
	}

	public setCurrentChat(id: string): ChatOutput | null {
		return this.getChat(id);
	}

	public saveChatTitle(title: string): void {
		let id = this.currentChatId;
		if (!id) {
			id = this.createNewChat();
		}
		this.chatStorage.find((chat) => chat.id === id)!.title = title;
		this.saveChats();
	}

	public saveChatMessage(messages: MessageType[]): void {
		let id = this.currentChatId;
		if (!id) {
			id = this.createNewChat();
		}
		set(`chatMessages-${id}`, messages);
	}

	public createNewChat(): string {
		const id = this.generateId();
		this.chatStorage.push({
			id,
			title: "Untitled",
		});
		this.saveChats();
		this.currentChatId = id;
		this.saveDefaultChat(id);
		return id
	}

	// Private methods

	private saveDefaultChat(id: string): void {
		this.defaultChat = id;
		set("defaultChat", id);
	}

	private saveChats(): void {
		set("chatStorage", this.chatStorage);
	}

	// return chattype + messages: MessageType[]
	private getChat(id: string): ChatOutput | null {
		const chat = this.chatStorage.find((chat) => chat.id === id);
		if (!chat) return null;

		this.currentChatId = id;
		return {
			...chat,
			messages: get(`chatMessages-${id}`, []),
		};
	}

	private generateId(): string {
		return Math.random().toString(36).substr(2, 9);
	}
}

export default ChatManager;