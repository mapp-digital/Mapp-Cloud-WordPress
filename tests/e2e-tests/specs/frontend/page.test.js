import {User, Admin} from '../../utils/puppeteer';

let isGoogleTagManagerActive = false;
let isTagIntegrationActive = false;

describe('Page', () => {
    describe('Google Tag Manager', () => {
        beforeEach(async () => {
            if (!isGoogleTagManagerActive) {
                isGoogleTagManagerActive = true;
                await Admin.activateGTMOrTI('gtm');
            }
        });

        it('home', async () => {
            await User.navigateToHome();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/');
            expect(result.contentCategory).toBe('home');
        });

        it('privacy policy', async () => {
            await User.navigateToPrivacyPolicy();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/privacy-policy/');
            expect(result.pageTitle).toBe('Privacy Policy');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
        });

        it('sample page', async () => {
            await User.navigateToSamplePage();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/sample-page/');
            expect(result.pageTitle).toBe('Sample Page');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
        });

        it('category page', async () => {
            await User.navigateToCategory();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/category/uncategorized/');
            expect(result.pageTitle).toBe('Uncategorized');
            expect(result.contentCategory).toBe('archive');
            expect(result.contentSubcategory).toBe('category-post');
        });

        it('search page', async () => {
            await User.navigateToSearch('hoodie');

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/');
            expect(result.internalSearch).toBe('hoodie');
            expect(result.numberSearchResults).toBe('4');
            expect(result.contentCategory).toBe('internal search');
        });

        it('post page', async () => {
            await User.navigateToPost();

            const result = await User.getDataLayer('dataLayer');
            expect(result.pageName).toBe('wordpress-mapp/uncategorized/hello-world/');
            expect(result.pageTitle).toBe('Hello world!');
            expect(result.contentCategory).toBe('post');
            expect(result.contentSubcategory).toBe('single-post');
        });


        it('404', async () => {
          await User.navigateTo404();

          const result = await User.getDataLayer('dataLayer');
          expect(result.pageName).toBe('wordpress-mapp/doesnt-exist');
          expect(result.errorCode).toBe('404');
          expect(result.errorMessage).toBe('page not found');
        });

    });

    describe('Tag Integration', () => {
        beforeEach(async () => {
            if (!isTagIntegrationActive) {
                isTagIntegrationActive = true;
                await Admin.activateGTMOrTI('ti');
            }
        });

        it('home', async () => {
            await User.navigateToHome();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/');
            expect(result.contentCategory).toBe('home');
        });

        it('privacy policy', async () => {
            await User.navigateToPrivacyPolicy();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/privacy-policy/');
            expect(result.pageTitle).toBe('Privacy Policy');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
        });

        it('sample page', async () => {
            await User.navigateToSamplePage();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/sample-page/');
            expect(result.pageTitle).toBe('Sample Page');
            expect(result.contentCategory).toBe('page');
            expect(result.contentSubcategory).toBe('single-page');
        });

        it('category page', async () => {
            await User.navigateToCategory();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/category/uncategorized/');
            expect(result.pageTitle).toBe('Uncategorized');
            expect(result.contentCategory).toBe('archive');
            expect(result.contentSubcategory).toBe('category-post');
        });

        it('search page', async () => {
            await User.navigateToSearch('hoodie');

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/');
            expect(result.internalSearch).toBe('hoodie');
            expect(result.numberSearchResults).toBe('4');
            expect(result.contentCategory).toBe('internal search');
        });

        it('post page', async () => {
            await User.navigateToPost();

            const result = await User.getDataLayer('_ti');
            expect(result.pageName).toBe('wordpress-mapp/uncategorized/hello-world/');
            expect(result.pageTitle).toBe('Hello world!');
            expect(result.contentCategory).toBe('post');
            expect(result.contentSubcategory).toBe('single-post');
        });

        it('404', async () => {
          await User.navigateTo404();

          const result = await User.getDataLayer('_ti');
          expect(result.pageName).toBe('wordpress-mapp/doesnt-exist');
          expect(result.errorCode).toBe('404');
          expect(result.errorMessage).toBe('page not found');
        });
    });
});
