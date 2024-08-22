import type { Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { redirect } from '@sveltejs/kit';
import { makeUserAvatar } from '$lib/server/avatar';

interface ErrorResponse {
	success: false;
	error: string;
	details: string | Record<string, unknown>;
}

interface SuccessResponse {
	success: true;
}

interface NotVerifiedResponse {
	notVerified: true;
}

type ActionResponse = ErrorResponse | SuccessResponse | NotVerifiedResponse;


export const actions: Actions = {
	
	register: async ({locals, request }): Promise<ActionResponse> => {
		
		const body: Record<string, FormDataEntryValue> = Object.fromEntries(await request.formData());
		const avatar: File = await makeUserAvatar(body.name.toString().trim());
		
		try {
			await locals.pb.collection('users').create({avatar, ...body});
			return {success: true};
		} catch (error) {
			if (error instanceof ClientResponseError) {
				switch (error.status) {
					case 400:
						return { success: false, error: 'Bad Request', details: error.data };
					case 403:
						return { success: false, error: 'Forbidden', details: error.message };
					case 404:
						return { success: false, error: 'Not Found', details: error.message };
					default:
						return { success: false, error: 'Unknown Error', details: error.message };
				}
			}
			return { success: false, error: 'Unexpected Error', details: String(error) };
		}
	},

	login: async ({ locals, request }): Promise<ActionResponse> => {
		
		const body: Record<string, FormDataEntryValue> = Object.fromEntries(await request.formData());
		const identity: string = body.identity?.toString().trim();
		const password: string = body.password?.toString().trim();

		try {
			await locals.pb.collection('users').authWithPassword(identity, password);
		} catch (error) {
			if (error instanceof ClientResponseError) {
				return { success: false, error: 'Failed to authenticate', details: error.data };
			}
			return { success: false, error: 'Unexpected Error', details: String(error) };
		}

		throw redirect(303, '/');
	}
};