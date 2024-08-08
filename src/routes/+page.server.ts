import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

import * as db from '$lib/server/database';

const schema = z.object({
    message: z.string().min(1),
  });

export const load = (async () => {
    const form = await superValidate(zod(schema));
    return {
        form,
        messages: db.getChatMessages()
    };
})

export const actions = {
	default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));

        if (form.valid) {
            // todo: set correct userId
            db.saveChatMessage('Me', form.data.message)
        }

	}
}