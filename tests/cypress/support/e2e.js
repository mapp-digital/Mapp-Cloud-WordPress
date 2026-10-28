// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import './wordpress';

// Chrome serves the Tag Integration loader and gtm.js from its HTTP cache after the first visit, and cached
// requests never reach cy.intercept (cy.wait('@responder') then times out). Cypress clears cookies and
// localStorage between tests, but not the browser cache, so clear it here.
beforeEach(() => {
	if (Cypress.browser.family === 'chromium') {
		cy.wrap(
			Cypress.automation('remote:debugger:protocol', { command: 'Network.clearBrowserCache' }),
			{ log: false }
		);
	}
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
