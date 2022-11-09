Cypress.Commands.add("adminLogin", () => {
	cy.visit("/wp-login.php");
	cy.get("#user_login").type("admin");
	cy.get("#user_pass").type("password");
	cy.get("#wp-submit").click();
	cy.contains("Dashboard").should("be.visible");
});

Cypress.Commands.add("setOptions", (newOptions) => {
	return fetch(
		"http://mapp_e2e_wpcli:8000?command=set_option&json=" +
			JSON.stringify(newOptions)
	).then((e) => e.json());
});
