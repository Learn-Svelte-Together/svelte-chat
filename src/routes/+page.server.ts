import * as db from '$lib/server/database';

export const load = (async () => {

    return {
        messages: db.getChatMessages()
    };
})

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
        const message = data.get('message') as string
        if (message) {
            // todo: set correct userId
            db.saveChatMessage('Me', message)
        }

	}
}