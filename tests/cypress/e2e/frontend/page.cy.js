// / <reference types="Cypress" />

describe("Page", () => {
	describe("Google Tag Manager", () => {
		beforeEach(() => {
			cy.activateGTM();
			cy.interceptTracking();
		});

		it("Home", () => {
			cy.visit("/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal("mapp_e2e_wp.test/");
				expect(track.params.cg1).to.equal("home");
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal("mapp_e2e_wp.test/");
				expect(dataLayer.contentCategory).to.equal("home");
				expect(dataLayer.contentSubcategory).to.not.exist;
			});
		});

		it("Privacy policy", () => {
			cy.visit("/privacy-policy/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/privacy-policy/"
				);
				expect(track.params.cg1).to.equal("page");
				expect(track.params.cg2).to.equal("single-page");
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/privacy-policy/"
				);
				expect(dataLayer.contentCategory).to.equal("page");
				expect(dataLayer.contentSubcategory).to.equal("single-page");
				expect(dataLayer.pageTitle).to.equal("Privacy Policy");
			});
		});

		it("Sample page", () => {
			cy.visit("/sample-page/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/sample-page/"
				);
				expect(track.params.cg1).to.equal("page");
				expect(track.params.cg2).to.equal("single-page");
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/sample-page/"
				);
				expect(dataLayer.contentCategory).to.equal("page");
				expect(dataLayer.contentSubcategory).to.equal("single-page");
				expect(dataLayer.pageTitle).to.equal("Sample Page");
			});
		});

		it("Category page", () => {
			cy.visit("/category/uncategorized/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/category/uncategorized/"
				);
				expect(track.params.cg1).to.equal("archive");
				expect(track.params.cg2).to.equal("category-post");
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/category/uncategorized/"
				);
				expect(dataLayer.contentCategory).to.equal("archive");
				expect(dataLayer.contentSubcategory).to.equal("category-post");
				expect(dataLayer.pageTitle).to.equal("Uncategorized");
				expect(dataLayer.pageNumber).to.equal("1");
			});
		});

		it("Search page", () => {
			cy.visit("/?s=hoodie");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal("mapp_e2e_wp.test/");
				expect(track.params.cg1).to.equal("internal search");
				expect(track.params.cg2).to.not.exist;
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal("mapp_e2e_wp.test/");
				expect(dataLayer.contentCategory).to.equal("internal search");
				expect(dataLayer.contentSubcategory).to.not.exist;
				expect(dataLayer.numberSearchResults).to.equal("4");
			});
		});

		it("Post page", () => {
			cy.visit("/uncategorized/mapp-cloud-wordpress-woocommerce-e2e/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/uncategorized/mapp-cloud-wordpress-woocommerce-e2e/"
				);
				expect(track.params.cg1).to.equal("post");
				expect(track.params.cg2).to.equal("single-post");
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/uncategorized/mapp-cloud-wordpress-woocommerce-e2e/"
				);
				expect(dataLayer.contentCategory).to.equal("post");
				expect(dataLayer.contentSubcategory).to.equal("single-post");
				expect(dataLayer.pageTitle).to.equal(
					"Mapp Cloud WordPress/Woocommerce E2E"
				);
			});
		});

		it("404", () => {
			cy.visit("/doesnt-exist/", { failOnStatusCode: false });
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/doesnt-exist/"
				);
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/doesnt-exist/"
				);
				expect(dataLayer.errorCode).to.equal("404");
				expect(dataLayer.errorMessage).to.equal("page not found");
			});
		});
	});

	describe("Tag Integration", () => {
		beforeEach(() => {
			cy.activateTI();
			cy.interceptTracking();
		});

		it("Home", () => {
			cy.visit("/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("5");
				expect(track.pageName).to.equal("mapp_e2e_wp.test/");
				expect(track.params.cg1).to.equal("home");
			});
			cy.getTiDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal("mapp_e2e_wp.test/");
				expect(dataLayer.contentCategory).to.equal("home");
				expect(dataLayer.contentSubcategory).to.not.exist;
			});
		});

		it("Privacy policy", () => {
			cy.visit("/privacy-policy/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("5");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/privacy-policy/"
				);
				expect(track.params.cg1).to.equal("page");
				expect(track.params.cg2).to.equal("single-page");
			});
			cy.getTiDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/privacy-policy/"
				);
				expect(dataLayer.contentCategory).to.equal("page");
				expect(dataLayer.contentSubcategory).to.equal("single-page");
				expect(dataLayer.pageTitle).to.equal("Privacy Policy");
			});
		});

		it("Sample page", () => {
			cy.visit("/sample-page/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("5");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/sample-page/"
				);
				expect(track.params.cg1).to.equal("page");
				expect(track.params.cg2).to.equal("single-page");
			});
			cy.getTiDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/sample-page/"
				);
				expect(dataLayer.contentCategory).to.equal("page");
				expect(dataLayer.contentSubcategory).to.equal("single-page");
				expect(dataLayer.pageTitle).to.equal("Sample Page");
			});
		});

		it("Category page", () => {
			cy.visit("/category/uncategorized/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("5");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/category/uncategorized/"
				);
				expect(track.params.cg1).to.equal("archive");
				expect(track.params.cg2).to.equal("category-post");
			});
			cy.getTiDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/category/uncategorized/"
				);
				expect(dataLayer.contentCategory).to.equal("archive");
				expect(dataLayer.contentSubcategory).to.equal("category-post");
				expect(dataLayer.pageTitle).to.equal("Uncategorized");
				expect(dataLayer.pageNumber).to.equal("1");
			});
		});

		it("Search page", () => {
			cy.visit("/?s=hoodie");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("5");
				expect(track.pageName).to.equal("mapp_e2e_wp.test/");
				expect(track.params.cg1).to.equal("internal search");
				expect(track.params.cg2).to.not.exist;
			});
			cy.getTiDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal("mapp_e2e_wp.test/");
				expect(dataLayer.contentCategory).to.equal("internal search");
				expect(dataLayer.contentSubcategory).to.not.exist;
				expect(dataLayer.numberSearchResults).to.equal("4");
			});
		});

		it("Post page", () => {
			cy.visit("/uncategorized/mapp-cloud-wordpress-woocommerce-e2e/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("5");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/uncategorized/mapp-cloud-wordpress-woocommerce-e2e/"
				);
				expect(track.params.cg1).to.equal("post");
				expect(track.params.cg2).to.equal("single-post");
			});
			cy.getTiDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/uncategorized/mapp-cloud-wordpress-woocommerce-e2e/"
				);
				expect(dataLayer.contentCategory).to.equal("post");
				expect(dataLayer.contentSubcategory).to.equal("single-post");
				expect(dataLayer.pageTitle).to.equal(
					"Mapp Cloud WordPress/Woocommerce E2E"
				);
			});
		});

		it("404", () => {
			cy.visit("/doesnt-exist/", { failOnStatusCode: false });
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("5");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/doesnt-exist/"
				);
			});
			cy.getTiDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal(
					"mapp_e2e_wp.test/doesnt-exist/"
				);
				expect(dataLayer.errorCode).to.equal("404");
				expect(dataLayer.errorMessage).to.equal("page not found");
			});
		});
	});
});
