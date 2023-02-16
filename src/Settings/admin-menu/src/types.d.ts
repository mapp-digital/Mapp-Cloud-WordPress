export {}

declare global {
	interface Window {
		_mappConfig: GlobalMapp;
	}
}

interface HintsAndHeaderStrings {
	exclude_keys: string;
	exclude_users: string;
	gtm_id: string;
	acquire: string;
	pixel_version: string;
	ti_domain: string;
	ti_id: string;
}

interface TranslationStrings {
	docs:string;
	header: HintsAndHeaderStrings;
	hints: HintsAndHeaderStrings;
	error: ErrorMessages;
	link: string;
	save_changes: string;
	saving_changes: string;
	settings_error: string;
	settings_saved: string;
}

interface MappAPI {
	url: string;
	nonce: string;
}

interface MappSettings {
	General: {
		excludeWpUser: boolean;
		filterKeys: string;
		gtmId: string;
		tiDomain: string;
		tiId: string;
		v: 5 | 6;
		acquire: string;
	}
}

interface ErrorMessages {
	gtm_id: string;
	ti_domain: string;
	ti_id: string;
	acquire: string;
	save: string;
	error: string;
}

interface GlobalMapp {
	api: MappAPI;
	settings: MappSettings;
	strings: TranslationStrings;
}