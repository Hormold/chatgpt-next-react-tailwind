/**
 * The message to display. By default, this is an object with a `role` and `content` property.
 * Feel free to modify this as you wish, or use a different type (even from another library) altogether.
 */
export type MessageType = {
  role: "assistant" | "function" | "system" | "user";
  content: string;
};
