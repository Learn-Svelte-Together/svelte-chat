import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	const user = typeof event.locals.auth == 'function' ? event.locals.auth() : null;
	return { user };
};
