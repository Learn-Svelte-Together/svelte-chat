import { fail } from '@sveltejs/kit';

// A placeholder for the conversation database
// TODO: Remove when DB and user management implemented
const messageHistory: ChatHistoryItem[] = [];

/**
 * Load function to provide initial data to the page when it loads.
 * TODO: Update when DB and user management implemented.
 * @returns {Object} - An object containing the message history.
 */
export function load(): { messageHistory: ChatHistoryItem[] } {
    return {
        messageHistory
    };
}

export const actions = {
    
    // Action to handle new message submission from user.
    submitMessage: async ({ request }) => {
        
        // Extract form data from the request
        const data = await request.formData();
        
        try {
        
            // Extract username and message from form data.
            const username = data.get('username') as string;
            const message = data.get('message') as string;

            // Validate that both username and message are provided.
            if (!username || !message) {
                throw new Error('Invalid input. Did not receive username and/or message.');
            }

            // Add the new message to the message history
            // TODO: Replace when DB and user management implemented.
            messageHistory.push({ username, message });

            // Return success response with updated message history
            return {
                success: true,
                message: 'Message submitted successfully',
                messageHistory
            };

        } catch (error) {
            
            // Handle errors by setting a default error message
            let errorMessage = 'An error occurred';
            
            // If the error is an instance of Error, use the error's message
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            // Return failure response with error details
            return fail(422, {
                data: Object.fromEntries(data), // Preserve form data for user convenience
                error: errorMessage // Provide the specific error message
            });
        }
    }
};
