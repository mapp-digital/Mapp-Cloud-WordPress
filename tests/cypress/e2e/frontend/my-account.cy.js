// / <reference types="Cypress" />

describe("My account", () => {
	describe("Google Tag Manager", () => {
		before(cy.activateGTM);
		beforeEach(cy.interceptTracking);

		it("Dashboard", () => {
			cy.wpLogin("/my-account/", "customer");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal("mapp_e2e_wp.test/my-account/");
				expect(track.params.cg1).to.equal("page");
				expect(track.params.cg2).to.equal("single-page");
				expect(track.params.cd).to.match(/[0-9a-f]{32}/);
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer[0].pageName).to.equal(
					"mapp_e2e_wp.test/my-account/"
				);
				expect(dataLayer[0].contentCategory).to.equal("page");
				expect(dataLayer[0].contentSubcategory).to.equal("single-page");
				expect(dataLayer[0].userRoles[0]).to.equal("customer");
				expect(dataLayer[0].customerId).to.match(/[0-9a-f]{32}/);
				expect(dataLayer[0].pageTitle).to.equal("My account");
			});
		});

		it("Orders", () => {
			cy.wpLogin("/my-account/orders/", "customer");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/my-account/orders/"
				);
				expect(track.params.cg1).to.equal("page");
				expect(track.params.cg2).to.equal("single-page");
				expect(track.params.cd).to.match(/[0-9a-f]{32}/);
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer[0].pageName).to.equal(
					"mapp_e2e_wp.test/my-account/orders/"
				);
				expect(dataLayer[0].contentCategory).to.equal("page");
				expect(dataLayer[0].contentSubcategory).to.equal("single-page");
				expect(dataLayer[0].userRoles[0]).to.equal("customer");
				expect(dataLayer[0].customerId).to.match(/[0-9a-f]{32}/);
				expect(dataLayer[0].pageTitle).to.equal("My account");
			});
		});
		it("Downloads", () => {
			cy.wpLogin("/my-account/downloads/", "customer");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/my-account/downloads/"
				);
				expect(track.params.cg1).to.equal("page");
				expect(track.params.cg2).to.equal("single-page");
				expect(track.params.cd).to.match(/[0-9a-f]{32}/);
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer[0].pageName).to.equal(
					"mapp_e2e_wp.test/my-account/downloads/"
				);
				expect(dataLayer[0].contentCategory).to.equal("page");
				expect(dataLayer[0].contentSubcategory).to.equal("single-page");
				expect(dataLayer[0].userRoles[0]).to.equal("customer");
				expect(dataLayer[0].customerId).to.match(/[0-9a-f]{32}/);
				expect(dataLayer[0].pageTitle).to.equal("My account");
			});
		});
		it("Addresses", () => {
			cy.wpLogin("/my-account/edit-address/", "customer");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/my-account/edit-address/"
				);
				expect(track.params.cg1).to.equal("page");
				expect(track.params.cg2).to.equal("single-page");
				expect(track.params.cd).to.match(/[0-9a-f]{32}/);
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer[0].pageName).to.equal(
					"mapp_e2e_wp.test/my-account/edit-address/"
				);
				expect(dataLayer[0].contentCategory).to.equal("page");
				expect(dataLayer[0].contentSubcategory).to.equal("single-page");
				expect(dataLayer[0].userRoles[0]).to.equal("customer");
				expect(dataLayer[0].customerId).to.match(/[0-9a-f]{32}/);
				expect(dataLayer[0].pageTitle).to.equal("My account");
			});
		});
		it("Account details", () => {
			cy.wpLogin("/my-account/edit-account/", "customer");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/my-account/edit-account/"
				);
				expect(track.params.cg1).to.equal("page");
				expect(track.params.cg2).to.equal("single-page");
				expect(track.params.cd).to.match(/[0-9a-f]{32}/);
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer[0].pageName).to.equal(
					"mapp_e2e_wp.test/my-account/edit-account/"
				);
				expect(dataLayer[0].contentCategory).to.equal("page");
				expect(dataLayer[0].contentSubcategory).to.equal("single-page");
				expect(dataLayer[0].userRoles[0]).to.equal("customer");
				expect(dataLayer[0].customerId).to.match(/[0-9a-f]{32}/);
				expect(dataLayer[0].pageTitle).to.equal("My account");
			});
		});
	});

	// describe("Tag Integration", () => {
	// 	before(cy.activateTI);
	// 	beforeEach(cy.interceptTracking);

	// 	it("Dashboard", () => {
	// 		cy.wpLogin("/my-account/", "customer");
	// 		cy.testTrackRequest().then((track) => {
	// 			expect(track.version).to.equal("5");
	// 			expect(track.pageName).to.equal("mapp_e2e_wp.test/my-account/");
	// 			expect(track.params.cg1).to.equal("page");
	// 			expect(track.params.cg2).to.equal("single-page");
	// 			expect(track.params.cd).to.match(/[0-9a-f]{32}/);
	// 		});
	// 		cy.getTiDataLayer().then((dataLayer) => {
	// 			expect(dataLayer.pageName).to.equal(
	// 				"mapp_e2e_wp.test/my-account/"
	// 			);
	// 			expect(dataLayer.contentCategory).to.equal("page");
	// 			expect(dataLayer.contentSubcategory).to.equal("single-page");
	// 			expect(dataLayer.userRoles[0]).to.equal("customer");
	// 			expect(dataLayer.customerId).to.match(/[0-9a-f]{32}/);
	// 			expect(dataLayer.pageTitle).to.equal("My account");
	// 		});
	// 	});

	// 	it("Orders", () => {
	// 		cy.wpLogin("/my-account/orders/", "customer");
	// 		cy.testTrackRequest().then((track) => {
	// 			expect(track.version).to.equal("5");
	// 			expect(track.pageName).to.equal(
	// 				"mapp_e2e_wp.test/my-account/orders/"
	// 			);
	// 			expect(track.params.cg1).to.equal("page");
	// 			expect(track.params.cg2).to.equal("single-page");
	// 			expect(track.params.cd).to.match(/[0-9a-f]{32}/);
	// 		});
	// 		cy.getTiDataLayer().then((dataLayer) => {
	// 			expect(dataLayer.pageName).to.equal(
	// 				"mapp_e2e_wp.test/my-account/orders/"
	// 			);
	// 			expect(dataLayer.contentCategory).to.equal("page");
	// 			expect(dataLayer.contentSubcategory).to.equal("single-page");
	// 			expect(dataLayer.userRoles[0]).to.equal("customer");
	// 			expect(dataLayer.customerId).to.match(/[0-9a-f]{32}/);
	// 			expect(dataLayer.pageTitle).to.equal("My account");
	// 		});
	// 	});
	// 	it("Downloads", () => {
	// 		cy.wpLogin("/my-account/downloads/", "customer");
	// 		cy.testTrackRequest().then((track) => {
	// 			expect(track.version).to.equal("5");
	// 			expect(track.pageName).to.equal(
	// 				"mapp_e2e_wp.test/my-account/downloads/"
	// 			);
	// 			expect(track.params.cg1).to.equal("page");
	// 			expect(track.params.cg2).to.equal("single-page");
	// 			expect(track.params.cd).to.match(/[0-9a-f]{32}/);
	// 		});
	// 		cy.getTiDataLayer().then((dataLayer) => {
	// 			expect(dataLayer.pageName).to.equal(
	// 				"mapp_e2e_wp.test/my-account/downloads/"
	// 			);
	// 			expect(dataLayer.contentCategory).to.equal("page");
	// 			expect(dataLayer.contentSubcategory).to.equal("single-page");
	// 			expect(dataLayer.userRoles[0]).to.equal("customer");
	// 			expect(dataLayer.customerId).to.match(/[0-9a-f]{32}/);
	// 			expect(dataLayer.pageTitle).to.equal("My account");
	// 		});
	// 	});
	// 	it("Addresses", () => {
	// 		cy.wpLogin("/my-account/edit-address/", "customer");
	// 		cy.testTrackRequest().then((track) => {
	// 			expect(track.version).to.equal("5");
	// 			expect(track.pageName).to.equal(
	// 				"mapp_e2e_wp.test/my-account/edit-address/"
	// 			);
	// 			expect(track.params.cg1).to.equal("page");
	// 			expect(track.params.cg2).to.equal("single-page");
	// 			expect(track.params.cd).to.match(/[0-9a-f]{32}/);
	// 		});
	// 		cy.getTiDataLayer().then((dataLayer) => {
	// 			expect(dataLayer.pageName).to.equal(
	// 				"mapp_e2e_wp.test/my-account/edit-address/"
	// 			);
	// 			expect(dataLayer.contentCategory).to.equal("page");
	// 			expect(dataLayer.contentSubcategory).to.equal("single-page");
	// 			expect(dataLayer.userRoles[0]).to.equal("customer");
	// 			expect(dataLayer.customerId).to.match(/[0-9a-f]{32}/);
	// 			expect(dataLayer.pageTitle).to.equal("My account");
	// 		});
	// 	});
	// 	it("Account details", () => {
	// 		cy.wpLogin("/my-account/edit-account/", "customer");
	// 		cy.testTrackRequest().then((track) => {
	// 			expect(track.version).to.equal("5");
	// 			expect(track.pageName).to.equal(
	// 				"mapp_e2e_wp.test/my-account/edit-account/"
	// 			);
	// 			expect(track.params.cg1).to.equal("page");
	// 			expect(track.params.cg2).to.equal("single-page");
	// 			expect(track.params.cd).to.match(/[0-9a-f]{32}/);
	// 		});
	// 		cy.getTiDataLayer().then((dataLayer) => {
	// 			expect(dataLayer.pageName).to.equal(
	// 				"mapp_e2e_wp.test/my-account/edit-account/"
	// 			);
	// 			expect(dataLayer.contentCategory).to.equal("page");
	// 			expect(dataLayer.contentSubcategory).to.equal("single-page");
	// 			expect(dataLayer.userRoles[0]).to.equal("customer");
	// 			expect(dataLayer.customerId).to.match(/[0-9a-f]{32}/);
	// 			expect(dataLayer.pageTitle).to.equal("My account");
	// 		});
	// 	});
	// });
});
