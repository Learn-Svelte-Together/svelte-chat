// store data in memory until we get full requirements

interface ChatMessage {
    messageId: string;
    timestamp: number,
    userName: string,
    content: string,
}

const db :ChatMessage[] = [
    {
        messageId: crypto.randomUUID(),
        timestamp: Date.now(),
        userName: 'Me',
        content: 'Hello!'
    },
    {
        messageId: crypto.randomUUID(),
        timestamp: Date.now(),
        userName: 'Me',
        content: 'Where is everyone?'
    },
];

export const getChatMessages = () => {
    return db;
}

export const saveChatMessage = (userName: string, content: string) => {
    db.push({
        messageId: crypto.randomUUID(),
        timestamp: Date.now(),
        userName,
        content
    })
}