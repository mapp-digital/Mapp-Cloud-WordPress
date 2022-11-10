Cypress.Commands.add("adminLogin", (nextPage = "/wp-admin/") => {
	cy.visit({
		url: "/wp-login.php",
		method: "POST",
		body: {
			log: "admin",
			pwd: "password",
			"wp-submit": "Log In",
			redirect_to: Cypress.config().baseUrl + nextPage,
		},
	});
});

Cypress.Commands.add("goToSettings", () => {
	cy.adminLogin("/wp-admin/plugins.php?page=mapp-intelligence");
});

Cypress.Commands.add("setSettings", (newSettings) => {
	return fetch(
		"http://mapp_e2e_wpcli:8000?command=set_settings&json=" +
			JSON.stringify(newSettings)
	)
		.then((db) => db.json())
		.then((dbSettings) => {
			for (let setting in newSettings) {
				expect(newSettings[setting]).to.equal(dbSettings.data.General[setting]);
			  }
		});
});
