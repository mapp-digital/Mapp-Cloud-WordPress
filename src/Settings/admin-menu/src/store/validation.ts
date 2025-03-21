import { t } from '../lib/translations';
import { derived } from 'svelte/store';
import { gtmId, tiDomain, tiId } from './settings';

export const tiIdValidated = derived(tiId, (tiId) => {
	return /(?:^$|^\d{15}$)/.test(tiId);
});
export const tiDomainValidated = derived(tiDomain, (tiDomain) => {
	return /(?:^$|^(?:[\w-]+\.)+([a-z]|[A-Z]|[0-9]){2,6}$)/.test(tiDomain);
});
export const gtmIdValidated = derived(gtmId, (gtmId) => {
	return /(?:^$|^GTM-[A-Z0-9]{1,7}$)/.test(gtmId);
});


export const wrongSettings = derived(
	[tiIdValidated, tiDomainValidated, gtmIdValidated],
	([tiIdValidated, tiDomainValidated, gtmIdValidated]) => {
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
		return errors;
	}
);
