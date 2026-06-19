import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
	console.error('[server error]', event.url.pathname, error);
	return { message: 'Internal Error' };
};
