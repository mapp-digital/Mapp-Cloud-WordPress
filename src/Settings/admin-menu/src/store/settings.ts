import { writable } from "svelte/store";

export const v = writable(window._mappConfig.settings.General.v);
export const tiId = writable(window._mappConfig.settings.General.tiId);
export const gtmId = writable(window._mappConfig.settings.General.gtmId);
export const tiDomain = writable(window._mappConfig.settings.General.tiDomain);
export const filterKeys = writable(window._mappConfig.settings.General.filterKeys);
export const excludeWpUser = writable(window._mappConfig.settings.General.excludeWpUser);
export const acquire = writable(window._mappConfig.settings.General.acquire || "");