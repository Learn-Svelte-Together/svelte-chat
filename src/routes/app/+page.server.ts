import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	const user = typeof event.locals.auth == 'function' ? event.locals.auth() : undefined;
	console.log(event.locals);
	return { user };
};
