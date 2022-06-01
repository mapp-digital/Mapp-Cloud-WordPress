import {User, Admin} from '../../utils/puppeteer';

let isGoogleTagManagerActive = false;
let isTagIntegrationActive = false;

describe('Product', () => {
    describe('Google Tag Manager', () => {
        beforeEach(async () => {
            if (!isGoogleTagManagerActive) {
                isGoogleTagManagerActive = true;
                await Admin.activateGTMOrTI('gtm');
            }
        });

        it('catalog', async () => {
            await User.navigateToCatalog();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/shop/');
            expect(result.pageTitle).toBe('Products');
            expect(result.orderBy).toMatch(/.+/);
            expect(result.currency).toBe('EUR');
            expect(result.products.length).toBeGreaterThan(0);
        });

        it('category', async () => {
            await User.navigateToProductCategory('accessories');

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/product-category/accessories/');
            expect(result.pageTitle).toBe('Accessories | Product categories');
            expect(result.contentCategory).toBe('archive');
            expect(result.contentSubcategory).toBe('tax-product');
            expect(result.orderBy).toMatch(/.+/);
            expect(result.currency).toBe('EUR');
            expect(result.products.length).toBeGreaterThan(0);
        });

        describe('view', () => {
            it('sale product', async () => {
                await User.navigateToProduct(27);

                const result = await User.getDataLayer('dataLayer');
                expect(result.pageName).toBe('wordpress-mapp/product/beanie-with-logo/');
                expect(result.pageTitle).toBe('Beanie with Logo');
                expect(result.contentCategory).toBe('product');
                expect(result.contentSubcategory).toBe('single-product');
                expect(result.productCategory).toBe('Accessories');
                expect(result.productCost).toBe('18');
                expect(result.productId).toBe('27');
                expect(result.productName).toBe('Beanie with Logo');
                expect(result.productQuantity).toBe('1');
                expect(result.productSKU).toBe('Woo-beanie-logo');
                expect(result.productCollection).toBe('0');
                expect(result.shoppingCartStatus).toBe('view');
                expect(result.gtmProductArray[0].collection).toBe('0');
                expect(result.gtmProductArray[0].cost).toBe('18');
                expect(result.gtmProductArray[0].id).toBe('27 - Beanie with Logo');
                expect(result.gtmProductArray[0].id_only).toBe('27');
                expect(result.gtmProductArray[0].name).toBe('Beanie with Logo');
                expect(result.gtmProductArray[0].pa_color_0).toBe('Red');
                expect(result.gtmProductArray[0].product_cat_0).toBe('Accessories');
                expect(result.gtmProductArray[0].product_type_0).toBe('simple');
                expect(result.gtmProductArray[0].quantity).toBe('1');
                expect(result.gtmProductArray[0].sku).toBe('Woo-beanie-logo');
                expect(result.gtmProductArray[0].status).toBe('view');
            });

            it('normal product', async () => {
                await User.navigateToProduct(16);

                const result = await User.getDataLayer('dataLayer');
                expect(result.pageName).toBe('wordpress-mapp/product/long-sleeve-tee/');
                expect(result.pageTitle).toBe('Long Sleeve Tee');
                expect(result.contentCategory).toBe('product');
                expect(result.contentSubcategory).toBe('single-product');
                expect(result.productCategory).toBe('Tshirts');
                expect(result.productCost).toBe('25');
                expect(result.productId).toBe('16');
                expect(result.productName).toBe('Long Sleeve Tee');
                expect(result.productQuantity).toBe('1');
                expect(result.productSKU).toBe('woo-long-sleeve-tee');
                expect(result.productCollection).toBe('0');
                expect(result.shoppingCartStatus).toBe('view');
                expect(result.gtmProductArray[0].collection).toBe('0');
                expect(result.gtmProductArray[0].cost).toBe('25');
                expect(result.gtmProductArray[0].id).toBe('16 - Long Sleeve Tee');
                expect(result.gtmProductArray[0].id_only).toBe('16');
                expect(result.gtmProductArray[0].name).toBe('Long Sleeve Tee');
                expect(result.gtmProductArray[0].pa_color_0).toBe('Green');
                expect(result.gtmProductArray[0].product_cat_0).toBe('Tshirts');
                expect(result.gtmProductArray[0].product_type_0).toBe('simple');
                expect(result.gtmProductArray[0].quantity).toBe('1');
                expect(result.gtmProductArray[0].sku).toBe('woo-long-sleeve-tee');
                expect(result.gtmProductArray[0].status).toBe('view');
            });

            it('product variation', async () => {
                await User.navigateToProduct(7);

                const result = await User.getDataLayer('dataLayer');
                expect(result.pageName).toBe('wordpress-mapp/product/hoodie/');
                expect(result.pageTitle).toBe('Hoodie');
                expect(result.contentCategory).toBe('product');
                expect(result.contentSubcategory).toBe('single-product');
                expect(result.productCategory).toBe('Hoodies');
                expect(result.productCost).toBe('42');
                expect(result.productId).toBe('7');
                expect(result.productName).toBe('Hoodie');
                expect(result.productQuantity).toBe('1');
                expect(result.productSKU).toBe('woo-hoodie');
                expect(result.shoppingCartStatus).toBe('view');
                expect(result.gtmProductArray[0].collection).toBe('0');
                expect(result.gtmProductArray[0].cost).toBe('42');
                expect(result.gtmProductArray[0].id).toBe('7 - Hoodie');
                expect(result.gtmProductArray[0].id_only).toBe('7');
                expect(result.gtmProductArray[0].name).toBe('Hoodie');
                expect(result.gtmProductArray[0].pa_color_0).toBe('Red');
                expect(result.gtmProductArray[0].pa_color_1).toBe('Green');
                expect(result.gtmProductArray[0].pa_color_2).toBe('Blue');
                expect(result.gtmProductArray[0].product_cat_0).toBe('Hoodies');
                expect(result.gtmProductArray[0].product_type_0).toBe('variable');
                expect(result.gtmProductArray[0].quantity).toBe('1');
                expect(result.gtmProductArray[0].sku).toBe('woo-hoodie');
                expect(result.gtmProductArray[0].status).toBe('view');

                await User.selectFormField('#pa_color', 'green');
                await User.selectFormField('#logo', 'No');

                const result2 = await User.getDataLayer('dataLayer');
                expect(result2.pageName).toBe('wordpress-mapp/product/hoodie/');
                expect(result2.pageTitle).toBe('Hoodie');
                expect(result2.contentCategory).toBe('product');
                expect(result2.contentSubcategory).toMatch('single-product');
                expect(result2.productCategory).toMatch('Hoodies');
                expect(result2.productCost).toMatch('45');
                expect(result2.productId).toMatch('24');
                expect(result2.productName).toMatch('Hoodie');
                expect(result2.productQuantity).toMatch('1');
                expect(result2.productSKU).toMatch('woo-hoodie-green');
                expect(result2.shoppingCartStatus).toMatch('view');
                expect(result2.gtmProductArray[0].logo_0).toBe('No');
                expect(result2.gtmProductArray[0].pa_color_0).toBe('green');
                expect(result2.gtmProductArray[0].collection).toBe('0');
                expect(result2.gtmProductArray[0].cost).toBe('45');
                expect(result2.gtmProductArray[0].id).toBe('24 - Hoodie');
                expect(result2.gtmProductArray[0].id_only).toBe('24');
                expect(result2.gtmProductArray[0].name).toBe('Hoodie');
                expect(result2.gtmProductArray[0].product_cat_0).toBe('Hoodies');
                expect(result2.gtmProductArray[0].product_type_0).toBe('variable');
                expect(result2.gtmProductArray[0].quantity).toBe('1');
                expect(result2.gtmProductArray[0].sku).toBe('woo-hoodie-green');
                expect(result2.gtmProductArray[0].status).toBe('view');
            });

            it('product collection', async () => {
                await User.navigateToProduct(28);
                const result = await User.getDataLayer('dataLayer');

                expect(result.pageName).toBe('wordpress-mapp/product/logo-collection/');
                expect(result.pageTitle).toBe('Logo Collection');
                expect(result.contentCategory).toBe('product');
                expect(result.contentSubcategory).toBe('single-product');
                expect(result.productCategory).toBe('Clothing;Hoodies;Tshirts;Accessories');
                expect(result.productCost).toBe('81;45;18;18');
                expect(result.productId).toBe('28;8;9;10');
                expect(result.productName).toBe('Logo Collection;Hoodie with Logo;T-Shirt;Beanie');
                expect(result.productQuantity).toBe('1;1;1;1');
                expect(result.productSKU).toBe('logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie');
                expect(result.productCollection).toBe('1;0;0;0');
                expect(result.shoppingCartStatus).toBe('view');
                expect(result.taxonomies.pa_color[0]).toBe(';Blue;Gray;Red');
                expect(result.taxonomies.product_cat[0]).toBe('Clothing;Hoodies;Tshirts;Accessories');
                expect(result.taxonomies.product_type[0]).toBe('grouped;simple;simple;simple');
                expect(result.gtmProductArray[0].collection).toBe('1;0;0;0');
                expect(result.gtmProductArray[0].cost).toBe('81;45;18;18');
                expect(result.gtmProductArray[0].id).toBe('28 - Logo Collection;8 - Hoodie with Logo;9 - T-Shirt;10 - Beanie');
                expect(result.gtmProductArray[0].id_only).toBe('28;8;9;10');
                expect(result.gtmProductArray[0].name).toBe('Logo Collection;Hoodie with Logo;T-Shirt;Beanie');
                expect(result.gtmProductArray[0].pa_color_0).toBe(';Blue;Gray;Red');
                expect(result.gtmProductArray[0].product_cat_0).toBe('Clothing;Hoodies;Tshirts;Accessories');
                expect(result.gtmProductArray[0].product_type_0).toBe('grouped;simple;simple;simple');
                expect(result.gtmProductArray[0].quantity).toBe('1;1;1;1');
                expect(result.gtmProductArray[0].sku).toBe('logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie');
                expect(result.gtmProductArray[0].status).toBe('view');
            });
        });

        describe('add', () => {
            let listenerFunction;
            let listenerFunctionCounter;
            let addedProductId;
            let isFirstRequest;

            beforeEach(() => {
                isFirstRequest = true;
                listenerFunctionCounter = 0;
            });

            afterEach(async () => {
                await User.unregisterEvent('console', listenerFunction);
                await User.deleteProductFromCart(addedProductId);
            });

            it('sale product', async () => {
                addedProductId = 27;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/product/beanie-with-logo/');
                        expect(result.pageTitle).toBe('Beanie with Logo');
                        expect(result.contentCategory).toBe('product');
                        expect(result.contentSubcategory).toBe('single-product');
                        expect(result.productCollection).toBe('0');
                        expect(result.gtmProductArray[0].collection).toBe('0');
                        expect(result.gtmProductArray[0].product_cat_0).toBe('Accessories');
                        expect(result.gtmProductArray[0].cost + '').toBe('90');
                        expect(result.gtmProductArray[0].id).toBe('27 - Beanie with Logo');
                        expect(result.gtmProductArray[0].id_only).toBe('27');
                        expect(result.gtmProductArray[0].name).toBe('Beanie with Logo');
                        expect(result.gtmProductArray[0].quantity + '').toBe('5');
                        expect(result.gtmProductArray[0].sku).toBe('Woo-beanie-logo');
                        expect(result.gtmProductArray[0].status).toBe('basket');

                        listenerFunctionCounter++;
                    }
                };

                await User.navigateToProduct(addedProductId);
                await User.overrideDataLayerPush('dataLayer');
                await User.registerEvent('console', listenerFunction);
                await User.fillFormField('input[name="quantity"]', '5');
                await User.addToCart();
                await expect(listenerFunctionCounter).toBe(1);
            });

            it('normal product', async () => {
                addedProductId = 16;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/product/long-sleeve-tee/');
                        expect(result.pageTitle).toBe('Long Sleeve Tee');
                        expect(result.contentCategory).toBe('product');
                        expect(result.contentSubcategory).toBe('single-product');
                        expect(result.gtmProductArray[0].product_cat_0).toBe('Tshirts');
                        expect(result.gtmProductArray[0].collection).toBe('0');
                        expect(result.gtmProductArray[0].cost + '').toBe('50');
                        expect(result.gtmProductArray[0].id).toBe('16 - Long Sleeve Tee');
                        expect(result.gtmProductArray[0].id_only).toBe('16');
                        expect(result.gtmProductArray[0].name).toBe('Long Sleeve Tee');
                        expect(result.gtmProductArray[0].quantity).toBe('2');
                        expect(result.gtmProductArray[0].sku).toBe('woo-long-sleeve-tee');
                        expect(result.gtmProductArray[0].status).toBe('basket');

                        listenerFunctionCounter++;
                    }
                };

                await User.navigateToProduct(addedProductId);
                await User.overrideDataLayerPush('dataLayer');
                await User.registerEvent('console', listenerFunction);
                await User.fillFormField('input[name="quantity"]', '2');
                await User.addToCart();
                await expect(listenerFunctionCounter).toBe(1);
            });

            it('product variation', async () => {
                addedProductId = 7;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/product/hoodie/');
                        expect(result.pageTitle).toBe('Hoodie');
                        expect(result.contentCategory).toBe('product');
                        expect(result.contentSubcategory).toBe('single-product');
                        expect(result.gtmProductArray[0].product_cat_0).toBe('Hoodies');
                        expect(result.gtmProductArray[0].collection).toBe('0');
                        expect(result.gtmProductArray[0].cost + '').toBe('45');
                        expect(result.gtmProductArray[0].id).toBe('24 - Hoodie');
                        expect(result.gtmProductArray[0].id_only).toBe('24');
                        expect(result.gtmProductArray[0].name).toBe('Hoodie');
                        expect(result.gtmProductArray[0].quantity).toBe('1');
                        expect(result.gtmProductArray[0].sku).toBe('woo-hoodie-green');
                        expect(result.gtmProductArray[0].status).toBe(isFirstRequest ? 'view' : 'basket');
                        expect(result.gtmProductArray[0].logo_0).toBe('No');
                        expect(result.gtmProductArray[0].pa_color_0).toBe('green');

                        isFirstRequest = false;
                        listenerFunctionCounter++;
                    }
                };

                await User.navigateToProduct(addedProductId);
                await User.overrideDataLayerPush('dataLayer');
                await User.registerEvent('console', listenerFunction);
                await User.selectFormField('#pa_color', 'green');
                await User.selectFormField('#logo', 'No');
                // await User.fillFormField('input[name="quantity"]', '1');
                await User.waitForVariationSelectionReady();
                await User.addToCart();
                await expect(listenerFunctionCounter).toBe(2);
            });

            it('product collection', async () => {
                addedProductId = 28;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/product/logo-collection/');
                        expect(result.pageTitle).toBe('Logo Collection');
                        expect(result.contentCategory).toBe('product');
                        expect(result.contentSubcategory).toBe('single-product');
                        expect(result.productCategory).toBe('Clothing;Hoodies;Tshirts;Accessories');
                        expect(result.productCost).toBe('135;45;36;54');
                        expect(result.productId).toBe('28;8;9;10');
                        expect(result.productName).toBe('Logo Collection;Hoodie with Logo;T-Shirt;Beanie');
                        expect(result.productQuantity).toBe('1;1;2;3');
                        expect(result.productSKU).toBe('logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie');
                        expect(result.shoppingCartStatus).toBe('basket');
                        expect(result.gtmProductArray[0].collection).toBe('1;0;0;0');
                        expect(result.gtmProductArray[0].cost).toBe('135;45;36;54');
                        expect(result.gtmProductArray[0].id).toBe('28 - Logo Collection;8 - Hoodie with Logo;9 - T-Shirt;10 - Beanie');
                        expect(result.gtmProductArray[0].id_only).toBe('28;8;9;10');
                        expect(result.gtmProductArray[0].name).toBe('Logo Collection;Hoodie with Logo;T-Shirt;Beanie');
                        expect(result.gtmProductArray[0].quantity).toBe('1;1;2;3');
                        expect(result.gtmProductArray[0].sku).toBe('logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie');
                        expect(result.gtmProductArray[0].status).toBe('basket');
                        expect(result.gtmProductArray[0].pa_color_0).toBe(';Blue;Gray;Red');
                        expect(result.gtmProductArray[0].product_cat_0).toBe('Clothing;Hoodies;Tshirts;Accessories');
                        expect(result.gtmProductArray[0].product_type_0).toBe('grouped;simple;simple;simple');

                        listenerFunctionCounter++;
                    }
                };

                await User.navigateToProduct(addedProductId);
                await User.overrideDataLayerPush('dataLayer');
                await User.registerEvent('console', listenerFunction);
                await User.fillFormField('form table tr:nth-child(1) input.qty', '1');
                await User.fillFormField('form table tr:nth-child(2) input.qty', '2');
                await User.fillFormField('form table tr:nth-child(3) input.qty', '3');
                await User.waitForVariationSelectionReady();
                await User.addToCart();

                await expect(listenerFunctionCounter).toBe(1);

                await User.deleteProductFromCart(8);
                await User.deleteProductFromCart(9);
                addedProductId = 10;
            });
        });

        describe('fast add', () => {
            let listenerFunction;
            let listenerFunctionCounter;
            let addedProductId;
            let isFirstRequest = true;

            beforeEach(async () => {
                listenerFunctionCounter = 0;
                await User.navigateToCatalog();
                await User.overrideDataLayerPush('dataLayer');
            });

            afterEach(async () => {
                isFirstRequest = true;
                await User.unregisterEvent('console', listenerFunction);
                await User.deleteProductFromCart(addedProductId);
            });

            it('sale product', async () => {
                addedProductId = 12;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/shop/');
                        expect(result.pageTitle).toBe('Products');
                        expect(result.gtmProductArray[0].product_cat_0).toBe('Accessories');
                        expect(result.gtmProductArray[0].cost + '').toBe('16');
                        expect(result.gtmProductArray[0].id).toBe('12 - Cap');
                        expect(result.gtmProductArray[0].id_only).toBe('12');
                        expect(result.gtmProductArray[0].name).toBe('Cap');
                        expect(result.gtmProductArray[0].quantity + '').toBe('1');
                        expect(result.gtmProductArray[0].sku).toBe('woo-cap');
                        expect(result.gtmProductArray[0].status).toBe(isFirstRequest ? 'view' : 'basket');

                        isFirstRequest = false;
                        listenerFunctionCounter++;
                    }
                };

                await User.registerEvent('console', listenerFunction);
                await User.addToCartFromCatalog(addedProductId);
                await expect(listenerFunctionCounter).toBe(2);
            });

            it('normal product', async () => {
                addedProductId = 17;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/shop/');
                        expect(result.pageTitle).toBe('Products');
                        expect(result.gtmProductArray[0].product_cat_0).toBe('Tshirts');
                        expect(result.gtmProductArray[0].cost + '').toBe('20');
                        expect(result.gtmProductArray[0].id).toBe('17 - Polo');
                        expect(result.gtmProductArray[0].id_only).toBe('17');
                        expect(result.gtmProductArray[0].name).toBe('Polo');
                        expect(result.gtmProductArray[0].quantity + '').toBe('1');
                        expect(result.gtmProductArray[0].sku).toBe('woo-polo');
                        expect(result.gtmProductArray[0].status).toBe(isFirstRequest ? 'view' : 'basket');

                        isFirstRequest = false;
                        listenerFunctionCounter++;
                    }
                };

                await User.registerEvent('console', listenerFunction);
                await User.addToCartFromCatalog(addedProductId);
                await expect(listenerFunctionCounter).toBe(2);
            });
        });

        describe('checkout', () => {
            it('as guest', async () => {
                await User.navigateToCatalog();
                await User.addToCartFromCatalog(11);
                await User.addToCartFromCatalog(27);
                await User.addToCartFromCatalog(15);
                await User.addToCartFromCatalog(27);
                await User.navigateToCheckout();
                await User.fillBillingDetails();
                await User.waitForUIUnblocked();
                await User.clickOnElement('.wc_payment_method label', {text: 'Direct bank transfer'});
                await User.waitForUIUnblocked();
                await User.placeOrder();

                const result = await User.getDataLayer('dataLayer');
                expect(result.pageName).toBe(`wordpress-mapp/checkout/order-received/${result.orderId}/`);
                expect(result.pageTitle).toBe('Checkout');
                expect(result.contentCategory).toBe('order-received');
                expect(result.couponValue).toBe('0');
                expect(result.orderId).toMatch(/^\d+$/);
                expect(result.paymentMethod).toBe('Direct bank transfer');
                expect(result.shippingCost).toBe('0');
                expect(result.shippingCost).toMatch(/^(0|0\.00)$/);
                expect(result.shippingMethod).toBe('');
                expect(result.subtotalOrderValue).toBe('136');
                expect(result.totalOrderValue).toBe('136.00');

                expect(result.gtmProductArray[0].cost).toBe('55');
                expect(result.gtmProductArray[0].id).toBe('11 - Belt');
                expect(result.gtmProductArray[0].id_only).toBe('11');
                expect(result.gtmProductArray[0].name).toBe('Belt');
                expect(result.gtmProductArray[0].quantity).toBe('1');
                expect(result.gtmProductArray[0].sku).toBe('woo-belt');
                expect(result.gtmProductArray[0].product_cat_0).toBe('Accessories');
                expect(result.gtmProductArray[0].status).toBe('confirmation');

                expect(result.gtmProductArray[1].cost).toBe('36');
                expect(result.gtmProductArray[1].id).toBe('27 - Beanie with Logo');
                expect(result.gtmProductArray[1].id_only).toBe('27');
                expect(result.gtmProductArray[1].name).toBe('Beanie with Logo');
                expect(result.gtmProductArray[1].quantity).toBe('2');
                expect(result.gtmProductArray[1].sku).toBe('Woo-beanie-logo');
                expect(result.gtmProductArray[1].pa_color_0).toBe('Red');
                expect(result.gtmProductArray[1].product_cat_0).toBe('Accessories');
                expect(result.gtmProductArray[1].status).toBe('confirmation');

                expect(result.gtmProductArray[2].cost).toBe('45');
                expect(result.gtmProductArray[2].id).toBe('15 - Hoodie with Zipper');
                expect(result.gtmProductArray[2].id_only).toBe('15');
                expect(result.gtmProductArray[2].name).toBe('Hoodie with Zipper');
                expect(result.gtmProductArray[2].quantity).toBe('1');
                expect(result.gtmProductArray[2].sku).toBe('woo-hoodie-with-zipper');
                expect(result.gtmProductArray[2].product_cat_0).toBe('Hoodies');
                expect(result.gtmProductArray[2].status).toBe('confirmation');
            });
        });
    });

    describe('Tag Integration', () => {
        beforeEach(async () => {
            if (!isTagIntegrationActive) {
                isTagIntegrationActive = true;
                await Admin.activateGTMOrTI('ti');
            }
        });

        it('catalog', async () => {
            await User.navigateToCatalog();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/shop/');
            expect(result.pageTitle).toBe('Products');
            expect(result.orderBy).toMatch(/.+/);
            expect(result.currency).toBe('EUR');
            expect(result.products.length).toBeGreaterThan(0);
        });

        it('category', async () => {
            await User.navigateToProductCategory('accessories');

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/product-category/accessories/');
            expect(result.pageTitle).toBe('Accessories | Product categories');
            expect(result.contentCategory).toBe('archive');
            expect(result.contentSubcategory).toBe('tax-product');
            expect(result.orderBy).toMatch(/.+/);
            expect(result.currency).toBe('EUR');
            expect(result.products.length).toBeGreaterThan(0);
        });

        describe('view', () => {
            it('sale product', async () => {
                await User.navigateToProduct(27);

                const result = await User.getDataLayer('_ti');
                expect(result.pageName).toBe('wordpress-mapp/product/beanie-with-logo/');
                expect(result.pageTitle).toBe('Beanie with Logo');
                expect(result.contentCategory).toBe('product');
                expect(result.contentSubcategory).toBe('single-product');
                expect(result.productCategory).toBe('Accessories');
                expect(result.productCost).toBe('18');
                expect(result.productId).toBe('27');
                expect(result.productName).toBe('Beanie with Logo');
                expect(result.productQuantity).toBe('1');
                expect(result.productSKU).toBe('Woo-beanie-logo');
                expect(result.productCollection).toBe('0');
                expect(result.shoppingCartStatus).toBe('view');
            });

            it('normal product', async () => {
                await User.navigateToProduct(16);

                const result = await User.getDataLayer('_ti');
                expect(result.pageName).toBe('wordpress-mapp/product/long-sleeve-tee/');
                expect(result.pageTitle).toBe('Long Sleeve Tee');
                expect(result.contentCategory).toBe('product');
                expect(result.contentSubcategory).toBe('single-product');
                expect(result.productCategory).toBe('Tshirts');
                expect(result.productCost).toBe('25');
                expect(result.productId).toBe('16');
                expect(result.productName).toBe('Long Sleeve Tee');
                expect(result.productQuantity).toBe('1');
                expect(result.productSKU).toBe('woo-long-sleeve-tee');
                expect(result.productCollection).toBe('0');
                expect(result.shoppingCartStatus).toBe('view');
            });

            it('product collection', async () => {
                await User.navigateToProduct(28);
                const result = await User.getDataLayer('_ti');

                expect(result.pageName).toBe('wordpress-mapp/product/logo-collection/');
                expect(result.pageTitle).toBe('Logo Collection');
                expect(result.contentCategory).toBe('product');
                expect(result.contentSubcategory).toBe('single-product');
                expect(result.productCategory).toBe('Clothing;Hoodies;Tshirts;Accessories');
                expect(result.productCost).toBe('81;45;18;18');
                expect(result.productId).toBe('28;8;9;10');
                expect(result.productName).toBe('Logo Collection;Hoodie with Logo;T-Shirt;Beanie');
                expect(result.productQuantity).toBe('1;1;1;1');
                expect(result.productSKU).toBe('logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie');
                expect(result.productCollection).toBe('1;0;0;0');
                expect(result.shoppingCartStatus).toBe('view');
                expect(result.taxonomies.pa_color[0]).toBe(';Blue;Gray;Red');
                expect(result.taxonomies.product_cat[0]).toBe('Clothing;Hoodies;Tshirts;Accessories');
                expect(result.taxonomies.product_type[0]).toBe('grouped;simple;simple;simple');
            });

            it('product variation', async () => {
                await User.navigateToProduct(7);

                const result = await User.getDataLayer('_ti');
                expect(result.pageName).toBe('wordpress-mapp/product/hoodie/');
                expect(result.pageTitle).toBe('Hoodie');
                expect(result.contentCategory).toBe('product');
                expect(result.contentSubcategory).toBe('single-product');
                expect(result.productCategory).toBe('Hoodies');
                expect(result.productCost).toBe('42');
                expect(result.productId).toBe('7');
                expect(result.productName).toBe('Hoodie');
                expect(result.productQuantity).toBe('1');
                expect(result.productSKU).toBe('woo-hoodie');
                expect(result.productCollection).toBe('0');
                expect(result.shoppingCartStatus).toBe('view');

                await User.selectFormField('#pa_color', 'green');
                await User.selectFormField('#logo', 'No');

                const result2 = await User.getDataLayer('_ti');
                expect(result2.pageName).toBe('wordpress-mapp/product/hoodie/');
                expect(result2.pageTitle).toBe('Hoodie');
                expect(result2.contentCategory).toBe('product');
                expect(result2.contentSubcategory).toMatch('single-product');
                expect(result2.productCategory).toMatch('Hoodies');
                expect(result2.productCost).toMatch('45');
                expect(result2.productId).toMatch('24');
                expect(result2.productName).toMatch('Hoodie');
                expect(result2.productQuantity).toMatch('1');
                expect(result2.productSKU).toMatch('woo-hoodie-green');
                expect(result.productCollection).toBe('0');
                expect(result2.shoppingCartStatus).toMatch('view');
                expect(result2.taxonomies.logo[0]).toMatch('No');
                expect(result2.taxonomies.pa_color[0]).toMatch('green');
            });
        });

        describe('add', () => {
            let listenerFunction;
            let listenerFunctionCounter;
            let addedProductId;
            let isFirstRequest = true;

            beforeEach(() => {
                listenerFunctionCounter = 0;
            });

            afterEach(async () => {
                await User.unregisterEvent('console', listenerFunction);
                await User.deleteProductFromCart(addedProductId);
            });

            it('sale product', async () => {
                addedProductId = 27;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/product/beanie-with-logo/');
                        expect(result.pageTitle).toBe('Beanie with Logo');
                        expect(result.contentCategory).toBe('product');
                        expect(result.contentSubcategory).toBe('single-product');
                        expect(result.productCategory).toBe('Accessories');
                        expect(result.productCost).toBe(90);
                        expect(result.productId).toBe('27');
                        expect(result.productName).toBe('Beanie with Logo');
                        expect(result.productQuantity).toBe('5');
                        expect(result.productSKU).toBe('Woo-beanie-logo');
                        expect(result.productCollection).toBe('0');
                        expect(result.shoppingCartStatus).toBe('add');

                        listenerFunctionCounter++;
                    }
                };

                await User.navigateToProduct(addedProductId);
                await User.overrideDataLayerPush();
                await User.registerEvent('console', listenerFunction);
                await User.fillFormField('input[name="quantity"]', '5');
                await User.addToCart();
                await expect(listenerFunctionCounter).toBe(1);
            });

            it('normal product', async () => {
                addedProductId = 16;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/product/long-sleeve-tee/');
                        expect(result.pageTitle).toBe('Long Sleeve Tee');
                        expect(result.contentCategory).toBe('product');
                        expect(result.contentSubcategory).toBe('single-product');
                        expect(result.productCategory).toBe('Tshirts');
                        expect(result.productCost).toBe(50);
                        expect(result.productId).toBe('16');
                        expect(result.productName).toBe('Long Sleeve Tee');
                        expect(result.productQuantity).toBe('2');
                        expect(result.productSKU).toBe('woo-long-sleeve-tee');
                        expect(result.productCollection).toBe('0');
                        expect(result.shoppingCartStatus).toBe('add');

                        listenerFunctionCounter++;
                    }
                };

                await User.navigateToProduct(addedProductId);
                await User.overrideDataLayerPush();
                await User.registerEvent('console', listenerFunction);
                await User.fillFormField('input[name="quantity"]', '2');
                await User.addToCart();
                await expect(listenerFunctionCounter).toBe(1);
            });

            it('product variation', async () => {
                addedProductId = 7;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/product/hoodie/');
                        expect(result.pageTitle).toBe('Hoodie');
                        expect(result.contentCategory).toBe('product');
                        expect(result.contentSubcategory).toBe('single-product');
                        expect(result.productCategory).toBe('Hoodies');
                        expect(result.productCost).toBe(isFirstRequest ? '45' : 45);
                        expect(result.productId).toBe('24');
                        expect(result.productName).toBe('Hoodie');
                        expect(result.productQuantity).toBe('1');
                        expect(result.productSKU).toBe('woo-hoodie-green');
                        expect(result.productCollection).toBe('0');
                        expect(result.shoppingCartStatus).toBe(isFirstRequest ? 'view' : 'add');
                        expect(result.taxonomies.logo[0]).toBe('No');
                        expect(result.taxonomies.pa_color[0]).toBe('green');

                        isFirstRequest = false;
                        listenerFunctionCounter++;
                    }
                };

                await User.navigateToProduct(addedProductId);
                await User.overrideDataLayerPush();
                await User.registerEvent('console', listenerFunction);
                await User.selectFormField('#pa_color', 'green');
                await User.selectFormField('#logo', 'No');
                // await User.fillFormField('input[name="quantity"]', '1');
                await User.waitForVariationSelectionReady();
                await User.addToCart();
                await expect(listenerFunctionCounter).toBe(2);
            });

            it('product collection', async () => {
                addedProductId = 28;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/product/logo-collection/');
                        expect(result.pageTitle).toBe('Logo Collection');
                        expect(result.contentCategory).toBe('product');
                        expect(result.contentSubcategory).toBe('single-product');
                        expect(result.productCategory).toBe('Clothing;Hoodies;Tshirts;Accessories');
                        expect(result.productCost).toBe('135;45;36;54');
                        expect(result.productId).toBe('28;8;9;10');
                        expect(result.productName).toBe('Logo Collection;Hoodie with Logo;T-Shirt;Beanie');
                        expect(result.productQuantity).toBe('1;1;2;3');
                        expect(result.productSKU).toBe('logo-collection;woo-hoodie-with-logo;woo-tshirt;woo-beanie');
                        expect(result.productCollection).toBe('1;0;0;0');
                        expect(result.shoppingCartStatus).toBe('add');
                        expect(result.taxonomies.pa_color[0]).toBe(';Blue;Gray;Red');
                        expect(result.taxonomies.product_cat[0]).toBe('Clothing;Hoodies;Tshirts;Accessories');
                        expect(result.taxonomies.product_type[0]).toBe('grouped;simple;simple;simple');

                        listenerFunctionCounter++;
                    }
                };

                await User.navigateToProduct(addedProductId);
                await User.overrideDataLayerPush();
                await User.registerEvent('console', listenerFunction);
                await User.fillFormField('form table tr:nth-child(1) input.qty', '1');
                await User.fillFormField('form table tr:nth-child(2) input.qty', '2');
                await User.fillFormField('form table tr:nth-child(3) input.qty', '3');
                await User.waitForVariationSelectionReady();
                await User.addToCart();
                await expect(listenerFunctionCounter).toBe(1);

                await User.deleteProductFromCart(8);
                await User.deleteProductFromCart(9);
                addedProductId = 10;
            });
        });

        describe('fast add', () => {
            let listenerFunction;
            let addedProductId;
            let isFirstRequest = true;

            beforeEach(async () => {
                await User.navigateToCatalog();
                await User.overrideDataLayerPush();
            });

            afterEach(async () => {
                isFirstRequest = true;
                await User.unregisterEvent('console', listenerFunction);
                await User.deleteProductFromCart(addedProductId);
            });

            it('sale product', async () => {
                addedProductId = 12;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/shop/');
                        expect(result.pageTitle).toBe('Products');
                        expect(result.productCategory).toBe('Accessories');
                        expect(result.productCost).toBe('16');
                        expect(result.productId).toBe('12');
                        expect(result.productName).toBe('Cap');
                        expect(result.productQuantity).toBe("1");
                        expect(result.productSKU).toBe('woo-cap');
                        expect(result.shoppingCartStatus).toBe(isFirstRequest ? 'view' : 'add');
                        expect(result.taxonomies.pa_color[0]).toBe('Yellow');

                        isFirstRequest = false;
                    }
                };

                await User.registerEvent('console', listenerFunction);
                await User.addToCartFromCatalog(addedProductId);
            });

            it('normal product', async () => {
                addedProductId = 17;
                listenerFunction = (msg) => {
                    let result;
                    try {
                        result = JSON.parse(msg.text());
                    }
                    catch (e) {
                        // do nothing
                    }

                    if (result) {
                        expect(result.pageName).toBe('wordpress-mapp/shop/');
                        expect(result.pageTitle).toBe('Products');
                        expect(result.productCategory).toMatch('Tshirts');
                        expect(result.productCost).toMatch('20');
                        expect(result.productId).toMatch('17');
                        expect(result.productName).toMatch('Polo');
                        expect(result.productQuantity).toMatch('1');
                        expect(result.productSKU).toMatch('woo-polo');
                        expect(result.shoppingCartStatus).toMatch(isFirstRequest ? 'view' : 'add');
                        expect(result.taxonomies.pa_color[0]).toBe('Blue');

                        isFirstRequest = false;
                    }
                };

                await User.registerEvent('console', listenerFunction);
                await User.addToCartFromCatalog(addedProductId);
            });
        });

        describe('checkout', () => {
            it('as guest', async () => {
                await User.navigateToCatalog();
                await User.addToCartFromCatalog(11);
                await User.addToCartFromCatalog(27);
                await User.addToCartFromCatalog(15);
                await User.addToCartFromCatalog(27);
                await User.navigateToCheckout();
                await User.fillBillingDetails();
                await User.waitForUIUnblocked();
                await User.clickOnElement('.wc_payment_method label', {text: 'Direct bank transfer'});
                await User.waitForUIUnblocked();
                await User.placeOrder();

                const result = await User.getDataLayer('_ti');
                expect(result.pageName).toBe(`wordpress-mapp/checkout/order-received/${result.orderId}/`);
                expect(result.pageTitle).toBe('Checkout');
                expect(result.contentCategory).toBe('order-received');
                expect(result.couponValue).toBe('0');
                expect(result.orderId).toMatch(/^\d+$/);
                expect(result.paymentMethod).toBe('Direct bank transfer');
                expect(result.shippingCost).toMatch(/^(0|0\.00)$/);
                expect(result.shippingMethod).toBe('');
                expect(result.subtotalOrderValue).toBe('136');
                expect(result.totalOrderValue).toBe('136.00');
                expect(result.productCost).toBe('55;36;45');
                expect(result.productId).toBe('11;27;15');
                expect(result.productName).toBe('Belt;Beanie with Logo;Hoodie with Zipper');
                expect(result.productQuantity).toBe('1;2;1');
                expect(result.productSKU).toBe('woo-belt;Woo-beanie-logo;woo-hoodie-with-zipper');
                expect(result.productCategory).toBe('Accessories;Accessories;Hoodies');
                expect(result.productSubcategory).toBe(';;');
                expect(result.shoppingCartStatus).toBe('conf');
            });
        });
    });
});
