import {pressKeyWithModifier} from '@wordpress/e2e-test-utils';

const config = require('config');
const baseUrl = config.get('url');
const billingDetails = config.get('billing');

const GTM_ID = 'GTM-N2FH826';
const TI_ID = '111111111111111';

const WP_ADMIN_LOGIN = baseUrl + 'wp-login.php';
const WP_ADMIN_DASHBOARD = baseUrl + 'wp-admin';
const WP_ADMIN_PLUGINS = WP_ADMIN_DASHBOARD + '/plugins.php';
const WP_ADMIN_MI_SETTINGS = WP_ADMIN_DASHBOARD + '/plugins.php?page=MappIntelligenceSettings';
const WP_ADMIN_PERMALINK = WP_ADMIN_DASHBOARD + '/options-permalink.php';

const SHOP_HOME = baseUrl;
const SHOP_PRIVACY_POLICY = baseUrl + 'privacy-policy';
const SHOP_SAMPLE_PAGE = baseUrl + 'sample-page';
const SHOP_CATEGORY_PAGE = baseUrl + 'category/uncategorized';
const SHOP_404_PAGE = baseUrl + 'doesnt-exist';

const SHOP_PAGE = baseUrl + 'shop';
const SHOP_CATEGORY = baseUrl + 'product-category/';
const SHOP_PRODUCT_PAGE = baseUrl + '?p=';
const SHOP_CART_PAGE = baseUrl + 'cart';
const SHOP_CHECKOUT_PAGE = baseUrl + 'checkout/';
const SHOP_MY_ACCOUNT_PAGE = baseUrl + 'my-account/';

const MY_ACCOUNT = baseUrl + 'my-account/';
const MY_ACCOUNT_ORDERS = MY_ACCOUNT + 'orders/';
const MY_ACCOUNT_DOWNLOADS = MY_ACCOUNT + 'downloads/';
const MY_ACCOUNT_ADDRESSES = MY_ACCOUNT + 'edit-address/';
const MY_ACCOUNT_ACCOUNT_DETAILS = MY_ACCOUNT + 'edit-account/';

