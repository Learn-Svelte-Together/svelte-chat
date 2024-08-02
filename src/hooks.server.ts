import type { Handle } from '@sveltejs/kit';

/**
 * NOTE: need to implement auth instead of using JSON.parse
 */
export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('sessionid');

	try {
		if (session) {
			const user = JSON.parse(session);
			if (user) {
				event.locals.auth = () => ({
					name: user.name,
					image: user.image
				});
			} else {
				event.locals.auth = () => null;
			}
		} else {
			event.locals.auth = () => null;
		}
	} catch (_) {
		event.cookies.delete('sessionid', { path: '/' });
	}

	return resolve(event);
};
