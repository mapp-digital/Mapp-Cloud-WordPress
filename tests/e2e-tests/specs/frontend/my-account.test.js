import { User, Admin } from '../../utils/puppeteer';

let isGoogleTagManagerActive = false;
let isTagIntegrationActive = false;

describe('My account', () => {
    describe('Google Tag Manager', () => {
        beforeEach(async () => {
            if (!isGoogleTagManagerActive) {
                isGoogleTagManagerActive = true;
                await Admin.activateGTMOrTI('gtm');
            }
            await User.login();
        });

        afterEach(async () => {
            await User.logout();
        });

        it('dashboard', async () => {
            await User.navigateToMyAccountOverview();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/my-account/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });

        it('orders', async () => {
            await User.navigateToOrderOverview();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/my-account/orders/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });

        it('downloads', async () => {
            await User.navigateToDownloadOverview();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/my-account/downloads/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });

        it('addresses', async () => {
            await User.navigateToAddressOverview();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/my-account/edit-address/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });

        it('account details', async () => {
            await User.navigateToAccountDetail();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/my-account/edit-account/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });
    });

    describe('Tag Integration', () => {
        beforeEach(async () => {
            if (!isTagIntegrationActive) {
                isTagIntegrationActive = true;
                await Admin.activateGTMOrTI('ti');
            }
            await User.login();
        });

        afterEach(async () => {
            await User.logout();
        });

        it('dashboard', async () => {
            await User.navigateToMyAccountOverview();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/my-account/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });

        it('orders', async () => {
            await User.navigateToOrderOverview();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/my-account/orders/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });

        it('downloads', async () => {
            await User.navigateToDownloadOverview();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/my-account/downloads/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });

        it('addresses', async () => {
            await User.navigateToAddressOverview();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/my-account/edit-address/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });

        it('account details', async () => {
            await User.navigateToAccountDetail();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/my-account/edit-account/');
            expect(result.pageTitle).toBe('My account');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
            expect(result.customerId).toMatch(/.+/);
            expect(result.userRoles[0]).toBe('customer');
        });
    });
});
