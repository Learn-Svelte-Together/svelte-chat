
import { AllChatMessages, type ChatMessage } from '../stores/messageStore';

async function addNewMessage(messageText: string) 
{
    const newMessage: ChatMessage = {
        messageSender: 'Me',
        messageText: messageText,
        messageTime: new Date(),
        tagged: false,
    };

    AllChatMessages.update(messages => [...messages, newMessage]);
}

export { addNewMessage };



