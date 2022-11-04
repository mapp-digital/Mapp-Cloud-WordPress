import { t } from '../lib/translations';
import { derived } from 'svelte/store';
import { acquire, gtmId, tiDomain, tiId } from './settings';

export const tiIdValidated = derived(tiId, (tiId) => {
	return /(?:^$|^\d{15}$)/.test(tiId);
});
export const tiDomainValidated = derived(tiDomain, (tiDomain) => {
	return /(?:^$|^(?:[\w-]+\.)+([a-z]|[A-Z]|[0-9]){2,6}$)/.test(tiDomain);
});
export const gtmIdValidated = derived(gtmId, (gtmId) => {
	return /(?:^$|^GTM-[A-Z0-9]{1,7}$)/.test(gtmId);
});
export const acquireValidated = derived(acquire, (acquire) => {
	return /(?:^$|id=(\d+?)&m=(\d+?)\D)/.test(acquire);
});

export const wrongSettings = derived(
	[tiIdValidated, tiDomainValidated, gtmIdValidated, acquireValidated],
	([tiIdValidated, tiDomainValidated, gtmIdValidated, acquireValidated]) => {
		const errors: string[] = [];
		if (!tiIdValidated) {
			errors.push(t.header.ti_id);
		}
		if (!tiDomainValidated) {
			errors.push(t.header.ti_domain);
		}
		if (!gtmIdValidated) {
			errors.push(t.header.gtm_id);
		}
		if (!acquireValidated) {
			errors.push(t.header.acquire);
		}
		return errors;
	}
);
