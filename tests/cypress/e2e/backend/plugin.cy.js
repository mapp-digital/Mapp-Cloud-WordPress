// / <reference types="Cypress" />

describe("Plugin", () => {
	beforeEach(() => {
		cy.intercept(
			"POST",
			Cypress.config().baseUrl + "/wp-json/mapp-digital/v1/settings"
		).as("saveRequest");
	});

	it("in overview", () => {
		cy.wpLogin("/wp-admin/plugins.php");
		cy.contains("Mapp Cloud Integration");
	});

	describe("settings", () => {
		describe("Google Tag Manager", () => {
			before(() => {
				cy.setSettings({
					v: 6,
					gtmId: "",
					excludeWpUser: false,
					filterKeys: "",
				});
			});

			beforeEach(() => {
				cy.goToSettings();
			});

			it("overview", () => {
				cy.contains("Mapp Cloud");
				cy.contains("Mapp Intelligence Pixel Version");
				cy.contains("Google Tag Manager Container ID");
				cy.contains("Exclude keys");
				cy.contains("Exclude users");
			});

			describe("error", () => {
				it("Google Tag Manager Container ID", () => {
					cy.get("#mapp_gtmId").clear().type("foo.bar");
					cy.contains(
						/Enter\syour\sGoogle\sTag\sManager\sContainer\sID/
					);
					cy.contains(/Error:\sGTM\sContainer\sID\snot\svalid/);
					cy.contains(/GTM-XXXXXXX/);
				});
			});

			describe("save", () => {
				it("Google Tag Manager Container ID", () => {
					cy.get("#mapp_gtmId").clear().type("GTM-XXXXXXX");
					cy.get("#mapp_save").click();
					cy.wait("@saveRequest").then((saveRequest) => {
						expect(saveRequest.request.body.General.gtmId).to.equal(
							"GTM-XXXXXXX"
						);
						expect(
							saveRequest.response.body.General.gtmId
						).to.equal("GTM-XXXXXXX");
					});
					cy.getSettingsFromDB().then((settings) => {
						expect(settings.data.General.gtmId).to.equal(
							"GTM-XXXXXXX"
						);
					});
				});

				it("Exclude keys", () => {
					cy.get("#mapp_filterKeys")
						.clear()
						.type("language,pageName");
					cy.get("#mapp_save").click();

					cy.wait("@saveRequest").then((saveRequest) => {
						expect(
							saveRequest.request.body.General.filterKeys
						).to.equal("language,pageName");
						expect(
							saveRequest.response.body.General.filterKeys
						).to.equal("language,pageName");
					});
					cy.getSettingsFromDB().then((settings) => {
						expect(settings.data.General.filterKeys).to.equal(
							"language,pageName"
						);
					});
				});

				it("Exclude user", () => {
					cy.get("#mapp_excludeWpUser").check();
					cy.get("#mapp_save").click();

					cy.wait("@saveRequest").then((saveRequest) => {
						expect(
							saveRequest.request.body.General.excludeWpUser
						).to.equal(true);
						expect(
							saveRequest.response.body.General.excludeWpUser
						).to.equal(true);
					});
					cy.getSettingsFromDB().then((settings) => {
						expect(settings.data.General.excludeWpUser).to.equal(
							true
						);
					});
				});
			});
		});

		describe("Mapp Tag Integration", () => {
			before(() => {
				cy.setSettings({
					v: 5,
					tiId: "",
					tiDomain: "",
					filterKeys: "",
					excludeWpUser: false,
				});
			});

			beforeEach(() => {
				cy.goToSettings();
			});

			it("overview", () => {
				cy.contains("Mapp Cloud");
				cy.contains("Mapp Intelligence Pixel Version");
				cy.contains("Tag Integration ID");
				cy.contains("Tag Integration Domain");
				cy.contains("Exclude keys");
				cy.contains("Exclude users");
			});

			describe("error", () => {
				it("Tag Integration ID", () => {
					cy.get("#mapp_tiId").clear().type("12345");
					cy.contains(/Enter\syour\sTag\sIntegration\sID/);
					cy.contains(
						/Error:\sThe\stiId\shas\sto\sconsist\sof\s15\snumbers/
					);
				});
			});

			describe("save", () => {
				it("Tag Integration ID", () => {
					cy.get("#mapp_tiId").clear().type("123451234512345");
					cy.get("#mapp_save").click();
					cy.wait("@saveRequest").then((saveRequest) => {
						expect(saveRequest.request.body.General.tiId).to.equal(
							"123451234512345"
						);
						expect(saveRequest.response.body.General.tiId).to.equal(
							"123451234512345"
						);
					});
					cy.getSettingsFromDB().then((settings) => {
						expect(settings.data.General.tiId).to.equal(
							"123451234512345"
						);
					});
				});

				it("Tag Integration Domain", () => {
					cy.get("#mapp_ti_domain")
						.clear()
						.type("responder.own-domain.tld");
					cy.get("#mapp_save").click();
					cy.wait("@saveRequest").then((saveRequest) => {
						expect(
							saveRequest.request.body.General.tiDomain
						).to.equal("responder.own-domain.tld");
						expect(
							saveRequest.response.body.General.tiDomain
						).to.equal("responder.own-domain.tld");
					});
					cy.getSettingsFromDB().then((settings) => {
						expect(settings.data.General.tiDomain).to.equal(
							"responder.own-domain.tld"
						);
					});
				});

				it("Exclude keys", () => {
					cy.get("#mapp_filterKeys")
						.clear()
						.type("language,pageName");
					cy.get("#mapp_save").click();

					cy.wait("@saveRequest").then((saveRequest) => {
						expect(
							saveRequest.request.body.General.filterKeys
						).to.equal("language,pageName");
						expect(
							saveRequest.response.body.General.filterKeys
						).to.equal("language,pageName");
					});
					cy.getSettingsFromDB().then((settings) => {
						expect(settings.data.General.filterKeys).to.equal(
							"language,pageName"
						);
					});
				});

				it("Exclude user", () => {
					cy.get("#mapp_excludeWpUser").check();
					cy.get("#mapp_save").click();

					cy.wait("@saveRequest").then((saveRequest) => {
						expect(
							saveRequest.request.body.General.excludeWpUser
						).to.equal(true);
						expect(
							saveRequest.response.body.General.excludeWpUser
						).to.equal(true);
					});
					cy.getSettingsFromDB().then((settings) => {
						expect(settings.data.General.excludeWpUser).to.equal(
							true
						);
					});
				});
			});
		});

		describe("inject script", () => {
			beforeEach(() => {
				cy.goToSettings();
				cy.intercept("http*://responder.wt-safetag.com/**").as(
					"responder"
				);
				cy.intercept("http*://www.googletagmanager.com/gtm.js**").as(
					"gtm"
				);
			});

			it("Tag Integration", () => {
				cy.setSettings({
					v: 6,
					excludeWpUser: false,
				});
				cy.get("#General_v_5").click();
				cy.get("#mapp_tiId").clear().type("136699033798929");
				cy.get("#mapp_ti_domain")
					.clear()
					.type("responder.wt-safetag.com");
				cy.get("#mapp_excludeWpUser").uncheck();
				cy.get("#mapp_save").click();

				cy.wait("@saveRequest").then((saveRequest) => {
					expect(saveRequest.request.body.General.v).to.equal(5);
					expect(saveRequest.response.body.General.v).to.equal(5);
					expect(saveRequest.request.body.General.tiDomain).to.equal(
						"responder.wt-safetag.com"
					);
					expect(saveRequest.response.body.General.tiDomain).to.equal(
						"responder.wt-safetag.com"
					);
					expect(saveRequest.request.body.General.tiId).to.equal(
						"136699033798929"
					);
					expect(saveRequest.response.body.General.tiId).to.equal(
						"136699033798929"
					);
					expect(
						saveRequest.request.body.General.excludeWpUser
					).to.equal(false);
					expect(
						saveRequest.response.body.General.excludeWpUser
					).to.equal(false);
				});
				cy.visit("/");
				cy.wait("@responder");
			});

			it("Google Tag Manager", () => {
				cy.setSettings({
					v: 5,
					excludeWpUser: false,
				});
				cy.get("#General_v_6").click();
				cy.get("#mapp_gtmId").clear().type("GTM-N2FH826");
				cy.get("#mapp_excludeWpUser").uncheck();
				cy.get("#mapp_save").click();

				cy.wait("@saveRequest").then((saveRequest) => {
					expect(saveRequest.request.body.General.v).to.equal(6);
					expect(saveRequest.response.body.General.v).to.equal(6);
					expect(saveRequest.request.body.General.gtmId).to.equal(
						"GTM-N2FH826"
					);
					expect(saveRequest.response.body.General.gtmId).to.equal(
						"GTM-N2FH826"
					);
				});
				cy.visit("/");
				cy.wait("@gtm");
			});
		});

		describe("disable tracking", () => {
			beforeEach(() => {
				cy.intercept("http*://responder.wt-safetag.com/**").as(
					"responder"
				);
				cy.intercept("http*://www.googletagmanager.com/gtm.js**").as(
					"gtm"
				);
			});

			it("Tag Integration", () => {
				cy.setSettings({
					v: 5,
					tiId: "136699033798929",
					tiDomain: "responder.wt-safetag.com",
					filterKeys: "",
					excludeWpUser: true,
				});
				cy.wpLogin("/");
				cy.contains("Mapp Cloud WordPress/Woocommerce E2E");
				cy.window().then((win) => {
					expect(win._ti).to.not.exist;
				});
				cy.wait(5000);
				cy.get("@responder.all").then((interceptions) => {
					expect(interceptions).to.have.length(0);
				});
			});

			it("Google Tag Manager", () => {
				cy.setSettings({
					v: 6,
					gtmId: "GTM-N2FH826",
					excludeWpUser: true,
				});
				cy.wpLogin("/");
				cy.contains("Mapp Cloud WordPress/Woocommerce E2E");
				cy.window().then((win) => {
					expect(win.dataLayer).to.not.exist;
				});
				cy.wait(5000);
				cy.get("@gtm.all").then((interceptions) => {
					expect(interceptions).to.have.length(0);
				});
			});
		});
	});
});
