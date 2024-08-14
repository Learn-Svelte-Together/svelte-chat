type ChatHistoryItem = {
    message_id: string;
    user_id: string;
    message_timestamp: number;
    message: string;
};

type SafeChatHistoryItem = {
    username: string;
    message_timestamp: string;
    message: string;
}