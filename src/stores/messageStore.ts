
import { writable } from 'svelte/store';

export type ChatMessage = {
    messageSender: string;  // Who sent the message
    messageText: string;    // The message text
    messageTime: Date;      // When the message was created
    tagged: boolean;        // Tagged for highlighting
};

export const AllChatMessages = writable<ChatMessage[]>([]);
