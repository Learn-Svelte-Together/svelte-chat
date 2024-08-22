import { ABSTRACT_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function makeUserAvatar(name: string): Promise<File> {
    const API_URL = 'https://avatars.abstractapi.com/v1';
    const params = new URLSearchParams({
        api_key: ABSTRACT_API_KEY,
        name: name,
        is_rounded: 'true'
    });

    const fullUrl = `${API_URL}?${params.toString()}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type') || 'image/png';

        const blob = await response.blob();

        const fileName = `avatar_${name.replace(/\s+/g, '_')}.png`;
        return new File([blob], fileName, { type: contentType });

    } catch (err) {
        console.error('Error fetching avatar:', err);
        throw error(500, 'Failed to generate avatar');
    }
}