// / <reference types="Cypress" />

describe("Add-To-Cart", () => {
	describe("Google Tag Manager", () => {
		before(cy.activateGTM);
		beforeEach(() => {
			cy.interceptTracking();
			cy.interceptAddRequest();
		});
		let gtmDataLayer;

		it("sale product", () => {
			cy.visit("/product/beanie-with-logo/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
			});
            cy.wait(3000);
			cy.get('[name="add-to-cart"]').click();
			cy.testAddTrackRequest().then((track) => {
				const add = gtmDataLayer[0];
				const restore = gtmDataLayer[1];
				const addGtmArray = add.mapp.gtmProductArray[0];
				const rstGtmArray = restore.mapp.gtmProductArray[0];

				expect(add.event).to.equal("mapp.load");
				expect(add.mapp.language).to.equal("en_US");
				expect(add.mapp.pageTitle).to.equal("Beanie with Logo");
				expect(add.mapp.contentCategory).to.equal("product");
				expect(add.mapp.contentSubcategory).to.equal("single-product");
				expect(add.mapp.taxonomies.product_type[0]).to.equal("simple");
				expect(add.mapp.taxonomies.product_cat[0]).to.equal(
					"Accessories"
				);
				expect(add.mapp.taxonomies.pa_color[0]).to.equal("Red");
				expect(add.mapp.productName).to.equal("Beanie with Logo");
				expect(add.mapp.productCost).to.equal(18);
				expect(add.mapp.productId).to.match(/\d{1,3}/);
				expect(add.mapp.productSKU).to.equal("Woo-beanie-logo");
				expect(add.mapp.currency).to.equal("EUR");
				expect(add.mapp.productQuantity).to.equal("1");
				expect(add.mapp.shoppingCartStatus).to.equal("basket");
				expect(add.mapp.productCollection).to.equal("0");
				expect(add.mapp.productCategories[0]).to.equal("Accessories");
				expect(add.mapp.productCategory).to.equal("Accessories");

				expect(addGtmArray.id).to.match(/\d{1,3} - Beanie with Logo/);
				expect(addGtmArray.cost).to.equal(18);
				expect(addGtmArray.quantity).to.equal("1");
				expect(addGtmArray.name).to.equal("Beanie with Logo");
				expect(addGtmArray.collection).to.equal("0");
				expect(addGtmArray.status).to.equal("basket");
				expect(addGtmArray.id_only).to.match(/\d{1,3}/);
				expect(addGtmArray.sku).to.equal("Woo-beanie-logo");
				expect(addGtmArray.product_type_0).to.equal("simple");
				expect(addGtmArray.product_cat_0).to.equal("Accessories");
				expect(addGtmArray.pa_color_0).to.equal("Red");
				expect(add.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/product/beanie-with-logo/"
				);

				expect(restore.event).to.equal("mapp.restore");
				expect(restore.mapp.language).to.equal("en_US");
				expect(restore.mapp.pageTitle).to.equal("Beanie with Logo");
				expect(restore.mapp.contentCategory).to.equal("product");
				expect(restore.mapp.contentSubcategory).to.equal(
					"single-product"
				);
				expect(restore.mapp.taxonomies.product_type[0]).to.equal(
					"simple"
				);
				expect(restore.mapp.taxonomies.product_cat[0]).to.equal(
					"Accessories"
				);
				expect(restore.mapp.taxonomies.pa_color[0]).to.equal("Red");
				expect(restore.mapp.productName).to.equal("Beanie with Logo");
				expect(restore.mapp.productCost).to.equal("18");
				expect(restore.mapp.productId).to.match(/\d{1,3}/);
				expect(restore.mapp.productSKU).to.equal("Woo-beanie-logo");
				expect(restore.mapp.currency).to.equal("EUR");
				expect(restore.mapp.productQuantity).to.equal("1");
				expect(restore.mapp.shoppingCartStatus).to.equal("view");
				expect(restore.mapp.productCollection).to.equal("0");
				expect(restore.mapp.productCategories[0]).to.equal(
					"Accessories"
				);
				expect(restore.mapp.productCategory).to.equal("Accessories");

				expect(rstGtmArray.id).to.match(/\d{1,3} - Beanie with Logo/);
				expect(rstGtmArray.cost).to.equal("18");
				expect(rstGtmArray.quantity).to.equal("1");
				expect(rstGtmArray.name).to.equal("Beanie with Logo");
				expect(rstGtmArray.collection).to.equal("0");
				expect(rstGtmArray.status).to.equal("view");
				expect(rstGtmArray.id_only).to.match(/\d{1,3}/);
				expect(rstGtmArray.sku).to.equal("Woo-beanie-logo");
				expect(rstGtmArray.product_type_0).to.equal("simple");
				expect(rstGtmArray.product_cat_0).to.equal("Accessories");
				expect(rstGtmArray.pa_color_0).to.equal("Red");
				expect(restore.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/product/beanie-with-logo/"
				);

				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/product/beanie-with-logo/"
				);
				expect(track.params.ba).to.match(/\d{1,3} - Beanie with Logo/);
				expect(track.params.ca3).to.equal("Woo-beanie-logo");
				expect(track.params.cb20).to.equal("Red");
				expect(track.params.cb760).to.equal("0");
				expect(track.params.cg1).to.equal("product");
				expect(track.params.cg2).to.equal("single-product");
				expect(track.params.co).to.equal("18");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.cs802).to.equal("3104");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/product/beanie-with-logo/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("add");
				expect(track.params.uc713).to.equal("1");
			});
			cy.wait("@trackRequest");
		});

		it("normal product", () => {
			cy.visit("/product/long-sleeve-tee/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
			});
            cy.wait(3000);
			cy.get('[name="add-to-cart"]').click();
			cy.testAddTrackRequest().then((track) => {
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/product/long-sleeve-tee/"
				);
				expect(track.params.ba).to.match(/\d{1,3} - Long Sleeve Tee/);
				expect(track.params.ca3).to.equal("woo-long-sleeve-tee");
				expect(track.params.cb20).to.equal("Green");
				expect(track.params.cb760).to.equal("0");
				expect(track.params.cg1).to.equal("product");
				expect(track.params.cg2).to.equal("single-product");
				expect(track.params.co).to.equal("25");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.cs802).to.equal("3104");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/product/long-sleeve-tee/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("add");
				expect(track.params.uc713).to.equal("1");

				const add = gtmDataLayer[0];
				const restore = gtmDataLayer[1];
				const addGtmArray = add.mapp.gtmProductArray[0];
				const rstGtmArray = restore.mapp.gtmProductArray[0];
				expect(gtmDataLayer[0].event).to.equal("mapp.load");
				expect(add.mapp.language).to.equal("en_US");
				expect(add.mapp.pageTitle).to.equal("Long Sleeve Tee");
				expect(add.mapp.contentCategory).to.equal("product");
				expect(add.mapp.contentSubcategory).to.equal("single-product");
				expect(add.mapp.taxonomies.product_type[0]).to.equal("simple");
				expect(add.mapp.taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(add.mapp.taxonomies.pa_color[0]).to.equal("Green");
				expect(add.mapp.productName).to.equal("Long Sleeve Tee");
				expect(add.mapp.productCost).to.equal(25);
				expect(add.mapp.productId).to.match(/\d{1,3}/);
				expect(add.mapp.productSKU).to.equal("woo-long-sleeve-tee");
				expect(add.mapp.currency).to.equal("EUR");
				expect(add.mapp.productQuantity).to.equal("1");
				expect(add.mapp.shoppingCartStatus).to.equal("basket");
				expect(add.mapp.productCollection).to.equal("0");
				expect(add.mapp.productCategories[0]).to.equal("Tshirts");
				expect(add.mapp.productCategory).to.equal("Tshirts");

				expect(addGtmArray.id).to.match(/\d{1,3} - Long Sleeve Tee/);
				expect(addGtmArray.cost).to.equal(25);
				expect(addGtmArray.quantity).to.equal("1");
				expect(addGtmArray.name).to.equal("Long Sleeve Tee");
				expect(addGtmArray.collection).to.equal("0");
				expect(addGtmArray.status).to.equal("basket");
				expect(addGtmArray.id_only).to.match(/\d{1,3}/);
				expect(addGtmArray.sku).to.equal("woo-long-sleeve-tee");
				expect(addGtmArray.product_type_0).to.equal("simple");
				expect(addGtmArray.product_cat_0).to.equal("Tshirts");
				expect(addGtmArray.pa_color_0).to.equal("Green");
				expect(add.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/product/long-sleeve-tee/"
				);
				expect(restore.event).to.equal("mapp.restore");

				expect(restore.mapp.language).to.equal("en_US");
				expect(restore.mapp.pageTitle).to.equal("Long Sleeve Tee");
				expect(restore.mapp.contentCategory).to.equal("product");
				expect(restore.mapp.contentSubcategory).to.equal(
					"single-product"
				);
				expect(restore.mapp.taxonomies.product_type[0]).to.equal(
					"simple"
				);
				expect(restore.mapp.taxonomies.product_cat[0]).to.equal(
					"Tshirts"
				);
				expect(restore.mapp.taxonomies.pa_color[0]).to.equal("Green");
				expect(restore.mapp.productName).to.equal("Long Sleeve Tee");
				expect(restore.mapp.productCost).to.equal("25");
				expect(restore.mapp.productId).to.match(/\d{1,3}/);
				expect(restore.mapp.productSKU).to.equal("woo-long-sleeve-tee");
				expect(restore.mapp.currency).to.equal("EUR");
				expect(restore.mapp.productQuantity).to.equal("1");
				expect(restore.mapp.shoppingCartStatus).to.equal("view");
				expect(restore.mapp.productCollection).to.equal("0");

				expect(restore.mapp.productCategories[0]).to.equal("Tshirts");
				expect(restore.mapp.productCategory).to.equal("Tshirts");
				expect(rstGtmArray.id).to.match(/\d{1,3} - Long Sleeve Tee/);
				expect(rstGtmArray.cost).to.equal("25");
				expect(rstGtmArray.quantity).to.equal("1");
				expect(rstGtmArray.name).to.equal("Long Sleeve Tee");
				expect(rstGtmArray.collection).to.equal("0");
				expect(rstGtmArray.status).to.equal("view");
				expect(rstGtmArray.id_only).to.match(/\d{1,3}/);
				expect(rstGtmArray.sku).to.equal("woo-long-sleeve-tee");
				expect(rstGtmArray.product_type_0).to.equal("simple");
				expect(rstGtmArray.product_cat_0).to.equal("Tshirts");
				expect(rstGtmArray.pa_color_0).to.equal("Green");
				expect(restore.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/product/long-sleeve-tee/"
				);
			});
			cy.wait("@trackRequest");
		});

		it("product variation", () => {
			cy.visit("/product/hoodie/");
			cy.wait("@trackRequest");
            cy.wait(3000);
			cy.get("#pa_color").select("green");
			cy.get("#logo").select("No");

			cy.wait("@trackRequest").then(() => {
				cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
			});
			cy.wait(3000);
			cy.get(".single_add_to_cart_button").click();

			cy.testAddTrackRequest().then((track) => {
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/product/hoodie/"
				);
				expect(track.params.ba).to.match(/\d{1,3} - Hoodie/);
				expect(track.params.ca3).to.equal("woo-hoodie-green");
				expect(track.params.cb20).to.equal("green");
				expect(track.params.cb760).to.equal("0");
				expect(track.params.cg1).to.equal("product");
				expect(track.params.cg2).to.equal("single-product");
				expect(track.params.co).to.equal("45");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.cs802).to.equal("3104");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/product/hoodie/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("add");
				expect(track.params.uc713).to.equal("1");

				const add = gtmDataLayer[0];
				const restore = gtmDataLayer[1];
				const addGtmArray = add.mapp.gtmProductArray[0];
				const restoreGtmArray = restore.mapp.gtmProductArray[0];

				expect(add.event).to.equal("mapp.load");
				expect(add.mapp.language).to.equal("en_US");
				expect(add.mapp.pageTitle).to.equal("Hoodie");
				expect(add.mapp.contentCategory).to.equal("product");
				expect(add.mapp.contentSubcategory).to.equal("single-product");
				expect(add.mapp.taxonomies.product_type[0]).to.equal(
					"variable"
				);
				expect(add.mapp.taxonomies.product_cat[0]).to.equal("Hoodies");
				expect(add.mapp.taxonomies.pa_color[0]).to.equal("green");
				expect(add.mapp.taxonomies.pa_color[1]).to.equal("Green");
				expect(add.mapp.taxonomies.pa_color[2]).to.equal("Blue");
				expect(add.mapp.taxonomies.logo[0]).to.equal("No");
				expect(add.mapp.productName).to.equal("Hoodie");
				expect(add.mapp.productCost).to.equal(45);
				expect(add.mapp.productId).to.match(/\d{1,3}/);
				expect(add.mapp.productSKU).to.equal("woo-hoodie-green");
				expect(add.mapp.currency).to.equal("EUR");
				expect(add.mapp.productQuantity).to.equal("1");
				expect(add.mapp.shoppingCartStatus).to.equal("basket");
				expect(add.mapp.productCollection).to.equal("0");
				expect(add.mapp.productCategories[0]).to.equal("Hoodies");
				expect(add.mapp.productCategory).to.equal("Hoodies");
				expect(addGtmArray.id).to.match(/\d{1,3} - Hoodie/);
				expect(addGtmArray.cost).to.equal(45);
				expect(addGtmArray.quantity).to.equal("1");
				expect(addGtmArray.name).to.equal("Hoodie");
				expect(addGtmArray.collection).to.equal("0");
				expect(addGtmArray.status).to.equal("basket");
				expect(addGtmArray.id_only).to.match(/\d{1,3}/);
				expect(addGtmArray.sku).to.equal("woo-hoodie-green");
				expect(addGtmArray.product_type_0).to.equal("variable");
				expect(addGtmArray.product_cat_0).to.equal("Hoodies");
				expect(addGtmArray.pa_color_0).to.equal("green");
				expect(addGtmArray.pa_color_1).to.equal("Green");
				expect(addGtmArray.pa_color_2).to.equal("Blue");
				expect(addGtmArray.logo_0).to.equal("No");
				expect(add.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/product/hoodie/"
				);
				expect(restore.event).to.equal("mapp.restore");
				expect(restore.mapp.language).to.equal("en_US");
				expect(restore.mapp.pageTitle).to.equal("Hoodie");
				expect(restore.mapp.contentCategory).to.equal("product");
				expect(restore.mapp.contentSubcategory).to.equal(
					"single-product"
				);
				expect(restore.mapp.taxonomies.product_type[0]).to.equal(
					"variable"
				);
				expect(restore.mapp.taxonomies.product_cat[0]).to.equal(
					"Hoodies"
				);
				expect(restore.mapp.taxonomies.pa_color[0]).to.equal("green");
				expect(restore.mapp.taxonomies.pa_color[1]).to.equal("Green");
				expect(restore.mapp.taxonomies.pa_color[2]).to.equal("Blue");
				expect(restore.mapp.taxonomies.logo[0]).to.equal("No");
				expect(restore.mapp.productName).to.equal("Hoodie");
				expect(restore.mapp.productCost).to.equal("45");
				expect(restore.mapp.productId).to.match(/\d{1,3}/);
				expect(restore.mapp.productSKU).to.equal("woo-hoodie-green");
				expect(restore.mapp.currency).to.equal("EUR");
				expect(restore.mapp.productQuantity).to.equal("1");
				expect(restore.mapp.shoppingCartStatus).to.equal("view");
				expect(restore.mapp.productCollection).to.equal("0");
				expect(restore.mapp.productCategories[0]).to.equal("Hoodies");
				expect(restore.mapp.productCategory).to.equal("Hoodies");
				expect(restoreGtmArray.id).to.match(/\d{1,3} - Hoodie/);
				expect(restoreGtmArray.cost).to.equal("45");
				expect(restoreGtmArray.quantity).to.equal("1");
				expect(restoreGtmArray.name).to.equal("Hoodie");
				expect(restoreGtmArray.collection).to.equal("0");
				expect(restoreGtmArray.status).to.equal("view");
				expect(restoreGtmArray.id_only).to.match(/\d{1,3}/);
				expect(restoreGtmArray.sku).to.equal("woo-hoodie-green");
				expect(restoreGtmArray.product_type_0).to.equal("variable");
				expect(restoreGtmArray.product_cat_0).to.equal("Hoodies");
				expect(restoreGtmArray.pa_color_0).to.equal("green");
				expect(restoreGtmArray.pa_color_1).to.equal("Green");
				expect(restoreGtmArray.pa_color_2).to.equal("Blue");
				expect(restoreGtmArray.logo_0).to.equal("No");
				expect(restore.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/product/hoodie/"
				);
			});
			cy.wait("@trackRequest");
		});

		it("product collection", () => {
			cy.visit("/product/logo-collection/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
			});
            cy.wait(3000);
			cy.get(".quantity > input").eq(0).clear().type("1");
			cy.get(".quantity > input").eq(1).clear().type("1");
			cy.get(".quantity > input").eq(2).clear().type("1");
			cy.get(".single_add_to_cart_button").click();

			cy.testAddTrackRequest().then((track) => {
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/product/logo-collection/"
				);
				expect(track.params.ba).to.match(
					/\d{1,3} - Logo Collection;\d{1,3} - Hoodie with Logo;\d{1,3} - T-Shirt;\d{1,3} - Beanie/
				);
				expect(track.params.ca3).to.equal(
					"logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie"
				);
				expect(track.params.cb20).to.equal(";Blue;Gray;Red");
				expect(track.params.cb760).to.equal("0;0;0;0");
				expect(track.params.cg1).to.equal("product");
				expect(track.params.cg2).to.equal("single-product");
				expect(track.params.co).to.equal("81;45;18;18");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.cs802).to.equal("3104");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/product/logo-collection/"
				);
				expect(track.params.qn).to.equal("1;1;1;1");
				expect(track.params.st).to.equal("add");
				expect(track.params.uc713).to.equal("1");

				const add = gtmDataLayer[0];
				const restore = gtmDataLayer[1];
				const addGtmArray = add.mapp.gtmProductArray[0];
				const restoreGtmArray = restore.mapp.gtmProductArray[0];

				expect(add.event).to.equal("mapp.load");
				expect(add.mapp.language).to.equal("en_US");
				expect(add.mapp.pageTitle).to.equal("Logo Collection");
				expect(add.mapp.contentCategory).to.equal("product");
				expect(add.mapp.contentSubcategory).to.equal("single-product");
				expect(add.mapp.taxonomies.product_type[0]).to.equal(
					"grouped;simple;simple;simple"
				);
				expect(add.mapp.taxonomies.product_cat[0]).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(add.mapp.taxonomies.pa_color[0]).to.equal(
					";Blue;Gray;Red"
				);
				expect(add.mapp.productName).to.equal(
					"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
				);
				expect(add.mapp.productCost).to.equal("81;45;18;18");
				expect(add.mapp.productId).to.match(/\d{1,3};\d{1,3};\d{1,3};\d{1,3}/);
				expect(add.mapp.productSKU).to.equal(
					"logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie"
				);
				expect(add.mapp.currency).to.equal("EUR");
				expect(add.mapp.productQuantity).to.equal("1;1;1;1");
				expect(add.mapp.shoppingCartStatus).to.equal("basket");
				expect(add.mapp.productCollection).to.equal("1;0;0;0");
				expect(add.mapp.productCategories[0]).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(add.mapp.productCategory).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(addGtmArray.id).to.match(
					/\d{1,3} - Logo Collection;\d{1,3} - Hoodie with Logo;\d{1,3} - T-Shirt;\d{1,3} - Beanie/
				);
				expect(addGtmArray.cost).to.equal("81;45;18;18");
				expect(addGtmArray.quantity).to.equal("1;1;1;1");
				expect(addGtmArray.name).to.equal(
					"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
				);
				expect(addGtmArray.collection).to.equal("1;0;0;0");
				expect(addGtmArray.status).to.equal("basket");
				expect(addGtmArray.id_only).to.match(/\d{1,3};\d{1,3};\d{1,3};\d{1,3}/);
				expect(addGtmArray.sku).to.equal(
					"logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie"
				);
				expect(addGtmArray.product_type_0).to.equal(
					"grouped;simple;simple;simple"
				);
				expect(addGtmArray.product_cat_0).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(addGtmArray.pa_color_0).to.equal(";Blue;Gray;Red");
				expect(add.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/product/logo-collection/"
				);
				expect(restore.event).to.equal("mapp.restore");
				expect(restore.mapp.language).to.equal("en_US");
				expect(restore.mapp.pageTitle).to.equal("Logo Collection");
				expect(restore.mapp.contentCategory).to.equal("product");
				expect(restore.mapp.contentSubcategory).to.equal(
					"single-product"
				);
				expect(restore.mapp.taxonomies.product_type[0]).to.equal(
					"grouped;simple;simple;simple"
				);
				expect(restore.mapp.taxonomies.product_cat[0]).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(restore.mapp.taxonomies.pa_color[0]).to.equal(
					";Blue;Gray;Red"
				);
				expect(restore.mapp.productName).to.equal(
					"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
				);
				expect(restore.mapp.productCost).to.equal("81;45;18;18");
				expect(restore.mapp.productId).to.match(/\d{1,3};\d{1,3};\d{1,3};\d{1,3}/);
				expect(restore.mapp.productSKU).to.equal(
					"logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie"
				);
				expect(restore.mapp.currency).to.equal("EUR");
				expect(restore.mapp.productQuantity).to.equal("1;1;1;1");
				expect(restore.mapp.shoppingCartStatus).to.equal("view");
				expect(restore.mapp.productCollection).to.equal("1;0;0;0");
				expect(restore.mapp.productCategories[0]).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(restore.mapp.productCategory).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(restoreGtmArray.id).to.match(
					/\d{1,3} - Logo Collection;\d{1,3} - Hoodie with Logo;\d{1,3} - T-Shirt;\d{1,3} - Beanie/
				);
				expect(restoreGtmArray.cost).to.equal("81;45;18;18");
				expect(restoreGtmArray.quantity).to.equal("1;1;1;1");
				expect(restoreGtmArray.name).to.equal(
					"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
				);
				expect(restoreGtmArray.collection).to.equal("1;0;0;0");
				expect(restoreGtmArray.status).to.equal("view");
				expect(restoreGtmArray.id_only).to.match(/\d{1,3};\d{1,3};\d{1,3};\d{1,3}/);
				expect(restoreGtmArray.sku).to.equal(
					"logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie"
				);
				expect(restoreGtmArray.product_type_0).to.equal(
					"grouped;simple;simple;simple"
				);
				expect(restoreGtmArray.product_cat_0).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(restoreGtmArray.pa_color_0).to.equal(";Blue;Gray;Red");
				expect(restore.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/product/logo-collection/"
				);
			});
			cy.wait("@trackRequest");
		});
		it("fast add - sale product", () => {
			cy.visit("/shop/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
			});
            cy.wait(3000);
			cy.get('a[data-product_sku="woo-cap"]').click();

			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ba).to.match(/\d{1,3} - Cap/);
				expect(track.params.ca3).to.equal("woo-cap");
				expect(track.params.cb20).to.equal("Yellow");
				expect(track.params.cb760).to.equal("0");
				expect(track.params.cg1).to.equal("shop-startpage");
				expect(track.params.co).to.equal("16");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.cs802).to.equal("3104");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("view");
				expect(track.params.uc713).to.equal("1");
			});

			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ba).to.match(/\d{1,3} - Cap/);
				expect(track.params.ca3).to.equal("woo-cap");
				expect(track.params.cb20).to.equal("Yellow");
				expect(track.params.cb760).to.equal("0");
				expect(track.params.cg1).to.equal("shop-startpage");
				expect(track.params.co).to.equal("16");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.cs802).to.equal("3104");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("add");
				expect(track.params.uc713).to.equal("1");

				const view = gtmDataLayer[0];
				const add = gtmDataLayer[1];
				const restore = gtmDataLayer[2];
				const viewGtmArray = view.mapp.gtmProductArray[0];
				const addGtmArray = add.mapp.gtmProductArray[0];
				const restoreGtmArray = restore.mapp.gtmProductArray[0];

				expect(view.event).to.equal("mapp.load");
				expect(view.mapp.language).to.equal("en_US");
				expect(view.mapp.pageTitle).to.match(/(Products|Shop)/);
				expect(view.mapp.pageNumber).to.equal("1");
				expect(view.mapp.orderBy).to.equal("default");
				expect(view.mapp.contentCategory).to.equal("shop-startpage");
				expect(view.mapp.currency).to.equal("EUR");
				expect(viewGtmArray.id).to.match(/\d{1,3} - Cap/);
				expect(viewGtmArray.id_only).to.match(/\d{1,3}/);
				expect(viewGtmArray.name).to.equal("Cap");
				expect(viewGtmArray.sku).to.equal("woo-cap");
				expect(viewGtmArray.product_type_0).to.equal("simple");
				expect(viewGtmArray.product_visibility_0).to.equal("featured");
				expect(viewGtmArray.product_cat_0).to.equal("Accessories");
				expect(viewGtmArray.pa_color_0).to.equal("Yellow");
				expect(viewGtmArray.cost).to.equal(16);
				expect(viewGtmArray.quantity).to.equal(1);
				expect(viewGtmArray.status).to.equal("view");
				expect(view.mapp.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(view.mapp.productName).to.equal("Cap");
				expect(view.mapp.productCost).to.equal("16");
				expect(view.mapp.productId).to.match(/\d{1,3}/);
				expect(view.mapp.productSKU).to.equal("woo-cap");
				expect(view.mapp.productQuantity).to.equal("1");
				expect(view.mapp.taxonomies.product_type[0]).to.equal("simple");
				expect(view.mapp.taxonomies.product_visibility[0]).to.equal(
					"featured"
				);
				expect(view.mapp.taxonomies.product_cat[0]).to.equal(
					"Accessories"
				);
				expect(view.mapp.taxonomies.pa_color[0]).to.equal("Yellow");
				expect(view.mapp.productCategories[0]).to.equal("Accessories");
				expect(view.mapp.productCategory).to.equal("Accessories");
				expect(view.mapp.productValue).to.equal(16);
				expect(view.mapp.shoppingCartStatus).to.equal("view");
				expect(view.mapp.pageRequestType).to.equal("virtual");
				expect(add.event).to.equal("mapp.load");
				expect(add.mapp.language).to.equal("en_US");
				expect(add.mapp.pageTitle).to.match(/(Products|Shop)/);
				expect(add.mapp.pageNumber).to.equal("1");
				expect(add.mapp.orderBy).to.equal("default");
				expect(add.mapp.contentCategory).to.equal("shop-startpage");
				expect(add.mapp.currency).to.equal("EUR");
				expect(addGtmArray.id).to.match(/\d{1,3} - Cap/);
				expect(addGtmArray.id_only).to.match(/\d{1,3}/);
				expect(addGtmArray.name).to.equal("Cap");
				expect(addGtmArray.sku).to.equal("woo-cap");
				expect(addGtmArray.product_type_0).to.equal("simple");
				expect(addGtmArray.product_visibility_0).to.equal("featured");
				expect(addGtmArray.product_cat_0).to.equal("Accessories");
				expect(addGtmArray.pa_color_0).to.equal("Yellow");
				expect(addGtmArray.cost).to.equal(16);
				expect(addGtmArray.quantity).to.equal(1);
				expect(addGtmArray.status).to.equal("basket");
				expect(add.mapp.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(add.mapp.productName).to.equal("Cap");
				expect(add.mapp.productCost).to.equal("16");
				expect(add.mapp.productId).to.match(/\d{1,3}/);
				expect(add.mapp.productSKU).to.equal("woo-cap");
				expect(add.mapp.productQuantity).to.equal("1");
				expect(add.mapp.taxonomies.product_type[0]).to.equal("simple");
				expect(add.mapp.taxonomies.product_visibility[0]).to.equal(
					"featured"
				);
				expect(add.mapp.taxonomies.product_cat[0]).to.equal(
					"Accessories"
				);
				expect(add.mapp.taxonomies.pa_color[0]).to.equal("Yellow");
				expect(add.mapp.productCategories[0]).to.equal("Accessories");
				expect(add.mapp.productCategory).to.equal("Accessories");
				expect(add.mapp.productValue).to.equal(16);
				expect(add.mapp.shoppingCartStatus).to.equal("basket");
				expect(add.mapp.pageRequestType).to.equal("virtual");
				expect(restore.event).to.equal("mapp.restore");
				expect(restore.mapp.language).to.equal("en_US");
				expect(restore.mapp.pageTitle).to.match(/(Products|Shop)/);
				expect(restore.mapp.pageNumber).to.equal("1");
				expect(restore.mapp.orderBy).to.equal("default");
				expect(restore.mapp.contentCategory).to.equal("shop-startpage");
				expect(restore.mapp.currency).to.equal("EUR");
				expect(restore.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/shop/"
				);
				const restoreGtmArrayProps = Object.entries(restoreGtmArray);
				expect(restoreGtmArrayProps.length).to.equal(0);
			});
		});

		it("fast add - normal product", () => {
			cy.visit("/shop/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
			});
            cy.wait(3000);

			cy.get('a[data-product_sku="woo-polo"]').click();

			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ba).to.match(/\d{1,3} - Polo/);
				expect(track.params.ca3).to.equal("woo-polo");
				expect(track.params.cb20).to.equal("Blue");
				expect(track.params.cb760).to.equal("0");
				expect(track.params.cg1).to.equal("shop-startpage");
				expect(track.params.co).to.equal("20");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.cs802).to.equal("3104");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("view");
				expect(track.params.uc713).to.equal("1");
			});

			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ba).to.match(/\d{1,3} - Polo/);
				expect(track.params.ca3).to.equal("woo-polo");
				expect(track.params.cb20).to.equal("Blue");
				expect(track.params.cb760).to.equal("0");
				expect(track.params.cg1).to.equal("shop-startpage");
				expect(track.params.co).to.equal("20");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.cs802).to.equal("3104");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("add");
				expect(track.params.uc713).to.equal("1");

				const view = gtmDataLayer[0];
				const add = gtmDataLayer[1];
				const restore = gtmDataLayer[2];
				const viewGtmArray = view.mapp.gtmProductArray[0];
				const addGtmArray = add.mapp.gtmProductArray[0];
				const restoreGtmArray = restore.mapp.gtmProductArray[0];

				expect(view.event).to.equal("mapp.load");
				expect(view.mapp.language).to.equal("en_US");
				expect(view.mapp.pageTitle).to.match(/(Products|Shop)/);
				expect(view.mapp.pageNumber).to.equal("1");
				expect(view.mapp.orderBy).to.equal("default");
				expect(view.mapp.contentCategory).to.equal("shop-startpage");
				expect(view.mapp.currency).to.equal("EUR");

				expect(viewGtmArray.id).to.match(/\d{1,3} - Polo/);
				expect(viewGtmArray.id_only).to.match(/\d{1,3}/);
				expect(viewGtmArray.name).to.equal("Polo");
				expect(viewGtmArray.sku).to.equal("woo-polo");
				expect(viewGtmArray.product_type_0).to.equal("simple");
				expect(viewGtmArray.product_cat_0).to.equal("Tshirts");
				expect(viewGtmArray.pa_color_0).to.equal("Blue");
				expect(viewGtmArray.cost).to.equal(20);
				expect(viewGtmArray.quantity).to.equal(1);
				expect(viewGtmArray.status).to.equal("view");
				expect(view.mapp.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(view.mapp.productName).to.equal("Polo");
				expect(view.mapp.productCost).to.equal("20");
				expect(view.mapp.productId).to.match(/\d{1,3}/);
				expect(view.mapp.productSKU).to.equal("woo-polo");
				expect(view.mapp.productQuantity).to.equal("1");
				expect(view.mapp.taxonomies.product_type[0]).to.equal("simple");
				expect(view.mapp.taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(view.mapp.taxonomies.pa_color[0]).to.equal("Blue");
				expect(view.mapp.productCategories[0]).to.equal("Tshirts");
				expect(view.mapp.productCategory).to.equal("Tshirts");
				expect(view.mapp.productValue).to.equal(20);
				expect(view.mapp.shoppingCartStatus).to.equal("view");
				expect(view.mapp.pageRequestType).to.equal("virtual");
				expect(add.event).to.equal("mapp.load");
				expect(add.mapp.language).to.equal("en_US");
				expect(add.mapp.pageTitle).to.match(/(Products|Shop)/);
				expect(add.mapp.pageNumber).to.equal("1");
				expect(add.mapp.orderBy).to.equal("default");
				expect(add.mapp.contentCategory).to.equal("shop-startpage");
				expect(add.mapp.currency).to.equal("EUR");

				expect(addGtmArray.id).to.match(/\d{1,3} - Polo/);
				expect(addGtmArray.id_only).to.match(/\d{1,3}/);
				expect(addGtmArray.name).to.equal("Polo");
				expect(addGtmArray.sku).to.equal("woo-polo");
				expect(addGtmArray.product_type_0).to.equal("simple");
				expect(addGtmArray.product_cat_0).to.equal("Tshirts");
				expect(addGtmArray.pa_color_0).to.equal("Blue");
				expect(addGtmArray.cost).to.equal(20);
				expect(addGtmArray.quantity).to.equal(1);
				expect(addGtmArray.status).to.equal("basket");
				expect(add.mapp.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(add.mapp.productName).to.equal("Polo");
				expect(add.mapp.productCost).to.equal("20");
				expect(add.mapp.productId).to.match(/\d{1,3}/);
				expect(add.mapp.productSKU).to.equal("woo-polo");
				expect(add.mapp.productQuantity).to.equal("1");
				expect(add.mapp.taxonomies.product_type[0]).to.equal("simple");
				expect(add.mapp.taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(add.mapp.taxonomies.pa_color[0]).to.equal("Blue");
				expect(add.mapp.productCategories[0]).to.equal("Tshirts");
				expect(add.mapp.productCategory).to.equal("Tshirts");
				expect(add.mapp.productValue).to.equal(20);
				expect(add.mapp.shoppingCartStatus).to.equal("basket");
				expect(add.mapp.pageRequestType).to.equal("virtual");
				expect(restore.event).to.equal("mapp.restore");
				expect(restore.mapp.language).to.equal("en_US");
				expect(restore.mapp.pageTitle).to.match(/(Products|Shop)/);
				expect(restore.mapp.pageNumber).to.equal("1");
				expect(restore.mapp.orderBy).to.equal("default");
				expect(restore.mapp.contentCategory).to.equal("shop-startpage");
				expect(restore.mapp.currency).to.equal("EUR");
				expect(restore.mapp.pageName).to.equal(
					"mapp_e2e_wp.test/shop/"
				);
				const restoreGtmArrayProps = Object.entries(restoreGtmArray);
				expect(restoreGtmArrayProps.length).to.equal(0);
			});
		});
	});

	describe("Tag Integration", () => {
		before(cy.activateTI);
		beforeEach(() => {
			cy.interceptTracking();
			cy.interceptAddRequest();
		});
		let tiDataLayer;

		it("sale product", () => {
			cy.visit("/product/beanie-with-logo/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnTiDataLayer().then((d) => (tiDataLayer = d));
			});
            cy.wait(3000);
			cy.get('[name="add-to-cart"]')
				.click()
				.then(() => {
					cy.testAddTrackRequest().then((track) => {
						expect(track.pageName).to.equal(
							"mapp_e2e_wp.test/product/beanie-with-logo/"
						);
						expect(track.params.ba).to.match(/\d{1,3}/)
						expect(track.params.ca1).to.equal("Accessories");
						expect(track.params.ca3).to.equal("Beanie with Logo");
						expect(track.params.cg1).to.equal("product");
						expect(track.params.cg2).to.equal("single-product");
						expect(track.params.co).to.equal("18");
						expect(track.params.cr).to.equal("EUR");
						expect(track.params.pu).to.equal(
							"http://mapp_e2e_wp.test/product/beanie-with-logo/"
						);
						expect(track.params.qn).to.equal("1");
						expect(track.params.st).to.equal("add");

						expect(tiDataLayer[0].language).to.equal("en_US");
						expect(tiDataLayer[0].pageTitle).to.equal(
							"Beanie with Logo"
						);
						expect(tiDataLayer[0].contentCategory).to.equal(
							"product"
						);
						expect(tiDataLayer[0].contentSubcategory).to.equal(
							"single-product"
						);
						expect(
							tiDataLayer[0].taxonomies.product_type[0]
						).to.equal("simple");
						expect(
							tiDataLayer[0].taxonomies.product_cat[0]
						).to.equal("Accessories");
						expect(tiDataLayer[0].taxonomies.pa_color[0]).to.equal(
							"Red"
						);
						expect(tiDataLayer[0].productName).to.equal(
							"Beanie with Logo"
						);
						expect(tiDataLayer[0].productCost).to.equal(18);
						expect(tiDataLayer[0].productId).to.match(/\d{1,3}/);
						expect(tiDataLayer[0].productSKU).to.equal(
							"Woo-beanie-logo"
						);
						expect(tiDataLayer[0].currency).to.equal("EUR");
						expect(tiDataLayer[0].productQuantity).to.equal("1");
						expect(tiDataLayer[0].shoppingCartStatus).to.equal(
							"add"
						);
						expect(tiDataLayer[0].productCollection).to.equal("0");
						expect(tiDataLayer[0].productCategories[0]).to.equal(
							"Accessories"
						);
						expect(tiDataLayer[0].productCategory).to.equal(
							"Accessories"
						);
						expect(tiDataLayer[0].pageName).to.equal(
							"mapp_e2e_wp.test/product/beanie-with-logo/"
						);
					});
				});
			cy.wait("@trackRequest");
		});

		it("normal product", () => {
			cy.visit("/product/long-sleeve-tee/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnTiDataLayer().then((d) => (tiDataLayer = d));
			});
            cy.wait(3000);
			cy.get('[name="add-to-cart"]')
				.click()
				.then(() => {
					cy.testAddTrackRequest().then((track) => {
						expect(track.pageName).to.equal(
							"mapp_e2e_wp.test/product/long-sleeve-tee/"
						);
						expect(track.params.ba).to.match(/\d{1,3}/);
						expect(track.params.ca1).to.equal("Tshirts");
						expect(track.params.ca3).to.equal("Long Sleeve Tee");
						expect(track.params.cg1).to.equal("product");
						expect(track.params.cg2).to.equal("single-product");
						expect(track.params.co).to.equal("25");
						expect(track.params.cr).to.equal("EUR");
						expect(track.params.pu).to.equal(
							"http://mapp_e2e_wp.test/product/long-sleeve-tee/"
						);
						expect(track.params.qn).to.equal("1");
						expect(track.params.st).to.equal("add");

						expect(tiDataLayer[0].language).to.equal("en_US");
						expect(tiDataLayer[0].pageTitle).to.equal(
							"Long Sleeve Tee"
						);
						expect(tiDataLayer[0].contentCategory).to.equal(
							"product"
						);
						expect(tiDataLayer[0].contentSubcategory).to.equal(
							"single-product"
						);
						expect(
							tiDataLayer[0].taxonomies.product_type[0]
						).to.equal("simple");
						expect(
							tiDataLayer[0].taxonomies.product_cat[0]
						).to.equal("Tshirts");
						expect(tiDataLayer[0].taxonomies.pa_color[0]).to.equal(
							"Green"
						);
						expect(tiDataLayer[0].productName).to.equal(
							"Long Sleeve Tee"
						);
						expect(tiDataLayer[0].productCost).to.equal(25);
						expect(tiDataLayer[0].productId).to.match(/\d{1,3}/);
						expect(tiDataLayer[0].productSKU).to.equal(
							"woo-long-sleeve-tee"
						);
						expect(tiDataLayer[0].currency).to.equal("EUR");
						expect(tiDataLayer[0].productQuantity).to.equal("1");
						expect(tiDataLayer[0].shoppingCartStatus).to.equal(
							"add"
						);
						expect(tiDataLayer[0].productCollection).to.equal("0");
						expect(tiDataLayer[0].productCategories[0]).to.equal(
							"Tshirts"
						);
						expect(tiDataLayer[0].productCategory).to.equal(
							"Tshirts"
						);
						expect(tiDataLayer[0].pageName).to.equal(
							"mapp_e2e_wp.test/product/long-sleeve-tee/"
						);
					});
				});
			cy.wait("@trackRequest");
		});

		it("product variation", () => {
			cy.visit("/product/hoodie/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnTiDataLayer().then((d) => (tiDataLayer = d));
			});
            cy.wait(3000);
			cy.get("#pa_color").select("green");
			cy.get("#logo").select("No");

			cy.wait("@trackRequest");
			cy.wait(3000);
			cy.get(".single_add_to_cart_button").click();
			cy.testAddTrackRequest().then((track) => {
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/product/hoodie/"
				);
				expect(track.params.ba).to.match(/\d{1,3}/);			
				expect(track.params.ca1).to.equal("Hoodies");
				expect(track.params.ca3).to.equal("Hoodie");
				expect(track.params.cg1).to.equal("product");
				expect(track.params.cg2).to.equal("single-product");
				expect(track.params.co).to.equal("45");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/product/hoodie/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("add");

				expect(tiDataLayer[0].language).to.equal("en_US");
				expect(tiDataLayer[0].pageTitle).to.equal("Hoodie");
				expect(tiDataLayer[0].contentCategory).to.equal("product");
				expect(tiDataLayer[0].contentSubcategory).to.equal(
					"single-product"
				);
				expect(tiDataLayer[0].taxonomies.product_type[0]).to.equal(
					"variable"
				);
				expect(tiDataLayer[0].taxonomies.product_cat[0]).to.equal(
					"Hoodies"
				);
				expect(tiDataLayer[0].taxonomies.pa_color[0]).to.equal("green");
				expect(tiDataLayer[0].taxonomies.logo[0]).to.equal("No");
				expect(tiDataLayer[0].productName).to.equal("Hoodie");
				expect(tiDataLayer[0].productCost).to.equal("45");
				expect(tiDataLayer[0].productId).to.match(/\d{1,3}/);
				expect(tiDataLayer[0].productSKU).to.equal("woo-hoodie-green");
				expect(tiDataLayer[0].currency).to.equal("EUR");
				expect(tiDataLayer[0].productQuantity).to.equal("1");
				expect(tiDataLayer[0].shoppingCartStatus).to.equal("view");
				expect(tiDataLayer[0].productCollection).to.equal("0");
				expect(tiDataLayer[0].productCategories[0]).to.equal("Hoodies");
				expect(tiDataLayer[0].productCategory).to.equal("Hoodies");
				expect(tiDataLayer[0].pageName).to.equal(
					"mapp_e2e_wp.test/product/hoodie/"
				);
				expect(tiDataLayer[1].language).to.equal("en_US");
				expect(tiDataLayer[1].pageTitle).to.equal("Hoodie");
				expect(tiDataLayer[1].contentCategory).to.equal("product");
				expect(tiDataLayer[1].contentSubcategory).to.equal(
					"single-product"
				);
				expect(tiDataLayer[1].taxonomies.product_type[0]).to.equal(
					"variable"
				);
				expect(tiDataLayer[1].taxonomies.product_cat[0]).to.equal(
					"Hoodies"
				);
				expect(tiDataLayer[1].taxonomies.pa_color[0]).to.equal("green");
				expect(tiDataLayer[1].taxonomies.logo[0]).to.equal("No");
				expect(tiDataLayer[1].productName).to.equal("Hoodie");
				expect(tiDataLayer[1].productCost).to.equal(45);
				expect(tiDataLayer[1].productId).to.match(/\d{1,3}/);
				expect(tiDataLayer[1].productSKU).to.equal("woo-hoodie-green");
				expect(tiDataLayer[1].currency).to.equal("EUR");
				expect(tiDataLayer[1].productQuantity).to.equal("1");
				expect(tiDataLayer[1].shoppingCartStatus).to.equal("add");
				expect(tiDataLayer[1].productCollection).to.equal("0");
				expect(tiDataLayer[1].productCategories[0]).to.equal("Hoodies");
				expect(tiDataLayer[1].productCategory).to.equal("Hoodies");
				expect(tiDataLayer[1].pageName).to.equal(
					"mapp_e2e_wp.test/product/hoodie/"
				);
			});
			cy.wait("@trackRequest");
		});

		it("product collection", () => {
			cy.visit("/product/logo-collection/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnTiDataLayer().then((d) => (tiDataLayer = d));
			});
            cy.wait(3000);
			cy.get(".quantity > input").eq(0).clear().type("1");
			cy.get(".quantity > input").eq(1).clear().type("1");
			cy.get(".quantity > input").eq(2).clear().type("1");
			cy.get(".single_add_to_cart_button").click();

			cy.testAddTrackRequest().then((track) => {
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/product/logo-collection/"
				);
				expect(track.params.ba).to.match(/\d{1,3};\d{1,3};\d{1,3};\d{1,3}/);
				expect(track.params.ca1).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(track.params.ca3).to.equal(
					"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
				);
				expect(track.params.cg1).to.equal("product");
				expect(track.params.cg2).to.equal("single-product");
				expect(track.params.co).to.equal("81;45;18;18");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/product/logo-collection/"
				);
				expect(track.params.qn).to.equal("1;1;1;1");
				expect(track.params.st).to.equal("add");

				expect(tiDataLayer[0].language).to.equal("en_US");
				expect(tiDataLayer[0].pageTitle).to.equal("Logo Collection");
				expect(tiDataLayer[0].contentCategory).to.equal("product");
				expect(tiDataLayer[0].contentSubcategory).to.equal(
					"single-product"
				);
				expect(tiDataLayer[0].taxonomies.product_type[0]).to.equal(
					"grouped;simple;simple;simple"
				);
				expect(tiDataLayer[0].taxonomies.product_cat[0]).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(tiDataLayer[0].taxonomies.pa_color[0]).to.equal(
					";Blue;Gray;Red"
				);
				expect(tiDataLayer[0].productName).to.equal(
					"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
				);
				expect(tiDataLayer[0].productCost).to.equal("81;45;18;18");
				expect(tiDataLayer[0].productId).to.match(/\d{1,3};\d{1,3};\d{1,3};\d{1,3}/);
				expect(tiDataLayer[0].productSKU).to.equal(
					"logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie"
				);
				expect(tiDataLayer[0].currency).to.equal("EUR");
				expect(tiDataLayer[0].productQuantity).to.equal("1;1;1;1");
				expect(tiDataLayer[0].shoppingCartStatus).to.equal("add");
				expect(tiDataLayer[0].productCollection).to.equal("1;0;0;0");
				expect(tiDataLayer[0].productCategories[0]).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(tiDataLayer[0].productCategory).to.equal(
					"Clothing;Hoodies;Tshirts;Accessories"
				);
				expect(tiDataLayer[0].pageName).to.equal(
					"mapp_e2e_wp.test/product/logo-collection/"
				);
			});
			cy.wait("@trackRequest");
		});

		it("fast add - sale product", () => {
			cy.visit("/shop/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnTiDataLayer().then((d) => (tiDataLayer = d));
			});
            cy.wait(3000);
			cy.get('a[data-product_sku="woo-cap"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ct).to.equal("mapp_e2e_wp.test.shop.");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
			});

			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ba).to.match(/\d{1,3}/);		
				expect(track.params.ca1).to.equal("Accessories");
				expect(track.params.ca3).to.equal("Cap");
				expect(track.params.cg1).to.equal("shop-startpage");
				expect(track.params.cg20).to.equal("1");
				expect(track.params.co).to.equal("16");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("view");
			});

			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ba).to.match(/\d{1,3}/);		
				expect(track.params.ca1).to.equal("Accessories");
				expect(track.params.ca3).to.equal("Cap");
				expect(track.params.cg1).to.equal("shop-startpage");
				expect(track.params.cg20).to.equal("1");
				expect(track.params.co).to.equal("16");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("add");

				expect(tiDataLayer[0].language).to.equal("en_US");
				expect(tiDataLayer[0].pageTitle).to.match(/(Products|Shop)/);
				expect(tiDataLayer[0].pageNumber).to.equal("1");
				expect(tiDataLayer[0].orderBy).to.equal("default");
				expect(tiDataLayer[0].contentCategory).to.equal(
					"shop-startpage"
				);
				expect(tiDataLayer[0].currency).to.equal("EUR");
				expect(tiDataLayer[0].pageName).to.equal(
					"mapp_e2e_wp.test/shop/"
				);
				expect(tiDataLayer[0].productName).to.equal("Cap");
				expect(tiDataLayer[0].productCost).to.equal("16");
				expect(tiDataLayer[0].productId).to.match(/\d{1,3}/);
				expect(tiDataLayer[0].productSKU).to.equal("woo-cap");
				expect(tiDataLayer[0].productQuantity).to.equal("1");
				expect(tiDataLayer[0].taxonomies.product_type[0]).to.equal(
					"simple"
				);
				expect(
					tiDataLayer[0].taxonomies.product_visibility[0]
				).to.equal("featured");
				expect(tiDataLayer[0].taxonomies.product_cat[0]).to.equal(
					"Accessories"
				);
				expect(tiDataLayer[0].taxonomies.pa_color[0]).to.equal(
					"Yellow"
				);
				expect(tiDataLayer[0].productCategories[0]).to.equal(
					"Accessories"
				);
				expect(tiDataLayer[0].productCategory).to.equal("Accessories");
				expect(tiDataLayer[0].productValue).to.equal(16);
				expect(tiDataLayer[0].shoppingCartStatus).to.equal("view");
				expect(tiDataLayer[0].pageRequestType).to.equal("virtual");
				expect(tiDataLayer[1].language).to.equal("en_US");
				expect(tiDataLayer[1].pageTitle).to.match(/(Products|Shop)/);
				expect(tiDataLayer[1].pageNumber).to.equal("1");
				expect(tiDataLayer[1].orderBy).to.equal("default");
				expect(tiDataLayer[1].contentCategory).to.equal(
					"shop-startpage"
				);
				expect(tiDataLayer[1].currency).to.equal("EUR");
				expect(tiDataLayer[1].pageName).to.equal(
					"mapp_e2e_wp.test/shop/"
				);
				expect(tiDataLayer[1].productName).to.equal("Cap");
				expect(tiDataLayer[1].productCost).to.equal("16");
				expect(tiDataLayer[1].productId).to.match(/\d{1,3}/);
				expect(tiDataLayer[1].productSKU).to.equal("woo-cap");
				expect(tiDataLayer[1].productQuantity).to.equal("1");
				expect(tiDataLayer[1].taxonomies.product_type[0]).to.equal(
					"simple"
				);
				expect(
					tiDataLayer[1].taxonomies.product_visibility[0]
				).to.equal("featured");
				expect(tiDataLayer[1].taxonomies.product_cat[0]).to.equal(
					"Accessories"
				);
				expect(tiDataLayer[1].taxonomies.pa_color[0]).to.equal(
					"Yellow"
				);
				expect(tiDataLayer[1].productCategories[0]).to.equal(
					"Accessories"
				);
				expect(tiDataLayer[1].productCategory).to.equal("Accessories");
				expect(tiDataLayer[1].productValue).to.equal(16);
				expect(tiDataLayer[1].shoppingCartStatus).to.equal("add");
				expect(tiDataLayer[1].pageRequestType).to.equal("virtual");
			});
		});

		it("fast add - normal product", () => {
			cy.visit("/shop/");
			cy.wait("@trackRequest").then(() => {
				cy.spyOnTiDataLayer().then((d) => (tiDataLayer = d));
			});
            cy.wait(3000);
			cy.get('a[data-product_sku="woo-polo"]').click();
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ct).to.equal("mapp_e2e_wp.test.shop.");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
			});
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ba).to.match(/\d{1,3}/);			
				expect(track.params.ca1).to.equal("Tshirts");
				expect(track.params.ca3).to.equal("Polo");
				expect(track.params.cg1).to.equal("shop-startpage");
				expect(track.params.cg20).to.equal("1");
				expect(track.params.co).to.equal("20");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("view");
			});
			cy.testTrackRequest().then((track) => {
				expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(track.params.ba).to.match(/\d{1,3}/);			
				expect(track.params.ca1).to.equal("Tshirts");
				expect(track.params.ca3).to.equal("Polo");
				expect(track.params.cg1).to.equal("shop-startpage");
				expect(track.params.cg20).to.equal("1");
				expect(track.params.co).to.equal("20");
				expect(track.params.cr).to.equal("EUR");
				expect(track.params.pu).to.equal(
					"http://mapp_e2e_wp.test/shop/"
				);
				expect(track.params.qn).to.equal("1");
				expect(track.params.st).to.equal("add");

				const view = tiDataLayer[0];
				const add = tiDataLayer[1];
				expect(view.language).to.equal("en_US");
				expect(view.pageTitle).to.match(/(Products|Shop)/);
				expect(view.pageNumber).to.equal("1");
				expect(view.orderBy).to.equal("default");
				expect(view.contentCategory).to.equal("shop-startpage");
				expect(view.currency).to.equal("EUR");
				expect(view.pageName).to.equal("mapp_e2e_wp.test/shop/");
				expect(view.productName).to.equal("Polo");
				expect(view.productCost).to.equal("20");
				expect(view.productId).to.match(/\d{1,3}/);
				expect(view.productSKU).to.equal("woo-polo");
				expect(view.productQuantity).to.equal("1");
				expect(view.taxonomies.product_type[0]).to.equal("simple");
				expect(view.taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(view.taxonomies.pa_color[0]).to.equal("Blue");
				expect(view.productCategories[0]).to.equal("Tshirts");
				expect(view.productCategory).to.equal("Tshirts");
				expect(view.productValue).to.equal(20);
				expect(view.shoppingCartStatus).to.equal("view");
				expect(view.pageRequestType).to.equal("virtual");
				expect(add.language).to.equal("en_US");
				expect(add.pageTitle).to.match(/(Products|Shop)/);
				expect(add.pageNumber).to.equal("1");
				expect(add.orderBy).to.equal("default");
				expect(add.contentCategory).to.equal("shop-startpage");
				expect(add.currency).to.equal("EUR");
				expect(add.productName).to.equal("Polo");
				expect(add.productCost).to.equal("20");
				expect(add.productId).to.match(/\d{1,3}/);
				expect(add.productSKU).to.equal("woo-polo");
				expect(add.productQuantity).to.equal("1");
				expect(add.taxonomies.product_type[0]).to.equal("simple");
				expect(add.taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(add.taxonomies.pa_color[0]).to.equal("Blue");
				expect(add.productCategories[0]).to.equal("Tshirts");
				expect(add.productCategory).to.equal("Tshirts");
				expect(add.productValue).to.equal(20);
				expect(add.shoppingCartStatus).to.equal("add");
				expect(add.pageRequestType).to.equal("virtual");
			});
		});
	});
});
