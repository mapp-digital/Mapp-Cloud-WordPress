// / <reference types="Cypress" />

describe("Product", () => {
	describe("Google Tag Manager", () => {
        before(cy.activateGTM);
		beforeEach(cy.interceptTracking);

        it("Catalog", () => {
			cy.visit("/shop/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.cg1).to.equal("shop-startpage");
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(dataLayer.contentCategory).to.equal("shop-startpage");
                expect(dataLayer.contentSubcategory).to.not.exist;
				expect(dataLayer.pageTitle).to.equal("Products");
				expect(dataLayer.currency).to.equal("EUR");
				expect(dataLayer.products.length).to.equal(16);
				expect(dataLayer.orderBy).to.equal("default");
			});
		});

        it("Category", () => {
			cy.visit("/product-category/accessories/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal("mapp_e2e_wp.test/product-category/accessories/");
				expect(track.params.cg1).to.equal("archive");
				expect(track.params.cg2).to.equal("tax-product");
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer.pageName).to.equal("mapp_e2e_wp.test/product-category/accessories/");
				expect(dataLayer.contentCategory).to.equal("archive");
				expect(dataLayer.contentSubcategory).to.equal("tax-product");
				expect(dataLayer.pageTitle).to.equal("Accessories | Product categories");
				expect(dataLayer.currency).to.equal("EUR");
				expect(dataLayer.products.length).to.equal(5);
				expect(dataLayer.orderBy).to.equal("default");
			});
		});

		describe('view', () => {
            it('sale product', () => {
				cy.visit("/product/beanie-with-logo/");
				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal("mapp_e2e_wp.test/product/beanie-with-logo/");
					expect(track.param.ba).to.equal("27");
					expect(track.param.ca1).to.equal("Accessories");
					expect(track.param.ca3).to.equal("Beanie with Logo");
					expect(track.param.cd).to.equal("7315becdd0d512ca85a61ac53b899bb7");
					expect(track.param.cg1).to.equal("product");
					expect(track.param.cg2).to.equal("single-product");
					expect(track.param.co).to.equal("18");
					expect(track.param.cr).to.equal("EUR");
					expect(track.param.cs802).to.equal("5136");
					expect(track.param.pu).to.equal("http://mapp_e2e_wp.test/product/beanie-with-logo/");
					expect(track.param.qn).to.equal("1");
					expect(track.param.st).to.equal("view");
				});
			})
		});
    });
});