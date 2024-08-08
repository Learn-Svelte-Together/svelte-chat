import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

/** 
* This is a placeholder array which is used in place of a DB, until we have one. It stores the message history.
* 
* TODO: Remove when DB and user management implemented.
*/
const messageHistory: ChatHistoryItem[] = [];

/**
 * Server-side load function for fetching the chat message history.
 * 
 * This function is executed on the server each time the page is requested.
 * It returns the `messageHistory` array, which is a placeholder for
 * chat messages. This placeholder will be replaced with actual database
 * logic once the database and user management are implemented.
 * 
 * TODO: Update when we have a DB.
 */
export const load: PageServerLoad = () => {
	return {
		messageHistory,
	};
};

/**
 * An action for handling new messages from the user.
 * 
 * The `submitMessage` action handles the submission of a new message by a user. It 
 * extracts and validates the necessary form data (username and message), and 
 * processes the message to be added to the message history. If the submission is 
 * successful, a success response is returned along with the updated message history.
 * 
 * In case of an error during submission (e.g., missing form fields or other issues), 
 * it catches the error, logs it, and returns a failure response with the relevant 
 * error message and the original form data for the user's convenience.
 * 
 * Note: The current implementation uses an in-memory message history and lacks 
 * database and user management integration, which should be added in future updates.
 * 
 * TODO: Update when we have a DB.
 */
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

            // Add the new message to the message history.
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
} satisfies Actions;
