import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
/**
 * NOTE: need to replace sessionid with token when implement auth and get user from hooks.server
 * https://kit.svelte.dev/docs/form-actions
 *
 * */
export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		if (!name) {
			return fail(400, { name, missing: true });
		}

		const user = {
			name: name,
			image: `https://ui-avatars.com/api/?name=${name.replaceAll(' ', '+')}`
		};
		cookies.set('sessionid', JSON.stringify(user), { path: '/' });

		return { success: true };
	}
};
