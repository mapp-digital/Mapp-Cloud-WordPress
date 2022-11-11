Cypress.Commands.add("wpLogin", (nextPage = "/wp-admin/", name = "admin") => {
	cy.visit({
		url: "/wp-login.php",
		method: "POST",
		body: {
			log: name,
			pwd: "password",
			"wp-submit": "Log In",
			redirect_to: Cypress.config().baseUrl + nextPage,
		},
	});
});

Cypress.Commands.add("goToSettings", () => {
	cy.wpLogin("/wp-admin/plugins.php?page=mapp-intelligence");
});

Cypress.Commands.add("setSettings", (newSettings) => {
	return fetch(
		"http://mapp_e2e_wpcli:8000?command=set_settings&json=" +
			JSON.stringify(newSettings)
	)
		.then((db) => db.json())
		.then((dbSettings) => {
			for (let setting in newSettings) {
				expect(newSettings[setting]).to.equal(
					dbSettings.data.General[setting]
				);
			}
		});
});

Cypress.Commands.add("getSettingsFromDB", () => {
	return fetch("http://mapp_e2e_wpcli:8000?command=get_settings").then((db) =>
		db.json()
	);
});

Cypress.Commands.add("activateTI", () => {
	cy.setSettings({
		v: 5,
		tiId: "136699033798929",
		tiDomain: "responder.wt-safetag.com",
		filterKeys: "",
		excludeWpUser: false,
	});
});

Cypress.Commands.add("activateGTM", () => {
	cy.setSettings({
		v: 6,
		gtmId: "GTM-N2FH826",
		filterKeys: "",
		excludeWpUser: false,
	});
});

Cypress.Commands.add("getGtmDataLayer", () => {
	return cy.window().then((win) => {
		return win.dataLayer
			.filter((d) => d.event === "mapp.load")
			.map((dl) => dl.mapp)[0];
	});
});

Cypress.Commands.add("getTiDataLayer", () => {
	return cy.window().then((win) => {
		return win._ti;
	});
});


