// src/routes/chat/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { format } from 'date-fns';

// Dummy user database.
const userDatabase: {
	user_id: string;
	username: string;
}[] = [
	{
		user_id: '7f5d6cf2-801d-4a42-bb68-84aa0768fcb6',
		username: 'Alf'
	}
];

// Dummy message database
const messageDatabase: ChatHistoryItem[] =[
	{
		message_id: 'c1da6ed3-5d3c-484c-8779-0def9e12479d',
		user_id: '7f5d6cf2-801d-4a42-bb68-84aa0768fcb6',
		message_timestamp: 1723627019, //Unix time format
		message: 'Any Melmacians in? No? How about any cats?'
	}
];

/**
 * Queries the dummy message database with the user id.
 *
 * @returns a string representing the username.
 */
async function getUsernameByUUID(uuid: string): Promise<string> {
	const user = userDatabase.find((u) => u.user_id === uuid);
	return user!.username;
}

/**
 * Converts a unix timestamp to a human readable timestamp.
 *
 * @returns a string representing a dd/mm/yy hh:mm timestamp.
 */
async function formatTimestamp(messageTimestamp: number): Promise<string> {
	const date = new Date(messageTimestamp * 1000);
	const formattedDate = format(date, 'dd/MM/yy HH:mm');
	return formattedDate;
}

/**
 * Loads the securely parsed message history.
 *
 * - Retrieves all ChatHistoryItem objects from the dummy messageDatabase.
 * - Utilises map to replace each userid with the username (with getUsernameByUUID) and each timestamp with a formatted one (with formatTimestamp).
 *
 * @returns an array of SafeChatHistoryItem objects with message, timestamp and username
 */
export const load: PageServerLoad = async () => {
	const chatHistory: SafeChatHistoryItem[] = await Promise.all(
		messageDatabase.map(async (item) => {
			const username = await getUsernameByUUID(item.user_id);
			const timestamp = await formatTimestamp(item.message_timestamp);
			return {
				message: item.message,
				message_timestamp: timestamp,
				username: username
			};
		})
	);
	return { chatHistory };
};

// Actions to handle new messages
export const actions: Actions = {
	
    /**
	 * Submits the new message to dummy message database.
	 *
	 * - Retrieves the data from the submitted form.
	 * - Creates a 'now' datetime.
     * - Pushes a ChatHistoryItem to the messageDatabase with a new UUID.
	 *
	 * @returns a truthy success boolean.
	 */
	newMessage: async ({ request }) => {
		const data = await request.formData();
		
        const uuid = '7f5d6cf2-801d-4a42-bb68-84aa0768fcb6'; // hardcoded for simplicity rn, but will be dealt with through locals/load when we have auth set up.

		const message = data.get('message') as string;
		const now = Math.floor(Date.now() / 1000);

		// Save the message in the database
		messageDatabase.push({
			message_id: crypto.randomUUID(),
			user_id: uuid,
			message_timestamp: now,
			message: message
		});

		return { success: true };
	}
};