import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	
    // Initialize PocketBase
	event.locals.pb = new PocketBase('https://evidence-if.pockethost.io/');

	// Load the auth store from the cookie
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// Define routes that don't require authentication
	const publicRoutes = ['/authenticate'];

	if (event.locals.pb.authStore.isValid) {
		// If the auth is valid, set the user in locals
		event.locals.user = structuredClone(event.locals.pb.authStore.model);
	} else {
		// Clear the user if not authenticated
		event.locals.user = undefined;

		// Redirect to authentication page if not accessing a public route
		if (!publicRoutes.includes(event.url.pathname)) {
			return new Response(null, {
				status: 302,
				headers: { Location: `${event.url.origin}/authenticate` }
			});
		}
	}

	// Proceed with the request
	const response = await resolve(event);

	// Set the cookie in the response
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: false,
			sameSite: 'Lax',
			httpOnly: true,
			path: '/'
		})
	);

	return response;
};
