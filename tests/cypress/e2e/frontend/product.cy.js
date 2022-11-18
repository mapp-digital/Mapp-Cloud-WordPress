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
				expect(dataLayer[0].language).to.equal("en_US");
				expect(dataLayer[0].pageTitle).to.equal("Products");
				expect(dataLayer[0].pageNumber).to.equal("1");
				expect(dataLayer[0].orderBy).to.equal("default");
				expect(dataLayer[0].contentCategory).to.equal("shop-startpage");
				expect(dataLayer[0].currency).to.equal("EUR");
				expect(dataLayer[0].products[0].productName).to.equal("Album");
				expect(dataLayer[0].products[0].productCost).to.equal("15");
				expect(dataLayer[0].products[0].productId).to.equal("18");
				expect(dataLayer[0].products[0].productSKU).to.equal("woo-album");
				expect(dataLayer[0].products[0].productQuantity).to.equal("1");
				expect(dataLayer[0].products[0].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[0].taxonomies.product_cat[0]).to.equal("Music");
				expect(dataLayer[0].products[0].productCategories[0]).to.equal("Music");
				expect(dataLayer[0].products[0].productCategory).to.equal("Music");
				expect(dataLayer[0].products[1].productName).to.equal("Beanie");
				expect(dataLayer[0].products[1].productCost).to.equal("18");
				expect(dataLayer[0].products[1].productId).to.equal("10");
				expect(dataLayer[0].products[1].productSKU).to.equal("woo-beanie");
				expect(dataLayer[0].products[1].productQuantity).to.equal("1");
				expect(dataLayer[0].products[1].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[1].taxonomies.product_cat[0]).to.equal("Accessories");
				expect(dataLayer[0].products[1].taxonomies.pa_color[0]).to.equal("Red");
				expect(dataLayer[0].products[1].productCategories[0]).to.equal("Accessories");
				expect(dataLayer[0].products[1].productCategory).to.equal("Accessories");
				expect(dataLayer[0].products[2].productName).to.equal("Beanie with Logo");
				expect(dataLayer[0].products[2].productCost).to.equal("18");
				expect(dataLayer[0].products[2].productId).to.equal("27");
				expect(dataLayer[0].products[2].productSKU).to.equal("Woo-beanie-logo");
				expect(dataLayer[0].products[2].productQuantity).to.equal("1");
				expect(dataLayer[0].products[2].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[2].taxonomies.product_cat[0]).to.equal("Accessories");
				expect(dataLayer[0].products[2].taxonomies.pa_color[0]).to.equal("Red");
				expect(dataLayer[0].products[2].productCategories[0]).to.equal("Accessories");
				expect(dataLayer[0].products[2].productCategory).to.equal("Accessories");
				expect(dataLayer[0].products[3].productName).to.equal("Belt");
				expect(dataLayer[0].products[3].productCost).to.equal("55");
				expect(dataLayer[0].products[3].productId).to.equal("11");
				expect(dataLayer[0].products[3].productSKU).to.equal("woo-belt");
				expect(dataLayer[0].products[3].productQuantity).to.equal("1");
				expect(dataLayer[0].products[3].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[3].taxonomies.product_cat[0]).to.equal("Accessories");
				expect(dataLayer[0].products[3].productCategories[0]).to.equal("Accessories");
				expect(dataLayer[0].products[3].productCategory).to.equal("Accessories");
				expect(dataLayer[0].products[4].productName).to.equal("Cap");
				expect(dataLayer[0].products[4].productCost).to.equal("16");
				expect(dataLayer[0].products[4].productId).to.equal("12");
				expect(dataLayer[0].products[4].productSKU).to.equal("woo-cap");
				expect(dataLayer[0].products[4].productQuantity).to.equal("1");
				expect(dataLayer[0].products[4].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[4].taxonomies.product_visibility[0]).to.equal("featured");
				expect(dataLayer[0].products[4].taxonomies.product_cat[0]).to.equal("Accessories");
				expect(dataLayer[0].products[4].taxonomies.pa_color[0]).to.equal("Yellow");
				expect(dataLayer[0].products[4].productCategories[0]).to.equal("Accessories");
				expect(dataLayer[0].products[4].productCategory).to.equal("Accessories");
				expect(dataLayer[0].products[5].productName).to.equal("Hoodie");
				expect(dataLayer[0].products[5].productCost).to.equal("42");
				expect(dataLayer[0].products[5].productId).to.equal("7");
				expect(dataLayer[0].products[5].productSKU).to.equal("woo-hoodie");
				expect(dataLayer[0].products[5].productQuantity).to.equal("1");
				expect(dataLayer[0].products[5].taxonomies.product_type[0]).to.equal("variable");
				expect(dataLayer[0].products[5].taxonomies.product_cat[0]).to.equal("Hoodies");
				expect(dataLayer[0].products[5].taxonomies.pa_color[0]).to.equal("Red");
				expect(dataLayer[0].products[5].taxonomies.pa_color[1]).to.equal("Green");
				expect(dataLayer[0].products[5].taxonomies.pa_color[2]).to.equal("Blue");
				expect(dataLayer[0].products[5].productCategories[0]).to.equal("Hoodies");
				expect(dataLayer[0].products[5].productCategory).to.equal("Hoodies");
				expect(dataLayer[0].products[6].productName).to.equal("Hoodie with Logo");
				expect(dataLayer[0].products[6].productCost).to.equal("45");
				expect(dataLayer[0].products[6].productId).to.equal("8");
				expect(dataLayer[0].products[6].productSKU).to.equal("woo-hoodie-with-logo");
				expect(dataLayer[0].products[6].productQuantity).to.equal("1");
				expect(dataLayer[0].products[6].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[6].taxonomies.product_cat[0]).to.equal("Hoodies");
				expect(dataLayer[0].products[6].taxonomies.pa_color[0]).to.equal("Blue");
				expect(dataLayer[0].products[6].productCategories[0]).to.equal("Hoodies");
				expect(dataLayer[0].products[6].productCategory).to.equal("Hoodies");
				expect(dataLayer[0].products[7].productName).to.equal("Hoodie with Zipper");
				expect(dataLayer[0].products[7].productCost).to.equal("45");
				expect(dataLayer[0].products[7].productId).to.equal("15");
				expect(dataLayer[0].products[7].productSKU).to.equal("woo-hoodie-with-zipper");
				expect(dataLayer[0].products[7].productQuantity).to.equal("1");
				expect(dataLayer[0].products[7].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[7].taxonomies.product_visibility[0]).to.equal("featured");
				expect(dataLayer[0].products[7].taxonomies.product_cat[0]).to.equal("Hoodies");
				expect(dataLayer[0].products[7].productCategories[0]).to.equal("Hoodies");
				expect(dataLayer[0].products[7].productCategory).to.equal("Hoodies");
				expect(dataLayer[0].products[8].productName).to.equal("Logo Collection");
				expect(dataLayer[0].products[8].productCost).to.equal("18");
				expect(dataLayer[0].products[8].productId).to.equal("28");
				expect(dataLayer[0].products[8].productSKU).to.equal("logo-collection");
				expect(dataLayer[0].products[8].productQuantity).to.equal("1");
				expect(dataLayer[0].products[8].taxonomies.product_type[0]).to.equal("grouped");
				expect(dataLayer[0].products[8].taxonomies.product_cat[0]).to.equal("Clothing");
				expect(dataLayer[0].products[8].productCategories[0]).to.equal("Clothing");
				expect(dataLayer[0].products[8].productCategory).to.equal("Clothing");
				expect(dataLayer[0].products[9].productName).to.equal("Long Sleeve Tee");
				expect(dataLayer[0].products[9].productCost).to.equal("25");
				expect(dataLayer[0].products[9].productId).to.equal("16");
				expect(dataLayer[0].products[9].productSKU).to.equal("woo-long-sleeve-tee");
				expect(dataLayer[0].products[9].productQuantity).to.equal("1");
				expect(dataLayer[0].products[9].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[9].taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[9].taxonomies.pa_color[0]).to.equal("Green");
				expect(dataLayer[0].products[9].productCategories[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[9].productCategory).to.equal("Tshirts");
				expect(dataLayer[0].products[10].productName).to.equal("Polo");
				expect(dataLayer[0].products[10].productCost).to.equal("20");
				expect(dataLayer[0].products[10].productId).to.equal("17");
				expect(dataLayer[0].products[10].productSKU).to.equal("woo-polo");
				expect(dataLayer[0].products[10].productQuantity).to.equal("1");
				expect(dataLayer[0].products[10].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[10].taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[10].taxonomies.pa_color[0]).to.equal("Blue");
				expect(dataLayer[0].products[10].productCategories[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[10].productCategory).to.equal("Tshirts");
				expect(dataLayer[0].products[11].productName).to.equal("Single");
				expect(dataLayer[0].products[11].productCost).to.equal("2");
				expect(dataLayer[0].products[11].productId).to.equal("19");
				expect(dataLayer[0].products[11].productSKU).to.equal("woo-single");
				expect(dataLayer[0].products[11].productQuantity).to.equal("1");
				expect(dataLayer[0].products[11].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[11].taxonomies.product_cat[0]).to.equal("Music");
				expect(dataLayer[0].products[11].productCategories[0]).to.equal("Music");
				expect(dataLayer[0].products[11].productCategory).to.equal("Music");
				expect(dataLayer[0].products[12].productName).to.equal("Sunglasses");
				expect(dataLayer[0].products[12].productCost).to.equal("90");
				expect(dataLayer[0].products[12].productId).to.equal("13");
				expect(dataLayer[0].products[12].productSKU).to.equal("woo-sunglasses");
				expect(dataLayer[0].products[12].productQuantity).to.equal("1");
				expect(dataLayer[0].products[12].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[12].taxonomies.product_visibility[0]).to.equal("featured");
				expect(dataLayer[0].products[12].taxonomies.product_cat[0]).to.equal("Accessories");
				expect(dataLayer[0].products[12].productCategories[0]).to.equal("Accessories");
				expect(dataLayer[0].products[12].productCategory).to.equal("Accessories");
				expect(dataLayer[0].products[13].productName).to.equal("T-Shirt");
				expect(dataLayer[0].products[13].productCost).to.equal("18");
				expect(dataLayer[0].products[13].productId).to.equal("9");
				expect(dataLayer[0].products[13].productSKU).to.equal("woo-tshirt");
				expect(dataLayer[0].products[13].productQuantity).to.equal("1");
				expect(dataLayer[0].products[13].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[13].taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[13].taxonomies.pa_color[0]).to.equal("Gray");
				expect(dataLayer[0].products[13].productCategories[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[13].productCategory).to.equal("Tshirts");
				expect(dataLayer[0].products[14].productName).to.equal("T-Shirt with Logo");
				expect(dataLayer[0].products[14].productCost).to.equal("18");
				expect(dataLayer[0].products[14].productId).to.equal("26");
				expect(dataLayer[0].products[14].productSKU).to.equal("Woo-tshirt-logo");
				expect(dataLayer[0].products[14].productQuantity).to.equal("1");
				expect(dataLayer[0].products[14].taxonomies.product_type[0]).to.equal("simple");
				expect(dataLayer[0].products[14].taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[14].taxonomies.pa_color[0]).to.equal("Gray");
				expect(dataLayer[0].products[14].productCategories[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[14].productCategory).to.equal("Tshirts");
				expect(dataLayer[0].products[15].productName).to.equal("V-Neck T-Shirt");
				expect(dataLayer[0].products[15].productCost).to.equal("15");
				expect(dataLayer[0].products[15].productId).to.equal("6");
				expect(dataLayer[0].products[15].productSKU).to.equal("woo-vneck-tee");
				expect(dataLayer[0].products[15].productQuantity).to.equal("1");
				expect(dataLayer[0].products[15].taxonomies.product_type[0]).to.equal("variable");
				expect(dataLayer[0].products[15].taxonomies.product_visibility[0]).to.equal("featured");
				expect(dataLayer[0].products[15].taxonomies.product_cat[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[15].taxonomies.pa_color[0]).to.equal("Red");
				expect(dataLayer[0].products[15].taxonomies.pa_color[1]).to.equal("Green");
				expect(dataLayer[0].products[15].taxonomies.pa_color[2]).to.equal("Blue");
				expect(dataLayer[0].products[15].taxonomies.pa_size[0]).to.equal("Small");
				expect(dataLayer[0].products[15].taxonomies.pa_size[1]).to.equal("Medium");
				expect(dataLayer[0].products[15].taxonomies.pa_size[2]).to.equal("Large");
				expect(dataLayer[0].products[15].productCategories[0]).to.equal("Tshirts");
				expect(dataLayer[0].products[15].productCategory).to.equal("Tshirts");
				expect(dataLayer[0].pageName).to.equal("mapp_e2e_wp.test/shop/");
			});
		});

		it("Category", () => {
			cy.visit("/product-category/accessories/");
			cy.testTrackRequest().then((track) => {
				expect(track.version).to.equal("6");
				expect(track.pageName).to.equal(
					"mapp_e2e_wp.test/product-category/accessories/"
				);
				expect(track.params.cg1).to.equal("archive");
				expect(track.params.cg2).to.equal("tax-product");
			});
			cy.getGtmDataLayer().then((dataLayer) => {
				expect(dataLayer[0].pageName).to.equal(
					"mapp_e2e_wp.test/product-category/accessories/"
				);
				expect(dataLayer[0].contentCategory).to.equal("archive");
				expect(dataLayer[0].contentSubcategory).to.equal("tax-product");
				expect(dataLayer[0].pageTitle).to.equal(
					"Accessories | Product categories"
				);
				expect(dataLayer[0].currency).to.equal("EUR");
				expect(dataLayer[0].products.length).to.equal(5);
				expect(dataLayer[0].orderBy).to.equal("default");
			});
		});

		describe("view", () => {
			it("sale product", () => {
				cy.visit("/product/beanie-with-logo/");
				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/beanie-with-logo/"
					);
					expect(track.params.ba).to.equal("27 - Beanie with Logo");
					expect(track.params.ca3).to.equal("Woo-beanie-logo");
					expect(track.params.cb20).to.equal("Red");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("product");
					expect(track.params.cg2).to.equal("single-product");
					expect(track.params.co).to.equal("18");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
					expect(track.params.pu).to.equal(
						"http://mapp_e2e_wp.test/product/beanie-with-logo/"
					);
					expect(track.params.qn).to.equal("1");
					expect(track.params.st).to.equal("view");
					expect(track.params.uc713).to.equal("1");
				});
				cy.getGtmDataLayer().then((dataLayer) => {
					expect(dataLayer[0].language).to.equal("en_US");
					expect(dataLayer[0].pageTitle).to.equal("Beanie with Logo");
					expect(dataLayer[0].contentCategory).to.equal("product");
					expect(dataLayer[0].contentSubcategory).to.equal(
						"single-product"
					);
					expect(dataLayer[0].taxonomies.product_type[0]).to.equal(
						"simple"
					);
					expect(dataLayer[0].taxonomies.product_cat[0]).to.equal(
						"Accessories"
					);
					expect(dataLayer[0].taxonomies.pa_color[0]).to.equal("Red");
					expect(dataLayer[0].productName).to.equal(
						"Beanie with Logo"
					);
					expect(dataLayer[0].productCost).to.equal("18");
					expect(dataLayer[0].productId).to.equal("27");
					expect(dataLayer[0].productSKU).to.equal("Woo-beanie-logo");
					expect(dataLayer[0].currency).to.equal("EUR");
					expect(dataLayer[0].productQuantity).to.equal("1");
					expect(dataLayer[0].shoppingCartStatus).to.equal("view");
					expect(dataLayer[0].productCollection).to.equal("0");
					expect(dataLayer[0].productCategories[0]).to.equal(
						"Accessories"
					);
					expect(dataLayer[0].productCategory).to.equal(
						"Accessories"
					);
					expect(dataLayer[0].gtmProductArray[0].id).to.equal(
						"27 - Beanie with Logo"
					);
					expect(dataLayer[0].gtmProductArray[0].cost).to.equal("18");
					expect(dataLayer[0].gtmProductArray[0].quantity).to.equal(
						"1"
					);
					expect(dataLayer[0].gtmProductArray[0].name).to.equal(
						"Beanie with Logo"
					);
					expect(dataLayer[0].gtmProductArray[0].collection).to.equal(
						"0"
					);
					expect(dataLayer[0].gtmProductArray[0].status).to.equal(
						"view"
					);
					expect(dataLayer[0].gtmProductArray[0].id_only).to.equal(
						"27"
					);
					expect(dataLayer[0].gtmProductArray[0].sku).to.equal(
						"Woo-beanie-logo"
					);
					expect(
						dataLayer[0].gtmProductArray[0].product_type_0
					).to.equal("simple");
					expect(
						dataLayer[0].gtmProductArray[0].product_cat_0
					).to.equal("Accessories");
					expect(dataLayer[0].gtmProductArray[0].pa_color_0).to.equal(
						"Red"
					);
					expect(dataLayer[0].pageName).to.equal(
						"mapp_e2e_wp.test/product/beanie-with-logo/"
					);
				});
			});
			it("normal product", () => {
				cy.visit("/product/long-sleeve-tee/");
				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/long-sleeve-tee/"
					);
					expect(track.params.ba).to.equal("16 - Long Sleeve Tee");
					expect(track.params.ca3).to.equal("woo-long-sleeve-tee");
					expect(track.params.cb20).to.equal("Green");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("product");
					expect(track.params.cg2).to.equal("single-product");
					expect(track.params.co).to.equal("25");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
					expect(track.params.pu).to.equal(
						"http://mapp_e2e_wp.test/product/long-sleeve-tee/"
					);
					expect(track.params.qn).to.equal("1");
					expect(track.params.st).to.equal("view");
				});
				cy.getGtmDataLayer().then((dataLayer) => {
					const dl = dataLayer[0];
					const gtmArray = dl.gtmProductArray[0];
					expect(dl.language).to.equal("en_US");
					expect(dl.pageTitle).to.equal("Long Sleeve Tee");
					expect(dl.contentCategory).to.equal("product");
					expect(dl.contentSubcategory).to.equal("single-product");
					expect(dl.taxonomies.product_type[0]).to.equal("simple");
					expect(dl.taxonomies.product_cat[0]).to.equal("Tshirts");
					expect(dl.taxonomies.pa_color[0]).to.equal("Green");
					expect(dl.productName).to.equal("Long Sleeve Tee");
					expect(dl.productCost).to.equal("25");
					expect(dl.productId).to.equal("16");
					expect(dl.productSKU).to.equal("woo-long-sleeve-tee");
					expect(dl.currency).to.equal("EUR");
					expect(dl.productQuantity).to.equal("1");
					expect(dl.shoppingCartStatus).to.equal("view");
					expect(dl.productCollection).to.equal("0");
					expect(dl.productCategories[0]).to.equal("Tshirts");
					expect(dl.productCategory).to.equal("Tshirts");
					expect(gtmArray.id).to.equal("16 - Long Sleeve Tee");
					expect(gtmArray.cost).to.equal("25");
					expect(gtmArray.quantity).to.equal("1");
					expect(gtmArray.name).to.equal("Long Sleeve Tee");
					expect(gtmArray.collection).to.equal("0");
					expect(gtmArray.status).to.equal("view");
					expect(gtmArray.id_only).to.equal("16");
					expect(gtmArray.sku).to.equal("woo-long-sleeve-tee");
					expect(gtmArray.product_type_0).to.equal("simple");
					expect(gtmArray.product_cat_0).to.equal("Tshirts");
					expect(gtmArray.pa_color_0).to.equal("Green");
					expect(dl.pageName).to.equal(
						"mapp_e2e_wp.test/product/long-sleeve-tee/"
					);
				});
			});
			it("product variation", () => {
				cy.visit("/product/hoodie/");
				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/hoodie/"
					);
					expect(track.params.ba).to.equal("7 - Hoodie");
					expect(track.params.ca3).to.equal("woo-hoodie");
					expect(track.params.cb20).to.equal("Red");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("product");
					expect(track.params.cg2).to.equal("single-product");
					expect(track.params.co).to.equal("42");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
					expect(track.params.pu).to.equal(
						"http://mapp_e2e_wp.test/product/hoodie/"
					);
					expect(track.params.qn).to.equal("1");
					expect(track.params.st).to.equal("view");
					expect(track.params.uc713).to.equal("1");
				});
				cy.getGtmDataLayer().then((dataLayer) => {
					expect(dataLayer[0].language).to.equal("en_US");
					expect(dataLayer[0].pageTitle).to.equal("Hoodie");
					expect(dataLayer[0].contentCategory).to.equal("product");
					expect(dataLayer[0].contentSubcategory).to.equal(
						"single-product"
					);
					expect(dataLayer[0].taxonomies.product_type[0]).to.equal(
						"variable"
					);
					expect(dataLayer[0].taxonomies.product_cat[0]).to.equal(
						"Hoodies"
					);
					expect(dataLayer[0].taxonomies.pa_color[0]).to.equal("Red");
					expect(dataLayer[0].taxonomies.pa_color[1]).to.equal(
						"Green"
					);
					expect(dataLayer[0].taxonomies.pa_color[2]).to.equal(
						"Blue"
					);
					expect(dataLayer[0].productName).to.equal("Hoodie");
					expect(dataLayer[0].productCost).to.equal("42");
					expect(dataLayer[0].productId).to.equal("7");
					expect(dataLayer[0].productSKU).to.equal("woo-hoodie");
					expect(dataLayer[0].currency).to.equal("EUR");
					expect(dataLayer[0].productQuantity).to.equal("1");
					expect(dataLayer[0].shoppingCartStatus).to.equal("view");
					expect(dataLayer[0].productCollection).to.equal("0");
					expect(dataLayer[0].productCategories[0]).to.equal(
						"Hoodies"
					);
					expect(dataLayer[0].productCategory).to.equal("Hoodies");
					expect(dataLayer[0].gtmProductArray[0].id).to.equal(
						"7 - Hoodie"
					);
					expect(dataLayer[0].gtmProductArray[0].cost).to.equal("42");
					expect(dataLayer[0].gtmProductArray[0].quantity).to.equal(
						"1"
					);
					expect(dataLayer[0].gtmProductArray[0].name).to.equal(
						"Hoodie"
					);
					expect(dataLayer[0].gtmProductArray[0].collection).to.equal(
						"0"
					);
					expect(dataLayer[0].gtmProductArray[0].status).to.equal(
						"view"
					);
					expect(dataLayer[0].gtmProductArray[0].id_only).to.equal(
						"7"
					);
					expect(dataLayer[0].gtmProductArray[0].sku).to.equal(
						"woo-hoodie"
					);
					expect(
						dataLayer[0].gtmProductArray[0].product_type_0
					).to.equal("variable");
					expect(
						dataLayer[0].gtmProductArray[0].product_cat_0
					).to.equal("Hoodies");
					expect(dataLayer[0].gtmProductArray[0].pa_color_0).to.equal(
						"Red"
					);
					expect(dataLayer[0].gtmProductArray[0].pa_color_1).to.equal(
						"Green"
					);
					expect(dataLayer[0].gtmProductArray[0].pa_color_2).to.equal(
						"Blue"
					);
					expect(dataLayer[0].pageName).to.equal(
						"mapp_e2e_wp.test/product/hoodie/"
					);
				});
			});
			it("product collection", () => {
				cy.visit("/product/logo-collection/");
				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/logo-collection/"
					);
					expect(track.params.ba).to.equal(
						"28 - Logo Collection;8 - Hoodie with Logo;9 - T-Shirt;10 - Beanie"
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
					expect(track.params.cs802).to.equal("3072");
					expect(track.params.pu).to.equal(
						"http://mapp_e2e_wp.test/product/logo-collection/"
					);
					expect(track.params.qn).to.equal("1;1;1;1");
					expect(track.params.st).to.equal("view");
					expect(track.params.uc713).to.equal("1");
				});
				cy.getGtmDataLayer().then((dataLayer) => {
					expect(dataLayer[0].language).to.equal("en_US");
					expect(dataLayer[0].pageTitle).to.equal("Logo Collection");
					expect(dataLayer[0].contentCategory).to.equal("product");
					expect(dataLayer[0].contentSubcategory).to.equal(
						"single-product"
					);
					expect(dataLayer[0].taxonomies.product_type[0]).to.equal(
						"grouped;simple;simple;simple"
					);
					expect(dataLayer[0].taxonomies.product_cat[0]).to.equal(
						"Clothing;Hoodies;Tshirts;Accessories"
					);
					expect(dataLayer[0].taxonomies.pa_color[0]).to.equal(
						";Blue;Gray;Red"
					);
					expect(dataLayer[0].productName).to.equal(
						"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
					);
					expect(dataLayer[0].productCost).to.equal("81;45;18;18");
					expect(dataLayer[0].productId).to.equal("28;8;9;10");
					expect(dataLayer[0].productSKU).to.equal(
						"logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie"
					);
					expect(dataLayer[0].currency).to.equal("EUR");
					expect(dataLayer[0].productQuantity).to.equal("1;1;1;1");
					expect(dataLayer[0].shoppingCartStatus).to.equal("view");
					expect(dataLayer[0].productCollection).to.equal("1;0;0;0");
					expect(dataLayer[0].productCategories[0]).to.equal(
						"Clothing;Hoodies;Tshirts;Accessories"
					);
					expect(dataLayer[0].productCategory).to.equal(
						"Clothing;Hoodies;Tshirts;Accessories"
					);
					expect(dataLayer[0].gtmProductArray[0].id).to.equal(
						"28 - Logo Collection;8 - Hoodie with Logo;9 - T-Shirt;10 - Beanie"
					);
					expect(dataLayer[0].gtmProductArray[0].cost).to.equal(
						"81;45;18;18"
					);
					expect(dataLayer[0].gtmProductArray[0].quantity).to.equal(
						"1;1;1;1"
					);
					expect(dataLayer[0].gtmProductArray[0].name).to.equal(
						"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
					);
					expect(dataLayer[0].gtmProductArray[0].collection).to.equal(
						"1;0;0;0"
					);
					expect(dataLayer[0].gtmProductArray[0].status).to.equal(
						"view"
					);
					expect(dataLayer[0].gtmProductArray[0].id_only).to.equal(
						"28;8;9;10"
					);
					expect(dataLayer[0].gtmProductArray[0].sku).to.equal(
						"logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie"
					);
					expect(
						dataLayer[0].gtmProductArray[0].product_type_0
					).to.equal("grouped;simple;simple;simple");
					expect(
						dataLayer[0].gtmProductArray[0].product_cat_0
					).to.equal("Clothing;Hoodies;Tshirts;Accessories");
					expect(dataLayer[0].gtmProductArray[0].pa_color_0).to.equal(
						";Blue;Gray;Red"
					);
					expect(dataLayer[0].pageName).to.equal(
						"mapp_e2e_wp.test/product/logo-collection/"
					);
				});
			});
		});

		describe("add", () => {
			let gtmDataLayer;
			it("sale product", () => {
				cy.visit("/product/beanie-with-logo/");
				cy.testTrackRequest().then((track) => {
					cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/beanie-with-logo/"
					);
				});
				cy.get('[name="add-to-cart"]').click();
				cy.testTrackRequest().then((track) => {
					const add = gtmDataLayer[0];
					const restore = gtmDataLayer[1];
					const addGtmArray = add.mapp.gtmProductArray[0];
					const rstGtmArray = restore.mapp.gtmProductArray[0];

					expect(add.event).to.equal("mapp.load");
					expect(add.mapp.language).to.equal("en_US");
					expect(add.mapp.pageTitle).to.equal("Beanie with Logo");
					expect(add.mapp.contentCategory).to.equal("product");
					expect(add.mapp.contentSubcategory).to.equal(
						"single-product"
					);
					expect(add.mapp.taxonomies.product_type[0]).to.equal(
						"simple"
					);
					expect(add.mapp.taxonomies.product_cat[0]).to.equal(
						"Accessories"
					);
					expect(add.mapp.taxonomies.pa_color[0]).to.equal("Red");
					expect(add.mapp.productName).to.equal("Beanie with Logo");
					expect(add.mapp.productCost).to.equal(18);
					expect(add.mapp.productId).to.equal("27");
					expect(add.mapp.productSKU).to.equal("Woo-beanie-logo");
					expect(add.mapp.currency).to.equal("EUR");
					expect(add.mapp.productQuantity).to.equal("1");
					expect(add.mapp.shoppingCartStatus).to.equal("basket");
					expect(add.mapp.productCollection).to.equal("0");
					expect(add.mapp.productCategories[0]).to.equal(
						"Accessories"
					);
					expect(add.mapp.productCategory).to.equal("Accessories");

					expect(addGtmArray.id).to.equal("27 - Beanie with Logo");
					expect(addGtmArray.cost).to.equal(18);
					expect(addGtmArray.quantity).to.equal("1");
					expect(addGtmArray.name).to.equal("Beanie with Logo");
					expect(addGtmArray.collection).to.equal("0");
					expect(addGtmArray.status).to.equal("basket");
					expect(addGtmArray.id_only).to.equal("27");
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
					expect(restore.mapp.productName).to.equal(
						"Beanie with Logo"
					);
					expect(restore.mapp.productCost).to.equal("18");
					expect(restore.mapp.productId).to.equal("27");
					expect(restore.mapp.productSKU).to.equal("Woo-beanie-logo");
					expect(restore.mapp.currency).to.equal("EUR");
					expect(restore.mapp.productQuantity).to.equal("1");
					expect(restore.mapp.shoppingCartStatus).to.equal("view");
					expect(restore.mapp.productCollection).to.equal("0");
					expect(restore.mapp.productCategories[0]).to.equal(
						"Accessories"
					);
					expect(restore.mapp.productCategory).to.equal(
						"Accessories"
					);

					expect(rstGtmArray.id).to.equal("27 - Beanie with Logo");
					expect(rstGtmArray.cost).to.equal("18");
					expect(rstGtmArray.quantity).to.equal("1");
					expect(rstGtmArray.name).to.equal("Beanie with Logo");
					expect(rstGtmArray.collection).to.equal("0");
					expect(rstGtmArray.status).to.equal("view");
					expect(rstGtmArray.id_only).to.equal("27");
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
					expect(track.params.ba).to.equal("27 - Beanie with Logo");
					expect(track.params.ca3).to.equal("Woo-beanie-logo");
					expect(track.params.cb20).to.equal("Red");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("product");
					expect(track.params.cg2).to.equal("single-product");
					expect(track.params.co).to.equal("18");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
					expect(track.params.pu).to.equal(
						"http://mapp_e2e_wp.test/product/beanie-with-logo/"
					);
					expect(track.params.qn).to.equal("1");
					expect(track.params.st).to.equal("add");
					expect(track.params.uc713).to.equal("1");
				});
			});

			it("normal product", () => {
				cy.visit("/product/long-sleeve-tee/");
				cy.testTrackRequest().then((track) => {
					cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/long-sleeve-tee/"
					);
				});
				cy.get('[name="add-to-cart"]').click();
				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/long-sleeve-tee/"
					);
					expect(track.params.ba).to.equal("16 - Long Sleeve Tee");
					expect(track.params.ca3).to.equal("woo-long-sleeve-tee");
					expect(track.params.cb20).to.equal("Green");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("product");
					expect(track.params.cg2).to.equal("single-product");
					expect(track.params.co).to.equal("25");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
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
					expect(add.mapp.contentSubcategory).to.equal(
						"single-product"
					);
					expect(add.mapp.taxonomies.product_type[0]).to.equal(
						"simple"
					);
					expect(add.mapp.taxonomies.product_cat[0]).to.equal(
						"Tshirts"
					);
					expect(add.mapp.taxonomies.pa_color[0]).to.equal("Green");
					expect(add.mapp.productName).to.equal("Long Sleeve Tee");
					expect(add.mapp.productCost).to.equal(25);
					expect(add.mapp.productId).to.equal("16");
					expect(add.mapp.productSKU).to.equal("woo-long-sleeve-tee");
					expect(add.mapp.currency).to.equal("EUR");
					expect(add.mapp.productQuantity).to.equal("1");
					expect(add.mapp.shoppingCartStatus).to.equal("basket");
					expect(add.mapp.productCollection).to.equal("0");
					expect(add.mapp.productCategories[0]).to.equal("Tshirts");
					expect(add.mapp.productCategory).to.equal("Tshirts");

					expect(addGtmArray.id).to.equal("16 - Long Sleeve Tee");
					expect(addGtmArray.cost).to.equal(25);
					expect(addGtmArray.quantity).to.equal("1");
					expect(addGtmArray.name).to.equal("Long Sleeve Tee");
					expect(addGtmArray.collection).to.equal("0");
					expect(addGtmArray.status).to.equal("basket");
					expect(addGtmArray.id_only).to.equal("16");
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
					expect(restore.mapp.taxonomies.pa_color[0]).to.equal(
						"Green"
					);
					expect(restore.mapp.productName).to.equal(
						"Long Sleeve Tee"
					);
					expect(restore.mapp.productCost).to.equal("25");
					expect(restore.mapp.productId).to.equal("16");
					expect(restore.mapp.productSKU).to.equal(
						"woo-long-sleeve-tee"
					);
					expect(restore.mapp.currency).to.equal("EUR");
					expect(restore.mapp.productQuantity).to.equal("1");
					expect(restore.mapp.shoppingCartStatus).to.equal("view");
					expect(restore.mapp.productCollection).to.equal("0");

					expect(restore.mapp.productCategories[0]).to.equal(
						"Tshirts"
					);
					expect(restore.mapp.productCategory).to.equal("Tshirts");
					expect(rstGtmArray.id).to.equal("16 - Long Sleeve Tee");
					expect(rstGtmArray.cost).to.equal("25");
					expect(rstGtmArray.quantity).to.equal("1");
					expect(rstGtmArray.name).to.equal("Long Sleeve Tee");
					expect(rstGtmArray.collection).to.equal("0");
					expect(rstGtmArray.status).to.equal("view");
					expect(rstGtmArray.id_only).to.equal("16");
					expect(rstGtmArray.sku).to.equal("woo-long-sleeve-tee");
					expect(rstGtmArray.product_type_0).to.equal("simple");
					expect(rstGtmArray.product_cat_0).to.equal("Tshirts");
					expect(rstGtmArray.pa_color_0).to.equal("Green");
					expect(restore.mapp.pageName).to.equal(
						"mapp_e2e_wp.test/product/long-sleeve-tee/"
					);
				});
			});

			it("product variation", () => {
				cy.visit("/product/hoodie/");
				cy.testTrackRequest().then((track) => {
					cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/hoodie/"
					);
				});
				cy.get("#pa_color").select("green");

				cy.get("#logo").select("No");

				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/hoodie/"
					);
					expect(track.params.ba).to.equal("24 - Hoodie");
					expect(track.params.ca3).to.equal("woo-hoodie-green");
					expect(track.params.cb20).to.equal("green");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("product");
					expect(track.params.cg2).to.equal("single-product");
					expect(track.params.co).to.equal("45");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
					expect(track.params.pu).to.equal(
						"http://mapp_e2e_wp.test/product/hoodie/"
					);
					expect(track.params.qn).to.equal("1");
					expect(track.params.st).to.equal("view");
					expect(track.params.uc713).to.equal("1");
				});
				cy.get(".single_add_to_cart_button").click();

				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/hoodie/"
					);
					expect(track.params.ba).to.equal("24 - Hoodie");
					expect(track.params.ca3).to.equal("woo-hoodie-green");
					expect(track.params.cb20).to.equal("green");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("product");
					expect(track.params.cg2).to.equal("single-product");
					expect(track.params.co).to.equal("45");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
					expect(track.params.pu).to.equal(
						"http://mapp_e2e_wp.test/product/hoodie/"
					);
					expect(track.params.qn).to.equal("1");
					expect(track.params.st).to.equal("add");
					expect(track.params.uc713).to.equal("1");

					const add = gtmDataLayer[0];
					const select = gtmDataLayer[1];
					const restore = gtmDataLayer[2];
					const addGtmArray = add.mapp.gtmProductArray[0];
					const selectGtmArray = select.mapp.gtmProductArray[0];
					const restoreGtmArray = restore.mapp.gtmProductArray[0];

					expect(add.event).to.equal("mapp.load");
					expect(addGtmArray.pa_color_0).to.equal("green");
					expect(addGtmArray.logo_0).to.equal("No");
					expect(addGtmArray.name).to.equal("Hoodie");
					expect(addGtmArray.id).to.equal("24 - Hoodie");
					expect(addGtmArray.cost).to.equal("45");
					expect(addGtmArray.id_only).to.equal("24");
					expect(addGtmArray.sku).to.equal("woo-hoodie-green");
					expect(addGtmArray.status).to.equal("view");
					expect(add.mapp.taxonomies.pa_color[0]).to.equal("green");
					expect(add.mapp.taxonomies.logo[0]).to.equal("No");
					expect(add.mapp.productName).to.equal("Hoodie");
					expect(add.mapp.productCost).to.equal("45");
					expect(add.mapp.productId).to.equal("24");
					expect(add.mapp.productSKU).to.equal("woo-hoodie-green");
					expect(select.event).to.equal("mapp.load");
					expect(select.mapp.language).to.equal("en_US");
					expect(select.mapp.pageTitle).to.equal("Hoodie");
					expect(select.mapp.contentCategory).to.equal("product");
					expect(select.mapp.contentSubcategory).to.equal(
						"single-product"
					);
					expect(select.mapp.taxonomies.product_type[0]).to.equal(
						"variable"
					);
					expect(select.mapp.taxonomies.product_cat[0]).to.equal(
						"Hoodies"
					);
					expect(select.mapp.taxonomies.pa_color[0]).to.equal(
						"green"
					);
					expect(select.mapp.taxonomies.pa_color[1]).to.equal(
						"Green"
					);
					expect(select.mapp.taxonomies.pa_color[2]).to.equal("Blue");
					expect(select.mapp.taxonomies.logo[0]).to.equal("No");
					expect(select.mapp.productName).to.equal("Hoodie");
					expect(select.mapp.productCost).to.equal(45);
					expect(select.mapp.productId).to.equal("24");
					expect(select.mapp.productSKU).to.equal("woo-hoodie-green");
					expect(select.mapp.currency).to.equal("EUR");
					expect(select.mapp.productQuantity).to.equal("1");
					expect(select.mapp.shoppingCartStatus).to.equal("basket");
					expect(select.mapp.productCollection).to.equal("0");
					expect(select.mapp.productCategories[0]).to.equal(
						"Hoodies"
					);
					expect(select.mapp.productCategory).to.equal("Hoodies");
					expect(selectGtmArray.id).to.equal("24 - Hoodie");
					expect(selectGtmArray.cost).to.equal(45);
					expect(selectGtmArray.quantity).to.equal("1");
					expect(selectGtmArray.name).to.equal("Hoodie");
					expect(selectGtmArray.collection).to.equal("0");
					expect(selectGtmArray.status).to.equal("basket");
					expect(selectGtmArray.id_only).to.equal("24");
					expect(selectGtmArray.sku).to.equal("woo-hoodie-green");
					expect(selectGtmArray.product_type_0).to.equal("variable");
					expect(selectGtmArray.product_cat_0).to.equal("Hoodies");
					expect(selectGtmArray.pa_color_0).to.equal("green");
					expect(selectGtmArray.pa_color_1).to.equal("Green");
					expect(selectGtmArray.pa_color_2).to.equal("Blue");
					expect(selectGtmArray.logo_0).to.equal("No");
					expect(select.mapp.pageName).to.equal(
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
					expect(restore.mapp.taxonomies.pa_color[0]).to.equal(
						"green"
					);
					expect(restore.mapp.taxonomies.pa_color[1]).to.equal(
						"Green"
					);
					expect(restore.mapp.taxonomies.pa_color[2]).to.equal(
						"Blue"
					);
					expect(restore.mapp.taxonomies.logo[0]).to.equal("No");
					expect(restore.mapp.productName).to.equal("Hoodie");
					expect(restore.mapp.productCost).to.equal("45");
					expect(restore.mapp.productId).to.equal("24");
					expect(restore.mapp.productSKU).to.equal(
						"woo-hoodie-green"
					);
					expect(restore.mapp.currency).to.equal("EUR");
					expect(restore.mapp.productQuantity).to.equal("1");
					expect(restore.mapp.shoppingCartStatus).to.equal("view");
					expect(restore.mapp.productCollection).to.equal("0");
					expect(restore.mapp.productCategories[0]).to.equal(
						"Hoodies"
					);
					expect(restore.mapp.productCategory).to.equal("Hoodies");
					expect(restoreGtmArray.id).to.equal("24 - Hoodie");
					expect(restoreGtmArray.cost).to.equal("45");
					expect(restoreGtmArray.quantity).to.equal("1");
					expect(restoreGtmArray.name).to.equal("Hoodie");
					expect(restoreGtmArray.collection).to.equal("0");
					expect(restoreGtmArray.status).to.equal("view");
					expect(restoreGtmArray.id_only).to.equal("24");
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
			});

			it("product collection", () => {
				cy.visit("/product/logo-collection/");
				cy.testTrackRequest().then((track) => {
					cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
				});

				cy.get(".quantity > input").eq(0).clear().type("1");
				cy.get(".quantity > input").eq(1).clear().type("1");
				cy.get(".quantity > input").eq(2).clear().type("1");
				cy.get(".single_add_to_cart_button").click();

				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal(
						"mapp_e2e_wp.test/product/logo-collection/"
					);
					expect(track.params.ba).to.equal(
						"28 - Logo Collection;8 - Hoodie with Logo;9 - T-Shirt;10 - Beanie"
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
					expect(track.params.cs802).to.equal("3072");
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
					expect(add.mapp.contentSubcategory).to.equal(
						"single-product"
					);
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
					expect(add.mapp.productId).to.equal("28;8;9;10");
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
					expect(addGtmArray.id).to.equal(
						"28 - Logo Collection;8 - Hoodie with Logo;9 - T-Shirt;10 - Beanie"
					);
					expect(addGtmArray.cost).to.equal("81;45;18;18");
					expect(addGtmArray.quantity).to.equal("1;1;1;1");
					expect(addGtmArray.name).to.equal(
						"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
					);
					expect(addGtmArray.collection).to.equal("1;0;0;0");
					expect(addGtmArray.status).to.equal("basket");
					expect(addGtmArray.id_only).to.equal("28;8;9;10");
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
					expect(restore.mapp.productId).to.equal("28;8;9;10");
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
					expect(restoreGtmArray.id).to.equal(
						"28 - Logo Collection;8 - Hoodie with Logo;9 - T-Shirt;10 - Beanie"
					);
					expect(restoreGtmArray.cost).to.equal("81;45;18;18");
					expect(restoreGtmArray.quantity).to.equal("1;1;1;1");
					expect(restoreGtmArray.name).to.equal(
						"Logo Collection;Hoodie with Logo;T-Shirt;Beanie"
					);
					expect(restoreGtmArray.collection).to.equal("1;0;0;0");
					expect(restoreGtmArray.status).to.equal("view");
					expect(restoreGtmArray.id_only).to.equal("28;8;9;10");
					expect(restoreGtmArray.sku).to.equal(
						"logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie"
					);
					expect(restoreGtmArray.product_type_0).to.equal(
						"grouped;simple;simple;simple"
					);
					expect(restoreGtmArray.product_cat_0).to.equal(
						"Clothing;Hoodies;Tshirts;Accessories"
					);
					expect(restoreGtmArray.pa_color_0).to.equal(
						";Blue;Gray;Red"
					);
					expect(restore.mapp.pageName).to.equal(
						"mapp_e2e_wp.test/product/logo-collection/"
					);
				});
			});
		});

		describe("fast add", () => {
			let gtmDataLayer;
			it("sale product", () => {
				cy.visit("/shop/");
				cy.testTrackRequest().then((track) => {
					cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
					expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				});

				cy.get('[href="?add-to-cart=12"]').click();

				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
					expect(track.params.ba).to.equal("12 - Cap");
					expect(track.params.ca3).to.equal("woo-cap");
					expect(track.params.cb20).to.equal("Yellow");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("shop-startpage");
					expect(track.params.co).to.equal("16");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
					expect(track.params.pu).to.equal(
						"http://mapp_e2e_wp.test/shop/"
					);
					expect(track.params.qn).to.equal("1");
					expect(track.params.st).to.equal("view");
					expect(track.params.uc713).to.equal("1");
				});

				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
					expect(track.params.ba).to.equal("12 - Cap");
					expect(track.params.ca3).to.equal("woo-cap");
					expect(track.params.cb20).to.equal("Yellow");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("shop-startpage");
					expect(track.params.co).to.equal("16");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
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
					expect(view.mapp.pageTitle).to.equal("Products");
					expect(view.mapp.pageNumber).to.equal("1");
					expect(view.mapp.orderBy).to.equal("default");
					expect(view.mapp.contentCategory).to.equal(
						"shop-startpage"
					);
					expect(view.mapp.currency).to.equal("EUR");
					expect(viewGtmArray.id).to.equal("12 - Cap");
					expect(viewGtmArray.id_only).to.equal("12");
					expect(viewGtmArray.name).to.equal("Cap");
					expect(viewGtmArray.sku).to.equal("woo-cap");
					expect(viewGtmArray.product_type_0).to.equal("simple");
					expect(viewGtmArray.product_visibility_0).to.equal(
						"featured"
					);
					expect(viewGtmArray.product_cat_0).to.equal("Accessories");
					expect(viewGtmArray.pa_color_0).to.equal("Yellow");
					expect(viewGtmArray.cost).to.equal(16);
					expect(viewGtmArray.quantity).to.equal(1);
					expect(viewGtmArray.status).to.equal("view");
					expect(view.mapp.pageName).to.equal(
						"mapp_e2e_wp.test/shop/"
					);
					expect(view.mapp.productName).to.equal("Cap");
					expect(view.mapp.productCost).to.equal("16");
					expect(view.mapp.productId).to.equal("12");
					expect(view.mapp.productSKU).to.equal("woo-cap");
					expect(view.mapp.productQuantity).to.equal("1");
					expect(view.mapp.taxonomies.product_type[0]).to.equal(
						"simple"
					);
					expect(view.mapp.taxonomies.product_visibility[0]).to.equal(
						"featured"
					);
					expect(view.mapp.taxonomies.product_cat[0]).to.equal(
						"Accessories"
					);
					expect(view.mapp.taxonomies.pa_color[0]).to.equal("Yellow");
					expect(view.mapp.productCategories[0]).to.equal(
						"Accessories"
					);
					expect(view.mapp.productCategory).to.equal("Accessories");
					expect(view.mapp.productValue).to.equal(16);
					expect(view.mapp.shoppingCartStatus).to.equal("view");
					expect(view.mapp.pageRequestType).to.equal("virtual");
					expect(add.event).to.equal("mapp.load");
					expect(add.mapp.language).to.equal("en_US");
					expect(add.mapp.pageTitle).to.equal("Products");
					expect(add.mapp.pageNumber).to.equal("1");
					expect(add.mapp.orderBy).to.equal("default");
					expect(add.mapp.contentCategory).to.equal("shop-startpage");
					expect(add.mapp.currency).to.equal("EUR");
					expect(addGtmArray.id).to.equal("12 - Cap");
					expect(addGtmArray.id_only).to.equal("12");
					expect(addGtmArray.name).to.equal("Cap");
					expect(addGtmArray.sku).to.equal("woo-cap");
					expect(addGtmArray.product_type_0).to.equal("simple");
					expect(addGtmArray.product_visibility_0).to.equal(
						"featured"
					);
					expect(addGtmArray.product_cat_0).to.equal("Accessories");
					expect(addGtmArray.pa_color_0).to.equal("Yellow");
					expect(addGtmArray.cost).to.equal(16);
					expect(addGtmArray.quantity).to.equal(1);
					expect(addGtmArray.status).to.equal("basket");
					expect(add.mapp.pageName).to.equal(
						"mapp_e2e_wp.test/shop/"
					);
					expect(add.mapp.productName).to.equal("Cap");
					expect(add.mapp.productCost).to.equal("16");
					expect(add.mapp.productId).to.equal("12");
					expect(add.mapp.productSKU).to.equal("woo-cap");
					expect(add.mapp.productQuantity).to.equal("1");
					expect(add.mapp.taxonomies.product_type[0]).to.equal(
						"simple"
					);
					expect(add.mapp.taxonomies.product_visibility[0]).to.equal(
						"featured"
					);
					expect(add.mapp.taxonomies.product_cat[0]).to.equal(
						"Accessories"
					);
					expect(add.mapp.taxonomies.pa_color[0]).to.equal("Yellow");
					expect(add.mapp.productCategories[0]).to.equal(
						"Accessories"
					);
					expect(add.mapp.productCategory).to.equal("Accessories");
					expect(add.mapp.productValue).to.equal(16);
					expect(add.mapp.shoppingCartStatus).to.equal("basket");
					expect(add.mapp.pageRequestType).to.equal("virtual");
					expect(restore.event).to.equal("mapp.restore");
					expect(restore.mapp.language).to.equal("en_US");
					expect(restore.mapp.pageTitle).to.equal("Products");
					expect(restore.mapp.pageNumber).to.equal("1");
					expect(restore.mapp.orderBy).to.equal("default");
					expect(restore.mapp.contentCategory).to.equal(
						"shop-startpage"
					);
					expect(restore.mapp.currency).to.equal("EUR");
					expect(restore.mapp.pageName).to.equal(
						"mapp_e2e_wp.test/shop/"
					);
					const restoreGtmArrayProps =
						Object.entries(restoreGtmArray);
					expect(restoreGtmArrayProps.length).to.equal(0);
				});
			});

			it("normal product", () => {
				cy.visit("/shop/");
				cy.testTrackRequest().then((track) => {
					cy.spyOnGtmDataLayer().then((d) => (gtmDataLayer = d));
					expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
				});

				cy.get('[href="?add-to-cart=17"]').click();

				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
					expect(track.params.ba).to.equal("17 - Polo");
					expect(track.params.ca3).to.equal("woo-polo");
					expect(track.params.cb20).to.equal("Blue");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("shop-startpage");
					expect(track.params.co).to.equal("20");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
					expect(track.params.pu).to.equal(
						"http://mapp_e2e_wp.test/shop/"
					);
					expect(track.params.qn).to.equal("1");
					expect(track.params.st).to.equal("view");
					expect(track.params.uc713).to.equal("1");
				});

				cy.testTrackRequest().then((track) => {
					expect(track.pageName).to.equal("mapp_e2e_wp.test/shop/");
					expect(track.params.ba).to.equal("17 - Polo");
					expect(track.params.ca3).to.equal("woo-polo");
					expect(track.params.cb20).to.equal("Blue");
					expect(track.params.cb760).to.equal("0");
					expect(track.params.cg1).to.equal("shop-startpage");
					expect(track.params.co).to.equal("20");
					expect(track.params.cr).to.equal("EUR");
					expect(track.params.cs802).to.equal("3072");
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
					expect(view.mapp.pageTitle).to.equal("Products");
					expect(view.mapp.pageNumber).to.equal("1");
					expect(view.mapp.orderBy).to.equal("default");
					expect(view.mapp.contentCategory).to.equal(
						"shop-startpage"
					);
					expect(view.mapp.currency).to.equal("EUR");

					expect(viewGtmArray.id).to.equal("17 - Polo");
					expect(viewGtmArray.id_only).to.equal("17");
					expect(viewGtmArray.name).to.equal("Polo");
					expect(viewGtmArray.sku).to.equal("woo-polo");
					expect(viewGtmArray.product_type_0).to.equal("simple");
					expect(viewGtmArray.product_cat_0).to.equal("Tshirts");
					expect(viewGtmArray.pa_color_0).to.equal("Blue");
					expect(viewGtmArray.cost).to.equal(20);
					expect(viewGtmArray.quantity).to.equal(1);
					expect(viewGtmArray.status).to.equal("view");
					expect(view.mapp.pageName).to.equal(
						"mapp_e2e_wp.test/shop/"
					);
					expect(view.mapp.productName).to.equal("Polo");
					expect(view.mapp.productCost).to.equal("20");
					expect(view.mapp.productId).to.equal("17");
					expect(view.mapp.productSKU).to.equal("woo-polo");
					expect(view.mapp.productQuantity).to.equal("1");
					expect(view.mapp.taxonomies.product_type[0]).to.equal(
						"simple"
					);
					expect(view.mapp.taxonomies.product_cat[0]).to.equal(
						"Tshirts"
					);
					expect(view.mapp.taxonomies.pa_color[0]).to.equal("Blue");
					expect(view.mapp.productCategories[0]).to.equal("Tshirts");
					expect(view.mapp.productCategory).to.equal("Tshirts");
					expect(view.mapp.productValue).to.equal(20);
					expect(view.mapp.shoppingCartStatus).to.equal("view");
					expect(view.mapp.pageRequestType).to.equal("virtual");
					expect(add.event).to.equal("mapp.load");
					expect(add.mapp.language).to.equal("en_US");
					expect(add.mapp.pageTitle).to.equal("Products");
					expect(add.mapp.pageNumber).to.equal("1");
					expect(add.mapp.orderBy).to.equal("default");
					expect(add.mapp.contentCategory).to.equal("shop-startpage");
					expect(add.mapp.currency).to.equal("EUR");

					expect(addGtmArray.id).to.equal("17 - Polo");
					expect(addGtmArray.id_only).to.equal("17");
					expect(addGtmArray.name).to.equal("Polo");
					expect(addGtmArray.sku).to.equal("woo-polo");
					expect(addGtmArray.product_type_0).to.equal("simple");
					expect(addGtmArray.product_cat_0).to.equal("Tshirts");
					expect(addGtmArray.pa_color_0).to.equal("Blue");
					expect(addGtmArray.cost).to.equal(20);
					expect(addGtmArray.quantity).to.equal(1);
					expect(addGtmArray.status).to.equal("basket");
					expect(add.mapp.pageName).to.equal(
						"mapp_e2e_wp.test/shop/"
					);
					expect(add.mapp.productName).to.equal("Polo");
					expect(add.mapp.productCost).to.equal("20");
					expect(add.mapp.productId).to.equal("17");
					expect(add.mapp.productSKU).to.equal("woo-polo");
					expect(add.mapp.productQuantity).to.equal("1");
					expect(add.mapp.taxonomies.product_type[0]).to.equal(
						"simple"
					);
					expect(add.mapp.taxonomies.product_cat[0]).to.equal(
						"Tshirts"
					);
					expect(add.mapp.taxonomies.pa_color[0]).to.equal("Blue");
					expect(add.mapp.productCategories[0]).to.equal("Tshirts");
					expect(add.mapp.productCategory).to.equal("Tshirts");
					expect(add.mapp.productValue).to.equal(20);
					expect(add.mapp.shoppingCartStatus).to.equal("basket");
					expect(add.mapp.pageRequestType).to.equal("virtual");
					expect(restore.event).to.equal("mapp.restore");
					expect(restore.mapp.language).to.equal("en_US");
					expect(restore.mapp.pageTitle).to.equal("Products");
					expect(restore.mapp.pageNumber).to.equal("1");
					expect(restore.mapp.orderBy).to.equal("default");
					expect(restore.mapp.contentCategory).to.equal(
						"shop-startpage"
					);
					expect(restore.mapp.currency).to.equal("EUR");
					expect(restore.mapp.pageName).to.equal(
						"mapp_e2e_wp.test/shop/"
					);
					const restoreGtmArrayProps =
						Object.entries(restoreGtmArray);
					expect(restoreGtmArrayProps.length).to.equal(0);
				});
			});
		});
	});
});
