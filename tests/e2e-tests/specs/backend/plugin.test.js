import { User, Admin, GTM_ID, TI_ID } from '../../utils/puppeteer';

let changePermalink = true;

beforeAll(async () => {
    if (changePermalink) {
        changePermalink = false;

        await Admin.login();
        await Admin.savePermalink();
        await Admin.logout();
    }
});

describe('Plugin', () => {
    beforeEach(async () => {
        await Admin.login();
    });

    afterEach(async () => {
        await Admin.logout();
    });

    it('in overview', async () => {
        await Admin.navigateToPlugins();

        await Admin.checkText('Mapp Cloud');
    });

    describe('settings', () => {
        describe('Google Tag Manager', () => {
            beforeEach(async () => {
                await Admin.navigateToSetting();
                await Admin.clickOnElement('#General_v_6');
            });

            afterEach(async () => {
                await Admin.fillFormField('#mapp_gtmId', GTM_ID);
                await Admin.fillFormField('#mapp_filterKeys', 'customFields');
                // await Admin.saveChanges();
            });

            it('overview', async () => {
                await Admin.checkText('Mapp Cloud');
                await Admin.checkText('Mapp Intelligence Pixel Version');
                await Admin.checkText('Google Tag Manager Container ID');
                await Admin.checkText('Exclude keys');
                await Admin.checkText('Exclude users');
            });

            describe('error', () => {
                it('Google Tag Manager Container ID', async () => {
                    await Admin.fillFormField('#mapp_gtmId', 'foo.bar');

                    await Admin.checkText(/Enter\syour\sGoogle\sTag\sManager\sContainer\sID/);
                    await Admin.checkText(/Error:\sGTM\sConatiner\sID\snot\svalid/);
                    await Admin.checkText(/GTM-XXXXXXX/);
                });
            });

            describe('save', () => {
                it('Google Tag Manager Container ID', async () => {
                    await Admin.fillFormField('#mapp_gtmId', 'GTM-XXXXXXX');
                    await Admin.saveChanges();

                    const value = await Admin.getFormFieldValue('gtmId');
                    expect(value).toBe('GTM-XXXXXXX');
                });

                it('Exclude keys', async () => {
                    await Admin.fillFormField('#mapp_filterKeys', 'language,pageName');
                    await Admin.saveChanges();

                    const value = await Admin.getFormFieldValue('filterKeys');
                    expect(value).toBe('language,pageName');
                });
            });
        });

        describe('Tag Integration', () => {
            beforeEach(async () => {
                await Admin.navigateToSetting();
                await Admin.clickOnElement('#General_v_5');
            });

            afterEach(async () => {
                await Admin.fillFormField('#mapp_tiId', TI_ID);
                await Admin.fillFormField('#mapp_tiDomain', 'responder.wt-safetag.com');
                await Admin.fillFormField('#mapp_filterKeys', 'customFields');
                await Admin.saveChanges();
            });

            it('overview', async () => {
                await Admin.checkText('Mapp Cloud Settings');
                await Admin.checkText('Mapp Intelligence Pixel Version');
                await Admin.checkText('Tag Integration ID');
                await Admin.checkText('Tag Integration Domain');
                await Admin.checkText('Exclude keys');
                await Admin.checkText('Exclude users');
            });

            describe('error', () => {
                it('Tag Integration ID', async () => {
                    await Admin.fillFormField('#mapp_tiId', '12345');
                    await Admin.checkText(/Enter\syour\sTag\sIntegration\sID/);
                    await Admin.checkText(/Error:\sThe\stiId\shas\sto\sconsist\sof\s15\snumbers/);
                });

                /*
                it('Tag Integration Domain', async () => {
                    await Admin.fillFormField('#mapp_tiDomain', 'foo');
                    await Admin.checkText('Enter your Tag Integration Domain - Error: The tiDomain has to consist of a domain');
                });
                */
            });

            describe('save', () => {
                it('Tag Integration ID', async () => {
                    await Admin.fillFormField('#mapp_tiId', '123451234512345');
                    await Admin.saveChanges();

                    const value = await Admin.getFormFieldValue('tiId');
                    expect(value).toBe('123451234512345');
                });

                it('Tag Integration Domain', async () => {
                    await Admin.fillFormField('#mapp_tiDomain', 'responder.own-domain.tld');
                    await Admin.saveChanges();

                    const value = await Admin.getFormFieldValue('tiDomain');
                    expect(value).toBe('responder.own-domain.tld');
                });

                it('Exclude keys', async () => {
                    await Admin.fillFormField('#mapp_filterKeys', 'language,pageName');
                    await Admin.saveChanges();

                    const value = await Admin.getFormFieldValue('filterKeys');
                    expect(value).toBe('language,pageName');
                });
            });
        });
    });

    describe('inject script', () => {
        beforeEach(async () => {
            await Admin.navigateToSetting();
        });

        it('Tag Integration', async () => {
            let scriptInjected = false;

            await Admin.clickOnElement('#General_v_5');
            await Admin.saveChanges();

            await page.on('request', request => {
                if (request.url().indexOf('responder.wt-safetag.com/resp/api/get/' + TI_ID) !== -1) {
                    scriptInjected = true;
                }
            });
            await User.navigateToHome();
            await expect(scriptInjected).toBe(true);
        });

        it('Google Tag Manager', async () => {
            let scriptInjected = false;

            await Admin.clickOnElement('#General_v_6');
            await Admin.saveChanges();

            await page.on('request', request => {
                if (request.url().indexOf('www.googletagmanager.com/gtm.js?id=' + GTM_ID) !== -1) {
                    scriptInjected = true;
                }
            });
            await User.navigateToHome();
            await expect(scriptInjected).toBe(true);
        });
    });

    describe('disable tracking', () => {
        beforeEach(async () => {
            await Admin.navigateToSetting();
            await Admin.clickOnElement('#mapp_excludeWpUser');
            await Admin.saveChanges();
        });

        afterEach(async () => {
            await Admin.navigateToSetting();
            await Admin.clickOnElement('#mapp_excludeWpUser');
            await Admin.saveChanges();
        });

        it('Tag Integration', async () => {
            await Admin.clickOnElement('#General_v_5');
            await Admin.saveChanges();
            await User.navigateToHome();

            const result = await User.getDataLayer('_ti');
            await expect(typeof result).toBe('undefined');
        });

        it('Google Tag Manager', async () => {
            await Admin.clickOnElement('#General_v_6');
            await Admin.saveChanges();
            await User.navigateToHome();

            const result = await User.getDataLayer('dataLayer');
            await expect(typeof result).toBe('undefined');
        });
    });
});