const User = {
    getDataLayer: async (name) => {
        const result = await page.evaluate((e, gtmId) => {
            if (e === '_ti') {
                return Promise.resolve(window[e]);
            }
            else if (e === 'dataLayer') {
                return Promise.resolve(window['google_tag_manager'][gtmId].dataLayer.get('mapp'));
            }
            else {
                return Promise.resolve(null);
            }
        }, name, GTM_ID);

        return result;
    },

    overrideDataLayerPush: async (name) => {
        await page.evaluate((e, gtmId) => {
            if (e === 'dataLayer') {
                window.dataLayer = window.dataLayer || [];

                var originalDataLayerPush = window.dataLayer.push;
                window.dataLayer.push = function(arg) {
                    if(arg.event === 'mapp.load' && arg.mapp) {
                        originalDataLayerPush(arg);
                        console.log(JSON.stringify(
                            window['google_tag_manager'][gtmId].dataLayer.get('mapp')
                        ));
                    }
                };
            }
            else {
                window.wts = window.wts || [];
                window.wts.push = function(arg) {
                    if(arg[0] === 'send' && arg[1] === 'pageupdate') {
                        console.log(JSON.stringify(window._ti));
                    }
                };
            }

            return Promise.resolve();
        }, name, GTM_ID);
    },

    selectFormField: async (selector, value) => {
        await expect(page).toSelect(selector, value);
    },

    fillFormField: async (selector, value) => {
        await expect(page).toFill(selector, value);
    },

    clickOnElement: async (selector, value) => {
        await expect(page).toClick(selector, value);
    },

    registerEvent: async (eventName, callback) => {
        await page.on(eventName, callback);
    },

    unregisterEvent: async (eventName, callback) => {
        await page.removeListener('console', callback);
    },

    waitForVariationSelectionReady: async () => {
        await page.waitForFunction(() => !Boolean(document.querySelector('.wc-variation-selection-needed')));
    },

    waitForUIUnblocked: async () => {
        await page.waitForFunction(() => !Boolean(document.querySelector('.blockUI')));
    },

    addToCart: async () => {
        await page.setViewport({width: 1000, height: 2000});
        await page.waitFor(300);
        await Promise.all([
            page.waitForNavigation({waitUntil: 'networkidle0'}),
            page.click('.single_add_to_cart_button')
        ]);
        await page.waitFor(1000);
    },

    addToCartFromCatalog: async (id) => {
        await page.setViewport({width: 1000, height: 2000});
        await page.waitFor(300);
        await page.click(`.add_to_cart_button[data-product_id="${id}"]`);
        await page.waitFor(1000);
    },

    deleteProductFromCart: async (id) => {
        await page.goto(SHOP_CART_PAGE, {waitUntil: 'networkidle0'});
        await page.click(`.remove[data-product_id="${id}"]`);
        await page.waitForFunction(() => !Boolean(document.querySelector('.blockUI')));
    },

    navigateToHome: async () => {
        await page.goto(SHOP_HOME, {
            waitUntil: 'networkidle0'
        });
    },

    navigateToPost: async () => {
        await page.goto(SHOP_HOME + 'uncategorized/hello-world/', {
            waitUntil: 'networkidle0'
        });
    },

    navigateTo404: async () => {
        await page.goto(SHOP_404_PAGE, {
            waitUntil: 'networkidle0'
        });
    },

    navigateToPrivacyPolicy: async () => {
        await page.goto(SHOP_PRIVACY_POLICY, {
            waitUntil: 'networkidle0'
        });
    },

    navigateToSamplePage: async () => {
        await page.goto(SHOP_SAMPLE_PAGE, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToCategory: async () => {
        await page.goto(SHOP_CATEGORY_PAGE, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToSearch: async (search) => {
        await page.goto(SHOP_HOME + '?s=' + search, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToCheckout: async () => {
        await page.goto(SHOP_CHECKOUT_PAGE, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToMyAccountOverview: async () => {
        await page.goto(MY_ACCOUNT, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToOrderOverview: async () => {
        await page.goto(MY_ACCOUNT_ORDERS, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToDownloadOverview: async () => {
        await page.goto(MY_ACCOUNT_DOWNLOADS, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToAddressOverview: async () => {
        await page.goto(MY_ACCOUNT_ADDRESSES, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToAccountDetail: async () => {
        await page.goto(MY_ACCOUNT_ACCOUNT_DETAILS, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToProduct: async (postID) => {
        await page.goto(SHOP_PRODUCT_PAGE + postID, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToProductCategory: async (cat) => {
        await page.goto(SHOP_CATEGORY + cat, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToCatalog: async () => {
        await page.goto(SHOP_PAGE, {
            waitUntil: 'networkidle0',
        });
    },

    placeOrder: async () => {
        await Promise.all([
            expect(page).toClick('#place_order'),
            page.waitForNavigation({waitUntil: 'networkidle0'})
        ]);
    },

    login: async () => {
        await page.goto(SHOP_MY_ACCOUNT_PAGE, {
            waitUntil: 'networkidle0',
        });

        await page.type('#username', config.get('users.customer.username'));
        await page.type('#password', config.get('users.customer.password'));

        await page.setViewport({width: 1000, height: 2000});

        await Promise.all([
            page.waitForNavigation({waitUntil: 'networkidle0'}),
            page.click('button[name="login"]'),
        ]);
    },

    logout: async () => {
        await page.goto(baseUrl + 'wp-login.php?action=logout', {
            waitUntil: 'networkidle0',
        });

        await expect(page).toMatch('You are attempting to log out');

        await Promise.all([
            page.waitForNavigation({waitUntil: 'networkidle0'}),
            page.click('a'),
        ]);
    },

    fillBillingDetails: async () => {
        await expect(page).toFill('#billing_first_name', billingDetails.firstname);
        await expect(page).toFill('#billing_last_name', billingDetails.lastname);
        await expect(page).toFill('#billing_company', billingDetails.company);
        await expect(page).toSelect('#billing_country', billingDetails.country);
        await expect(page).toFill('#billing_address_1', billingDetails.addressfirstline);
        await expect(page).toFill('#billing_address_2', billingDetails.addresssecondline);
        await expect(page).toFill('#billing_city', billingDetails.city);
        await expect(page).toSelect('#billing_state', billingDetails.state);
        await expect(page).toFill('#billing_postcode', billingDetails.postcode);
        await expect(page).toFill('#billing_phone', billingDetails.phone);
        await expect(page).toFill('#billing_email', billingDetails.email);
    }
};

const Admin = {
    activateGTMOrTI: async (type) => {
        await Admin.login();
        await Admin.navigateToSetting();
        await Admin.clickOnElement('#General_v_' + (type === 'ti' ? '5' : '6'));
        await Admin.saveChanges();
        await Admin.logout();
    },

    fillFormField: async (selector, value) => {
        await expect(page).toFill(selector, value);
    },

    getFormFieldValue: async (name) => {
        const value = await page.evaluate((e) => {
            return Promise.resolve(document.querySelector('#mapp_' + e).value);
        }, name);

        return value;
    },

    checkText: async (txt) => {
        await expect(page).toMatch(txt);
    },

    clickOnElement: async (selector, value) => {
        await expect(page).toClick(selector, value);
    },

    saveChanges: async () => {
        await page.setViewport({width: 1000, height: 2000});
        await Promise.all([
            page.waitForNavigation({waitUntil: 'networkidle0'}),
            page.click('.button-primary')
        ]);
    },

    login: async () => {
        await page.goto(WP_ADMIN_LOGIN, {
            waitUntil: 'networkidle0',
        });

        await expect(page.title()).resolves.toMatch('Log In');

        await page.focus('#user_login');
        await pressKeyWithModifier('primary', 'a');
        await page.type('#user_login', '');

        await page.type('#user_login', config.get('users.admin.username'));
        await page.type('#user_pass', config.get('users.admin.password'));

        await Promise.all([
            page.click('input[type=submit]'),
            page.waitForNavigation({waitUntil: 'networkidle0'}),
        ]);
    },

    logout: async () => {
        await page.goto(baseUrl + 'wp-login.php?action=logout', {
            waitUntil: 'networkidle0',
        });

        await expect(page).toMatch('You are attempting to log out');

        await Promise.all([
            page.waitForNavigation({waitUntil: 'networkidle0'}),
            page.click('a'),
        ]);
    },

    navigateToPlugins: async () => {
        await page.goto(WP_ADMIN_PLUGINS, {
            waitUntil: 'networkidle0',
        });
    },

    navigateToSetting: async () => {
        await page.goto(WP_ADMIN_MI_SETTINGS, {
            waitUntil: 'networkidle0',
        });
    },

    savePermalink: async () => {
        await page.goto(WP_ADMIN_PERMALINK, {
            waitUntil: 'networkidle0',
        });

        await page.setViewport({width: 1000, height: 2000});

        await page.click('#custom_selection');
        await expect(page).toFill('#permalink_structure', '/%category%/%postname%/');
        await expect(page).toFill('#woocommerce_permalink_structure', '/product/');

        await Promise.all([
            page.waitForNavigation({waitUntil: 'networkidle0'}),
            page.click('#submit')
        ]);
    }
};

export {User, Admin, GTM_ID, TI_ID};
