import { t } from '../lib/translations';
import { get, writable } from 'svelte/store';
import * as settings from './settings';

export const saveState = writable('');

export const saveSettings = () => {
	saveState.set('Saving...');
	fetch(window._mappConfig.api.url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': window._mappConfig.api.nonce
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: getRequestBody()
	})
		.then((r) => r.json())
		.then((config) => {
			console.log('saved', config);
			saveState.set(t.settings_saved);
			window.setTimeout(() => {
				saveState.set('');
			}, 4000);
		})
		.catch((e) => {
			console.log('error', e);
			saveState.set(t.settings_error);
			window.setTimeout(() => {
				saveState.set('');
			}, 4000);
		});
};

const getRequestBody = () => {
	const body = {};
	for (const setting in settings) {
		body[setting] = get(settings[setting]);
	}
	return JSON.stringify({ General: body });
};
