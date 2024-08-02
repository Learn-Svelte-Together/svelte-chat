import { fail } from '@sveltejs/kit';

// A placeholder for the conversation database
// TODO: Remove when DB and user management implemented
const messageHistory: ChatHistoryItem[] = [];

// Load function to provide initial data to the page when it loads
// TODO: Update when DB and user management implemented
export function load() {
    return {
        messageHistory
    };
}

export const actions = {
    
    // Action to handle new message submission from user.
    submitMessage: async ({ request }) => {
        
        const data = await request.formData();
        
        try {
        
            // Extract username and message from form data
            const username = data.get('username') as string;
            const message = data.get('message') as string;

            // Validate that there is input
            if (!username || !message) {
                throw new Error('Invalid input. Did not receive username and/or message.');
            }

            // Add the new message to the message history
            // TODO: Replace when DB and user management implemented
            messageHistory.push({ username, message });

            // Return success response with updated message history
            return {
                success: true,
                message: 'Message submitted successfully',
                messageHistory
            };

        } catch (error) {
            
            // Handle errors
            let errorMessage = 'An error occurred';
            
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            // Return failure response with error details
            return fail(422, {
                data: Object.fromEntries(data),
                error: errorMessage
            });
        }
    }
};
