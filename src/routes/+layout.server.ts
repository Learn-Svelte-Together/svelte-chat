import type { AuthModel } from 'pocketbase';
import type { LayoutServerLoad } from './$types';

export const load:LayoutServerLoad = ({ locals }) => {
    if (locals.user) {
        return {
            user: locals.user as AuthModel
        }
    };
    return {
        user: undefined
    };
}