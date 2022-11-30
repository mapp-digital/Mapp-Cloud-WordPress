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

Cypress.Commands.add("activateWoocommerce", () => {
	return fetch("http://mapp_e2e_wpcli:8000?command=activate_woo");
});

Cypress.Commands.add("deactivateWoocommerce", () => {
	return fetch("http://mapp_e2e_wpcli:8000?command=deactivate_woo");
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
		filterKeys: "customFields",
		excludeWpUser: false,
	});
});

Cypress.Commands.add("activateGTM", () => {
	cy.setSettings({
		v: 6,
		gtmId: "GTM-N2FH826",
		filterKeys: "customFields",
		excludeWpUser: false,
	});
});

Cypress.Commands.add("getGtmDataLayer", () => {
	return cy.window().then((win) => {
		return win.dataLayer
			.filter((d) => d.event === "mapp.load")
			.map((dl) => dl.mapp);
	});
});

Cypress.Commands.add("getTiDataLayer", () => {
	return cy.window().then((win) => {
		return win._ti;
	});
});

Cypress.Commands.add("spyOnGtmDataLayer", (log = false) => {
	const dl = [];
	return cy.window().then((win) => {
		win.dataLayer = win.dataLayer || [];
		const original = win.dataLayer.push;
		win.dataLayer.push = (args) => {
			if (args.event && args.event.includes("mapp.")) {
				const copy = JSON.parse(JSON.stringify(args));
				if (log) {
					console.log(copy);
				}
				dl.push(copy);
			}
			original(args);
		};
		return dl;
	});
});

Cypress.Commands.add("spyOnTiDataLayer", (log = false) => {
	const dl = [];
	return cy.window().then((win) => {
		win.wts = win.wts || [];
		const original = win.wts.push;
		win.wts.push = (args) => {
			if (args[0] === "send" && args[1] === "pageupdate") {
				const copy = JSON.parse(JSON.stringify(win._ti));
				dl.push(copy);
				if (log) {
					console.log(copy);
				}
			}
			original(args);
		};
		return dl;
	});
});

Cypress.Commands.add("delayAddResponse", () => {
	cy.intercept(
		{
			method: "POST",
			url: "http://mapp_e2e_wp.test/product/**",
			middleware: true,
		},
		(req) => {
			req.on("response", (res) => {
				// Wait for delay in milliseconds before sending the response to the client.
				res.setDelay(500);
			});
		}
	);
});
