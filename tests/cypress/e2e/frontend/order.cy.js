// / <reference types="Cypress" />
describe("Order", () => {
	describe("Tag Integration", () => {
		before(cy.activateTI);
		beforeEach(cy.interceptTracking);

		it("confirmation", () => {
			cy.visit("/shop/");
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
			});
			cy.get('[href="?add-to-cart=11"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.params.ct).to.equal("mapp_e2e_wp.test.shop.");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("view");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("add");
			});
			cy.get('[href="?add-to-cart=27"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.params.ct).to.equal("mapp_e2e_wp.test.shop.");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("view");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("add");
			});
			cy.get('[href="?add-to-cart=15"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.params.ct).to.equal("mapp_e2e_wp.test.shop.");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("view");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("add");
			});
			cy.get('[href="?add-to-cart=27"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.params.ct).to.equal("mapp_e2e_wp.test.shop.");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("view");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("add");
			});
			cy.visit("/checkout/");
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/checkout/");
			});
			cy.get("#billing_first_name").clear().type("Mapp");
			cy.get("#billing_last_name").clear().type("User");
			cy.get("#billing_country").select("DE", { force: true });
			cy.get("#billing_address_1").clear().type("Robert Koch Platz 4");
			cy.get("#billing_postcode").clear().type("10115");
			cy.get("#billing_city").clear().type("Berlin");
			cy.get("#billing_phone").clear().type("123456789");
			cy.get("#billing_email").clear().type("test@mapptest.test");
			cy.get("#place_order").click();
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.match(
					/mapp_e2e_wp.test\/checkout\/order-received\/[0-9]+/
				);
				expect(track.params.ba).to.equal("11;27;15");
				expect(track.params.ca1).to.equal(
					"Accessories;Accessories;Hoodies"
				);
				expect(track.params.ca3).to.equal(
					"Belt;Beanie with Logo;Hoodie with Zipper"
				);
				expect(track.params.cb563).to.equal("0");
				expect(track.params.cg1).to.equal("order-received");
				expect(track.params.co).to.equal("55;36;45");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.oi).to.match(/[0-9]+/);
				expect(track.params.ov).to.equal("136.00");
				expect(track.params.qn).to.equal("1;2;1");
				expect(track.params.st).to.equal("conf");

				cy.getTiDataLayer().then((dataLayer) => {
					expect(dataLayer.language).to.equal("en_US");
					expect(dataLayer.pageTitle).to.equal("Checkout");
					expect(dataLayer.contentCategory).to.equal(
						"order-received"
					);
					expect(dataLayer.shoppingCartStatus).to.equal("conf");
					expect(dataLayer.currency).to.equal("EUR");
					expect(dataLayer.products[0].productName).to.equal("Belt");
					expect(dataLayer.products[0].productCost).to.equal("55");
					expect(dataLayer.products[0].productId).to.equal("11");
					expect(dataLayer.products[0].productSKU).to.equal(
						"woo-belt"
					);
					expect(dataLayer.products[0].productQuantity).to.equal("1");
					expect(
						dataLayer.products[0].taxonomies.product_type[0]
					).to.equal("simple");
					expect(
						dataLayer.products[0].taxonomies.product_cat[0]
					).to.equal("Accessories");
					expect(dataLayer.products[0].productCategories[0]).to.equal(
						"Accessories"
					);
					expect(dataLayer.products[0].productCategory).to.equal(
						"Accessories"
					);
					expect(dataLayer.products[1].productName).to.equal(
						"Beanie with Logo"
					);
					expect(dataLayer.products[1].productCost).to.equal("36");
					expect(dataLayer.products[1].productId).to.equal("27");
					expect(dataLayer.products[1].productSKU).to.equal(
						"Woo-beanie-logo"
					);
					expect(dataLayer.products[1].productQuantity).to.equal("2");
					expect(
						dataLayer.products[1].taxonomies.product_type[0]
					).to.equal("simple");
					expect(
						dataLayer.products[1].taxonomies.product_cat[0]
					).to.equal("Accessories");
					expect(
						dataLayer.products[1].taxonomies.pa_color[0]
					).to.equal("Red");
					expect(dataLayer.products[1].productCategories[0]).to.equal(
						"Accessories"
					);
					expect(dataLayer.products[1].productCategory).to.equal(
						"Accessories"
					);
					expect(dataLayer.products[2].productName).to.equal(
						"Hoodie with Zipper"
					);
					expect(dataLayer.products[2].productCost).to.equal("45");
					expect(dataLayer.products[2].productId).to.equal("15");
					expect(dataLayer.products[2].productSKU).to.equal(
						"woo-hoodie-with-zipper"
					);
					expect(dataLayer.products[2].productQuantity).to.equal("1");
					expect(
						dataLayer.products[2].taxonomies.product_type[0]
					).to.equal("simple");
					expect(
						dataLayer.products[2].taxonomies.product_visibility[0]
					).to.equal("featured");
					expect(
						dataLayer.products[2].taxonomies.product_cat[0]
					).to.equal("Hoodies");
					expect(dataLayer.products[2].productCategories[0]).to.equal(
						"Hoodies"
					);
					expect(dataLayer.products[2].productCategory).to.equal(
						"Hoodies"
					);
					expect(dataLayer.orderId).to.match(/[0-9]+/);
					expect(dataLayer.totalOrderValue).to.equal("136.00");
					expect(dataLayer.subtotalOrderValue).to.equal("136");
					expect(dataLayer.couponValue).to.equal("0");
					expect(dataLayer.shippingMethod).to.equal("");
					expect(dataLayer.shippingCost).to.equal("0");
					expect(dataLayer.paymentMethod).to.equal(
						"Direct bank transfer"
					);
					expect(dataLayer.pageName).to.match(
						/mapp_e2e_wp.test\/checkout\/order-received\/[0-9]+/
					);
					expect(dataLayer.productName).to.equal(
						"Belt;Beanie with Logo;Hoodie with Zipper"
					);
					expect(dataLayer.productCost).to.equal("55;36;45");
					expect(dataLayer.productId).to.equal("11;27;15");
					expect(dataLayer.productSKU).to.equal(
						"woo-belt;Woo-beanie-logo;woo-hoodie-with-zipper"
					);
					expect(dataLayer.productQuantity).to.equal("1;2;1");
					expect(dataLayer.productCategory).to.equal(
						"Accessories;Accessories;Hoodies"
					);
					expect(dataLayer.productSubcategory).to.equal(";;");
				});
			});
		});
	});

	describe("Google Tag Manager", () => {
		before(cy.activateGTM);
		beforeEach(cy.interceptTracking);

		it("confirmation", () => {
			cy.visit("/shop/");
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
			});
			cy.get('[href="?add-to-cart=11"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("view");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("add");
			});
			cy.get('[href="?add-to-cart=27"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("view");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("add");
			});
			cy.get('[href="?add-to-cart=15"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("view");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("add");
			});
			cy.get('[href="?add-to-cart=27"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("view");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.params.st).to.equal("add");
			});
			cy.visit("/checkout/");
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/checkout/");
			});
			cy.get("#billing_first_name").clear().type("Mapp");
			cy.get("#billing_last_name").clear().type("User");
			cy.get("#billing_country").select("DE", { force: true });
			cy.get("#billing_address_1").clear().type("Robert Koch Platz 4");
			cy.get("#billing_postcode").clear().type("10115");
			cy.get("#billing_city").clear().type("Berlin");
			cy.get("#billing_phone").clear().type("123456789");
			cy.get("#billing_email").clear().type("test@mapptest.test");
			cy.get("#place_order").click();
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.match(
					/mapp_e2e_wp.test\/checkout\/order-received\/[0-9]+/
				);
				expect(track.params.ba).to.equal(
					"11 - Belt;27 - Beanie with Logo;15 - Hoodie with Zipper"
				);
				expect(track.params.ca3).to.equal(
					"woo-belt;Woo-beanie-logo;woo-hoodie-with-zipper"
				);
				expect(track.params.cb20).to.equal(";Red;");
				expect(track.params.cb760).to.equal("0;0;0");
				expect(track.params.cb761).to.equal("Direct bank transfer");
				expect(track.params.cg1).to.equal("order-received");
				expect(track.params.co).to.equal("55;36;45");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.cs802).to.equal("3072");
				expect(track.params.oi).to.match(/[0-9]+/);
				expect(track.params.ov).to.equal("136");
				expect(track.params.qn).to.equal("1;2;1");
				expect(track.params.st).to.equal("conf");
				expect(track.params.uc713).to.equal("1");

				cy.getGtmDataLayer().then((dataLayer) => {
					expect(dataLayer[0].language).to.equal("en_US");
					expect(dataLayer[0].pageTitle).to.equal("Checkout");
					expect(dataLayer[0].contentCategory).to.equal(
						"order-received"
					);
					expect(dataLayer[0].shoppingCartStatus).to.equal(
						"confirmation"
					);
					expect(dataLayer[0].currency).to.equal("EUR");
					expect(dataLayer[0].products[0].productName).to.equal(
						"Belt"
					);
					expect(dataLayer[0].products[0].productCost).to.equal("55");
					expect(dataLayer[0].products[0].productId).to.equal("11");
					expect(dataLayer[0].products[0].productSKU).to.equal(
						"woo-belt"
					);
					expect(dataLayer[0].products[0].productQuantity).to.equal(
						"1"
					);
					expect(
						dataLayer[0].products[0].taxonomies.product_type[0]
					).to.equal("simple");
					expect(
						dataLayer[0].products[0].taxonomies.product_cat[0]
					).to.equal("Accessories");
					expect(
						dataLayer[0].products[0].productCategories[0]
					).to.equal("Accessories");
					expect(dataLayer[0].products[0].productCategory).to.equal(
						"Accessories"
					);
					expect(dataLayer[0].products[1].productName).to.equal(
						"Beanie with Logo"
					);
					expect(dataLayer[0].products[1].productCost).to.equal("36");
					expect(dataLayer[0].products[1].productId).to.equal("27");
					expect(dataLayer[0].products[1].productSKU).to.equal(
						"Woo-beanie-logo"
					);
					expect(dataLayer[0].products[1].productQuantity).to.equal(
						"2"
					);
					expect(
						dataLayer[0].products[1].taxonomies.product_type[0]
					).to.equal("simple");
					expect(
						dataLayer[0].products[1].taxonomies.product_cat[0]
					).to.equal("Accessories");
					expect(
						dataLayer[0].products[1].taxonomies.pa_color[0]
					).to.equal("Red");
					expect(
						dataLayer[0].products[1].productCategories[0]
					).to.equal("Accessories");
					expect(dataLayer[0].products[1].productCategory).to.equal(
						"Accessories"
					);
					expect(dataLayer[0].products[2].productName).to.equal(
						"Hoodie with Zipper"
					);
					expect(dataLayer[0].products[2].productCost).to.equal("45");
					expect(dataLayer[0].products[2].productId).to.equal("15");
					expect(dataLayer[0].products[2].productSKU).to.equal(
						"woo-hoodie-with-zipper"
					);
					expect(dataLayer[0].products[2].productQuantity).to.equal(
						"1"
					);
					expect(
						dataLayer[0].products[2].taxonomies.product_type[0]
					).to.equal("simple");
					expect(
						dataLayer[0].products[2].taxonomies
							.product_visibility[0]
					).to.equal("featured");
					expect(
						dataLayer[0].products[2].taxonomies.product_cat[0]
					).to.equal("Hoodies");
					expect(
						dataLayer[0].products[2].productCategories[0]
					).to.equal("Hoodies");
					expect(dataLayer[0].products[2].productCategory).to.equal(
						"Hoodies"
					);
					expect(dataLayer[0].orderId).to.match(/[0-9]+/);
					expect(dataLayer[0].totalOrderValue).to.equal("136.00");
					expect(dataLayer[0].subtotalOrderValue).to.equal("136");
					expect(dataLayer[0].couponValue).to.equal("0");
					expect(dataLayer[0].shippingMethod).to.equal("");
					expect(dataLayer[0].shippingCost).to.equal("0");
					expect(dataLayer[0].paymentMethod).to.equal(
						"Direct bank transfer"
					);
					expect(dataLayer[0].gtmProductArray[0].id).to.equal(
						"11 - Belt"
					);
					expect(dataLayer[0].gtmProductArray[0].cost).to.equal("55");
					expect(dataLayer[0].gtmProductArray[0].quantity).to.equal(
						"1"
					);
					expect(dataLayer[0].gtmProductArray[0].name).to.equal(
						"Belt"
					);
					expect(dataLayer[0].gtmProductArray[0].status).to.equal(
						"confirmation"
					);
					expect(dataLayer[0].gtmProductArray[0].id_only).to.equal(
						"11"
					);
					expect(dataLayer[0].gtmProductArray[0].sku).to.equal(
						"woo-belt"
					);
					expect(
						dataLayer[0].gtmProductArray[0].product_type_0
					).to.equal("simple");
					expect(
						dataLayer[0].gtmProductArray[0].product_cat_0
					).to.equal("Accessories");
					expect(dataLayer[0].gtmProductArray[1].id).to.equal(
						"27 - Beanie with Logo"
					);
					expect(dataLayer[0].gtmProductArray[1].cost).to.equal("36");
					expect(dataLayer[0].gtmProductArray[1].quantity).to.equal(
						"2"
					);
					expect(dataLayer[0].gtmProductArray[1].name).to.equal(
						"Beanie with Logo"
					);
					expect(dataLayer[0].gtmProductArray[1].status).to.equal(
						"confirmation"
					);
					expect(dataLayer[0].gtmProductArray[1].id_only).to.equal(
						"27"
					);
					expect(dataLayer[0].gtmProductArray[1].sku).to.equal(
						"Woo-beanie-logo"
					);
					expect(
						dataLayer[0].gtmProductArray[1].product_type_0
					).to.equal("simple");
					expect(
						dataLayer[0].gtmProductArray[1].product_cat_0
					).to.equal("Accessories");
					expect(dataLayer[0].gtmProductArray[1].pa_color_0).to.equal(
						"Red"
					);
					expect(dataLayer[0].gtmProductArray[2].id).to.equal(
						"15 - Hoodie with Zipper"
					);
					expect(dataLayer[0].gtmProductArray[2].cost).to.equal("45");
					expect(dataLayer[0].gtmProductArray[2].quantity).to.equal(
						"1"
					);
					expect(dataLayer[0].gtmProductArray[2].name).to.equal(
						"Hoodie with Zipper"
					);
					expect(dataLayer[0].gtmProductArray[2].status).to.equal(
						"confirmation"
					);
					expect(dataLayer[0].gtmProductArray[2].id_only).to.equal(
						"15"
					);
					expect(dataLayer[0].gtmProductArray[2].sku).to.equal(
						"woo-hoodie-with-zipper"
					);
					expect(
						dataLayer[0].gtmProductArray[2].product_type_0
					).to.equal("simple");
					expect(
						dataLayer[0].gtmProductArray[2].product_visibility_0
					).to.equal("featured");
					expect(
						dataLayer[0].gtmProductArray[2].product_cat_0
					).to.equal("Hoodies");
					expect(dataLayer[0].pageName).to.match(
						/mapp_e2e_wp.test\/checkout\/order-received\/[0-9]+/
					);
				});
			});
		});
	});
});
