// / <reference types="Cypress" />

describe("Plugin", () => {
	beforeEach(() => {	
        cy.intercept("POST", "http://wordpress-mapp/wp-json/mapp-digital/v1/settings").as("saveRequest");
	});

	it("in overview", () => {
        cy.adminLogin("/wp-admin/plugins.php");
		cy.contains("Mapp Cloud Integration");
	});

    describe('settings', () => {
        describe('Google Tag Manager', () => {
            before(() =>{
                cy.setSettings({v:6});
            });

            beforeEach(() =>{
                cy.goToSettings();
            });

            it('overview', () => {
                cy.contains('Mapp Cloud');
                cy.contains('Mapp Intelligence Pixel Version');
                cy.contains('Google Tag Manager Container ID');
                cy.contains('Exclude keys');
                cy.contains('Exclude users');
            });

            describe('error', () => {
                it('Google Tag Manager Container ID', () => {
                    cy.get('#mapp_gtmId').clear().type('foo.bar');
                    cy.contains(/Enter\syour\sGoogle\sTag\sManager\sContainer\sID/);
                    cy.contains(/Error:\sGTM\sContainer\sID\snot\svalid/);
                    cy.contains(/GTM-XXXXXXX/);
                });
            });

            describe('save', () => {
                it('Google Tag Manager Container ID', () => {
                    cy.get('#mapp_gtmId').clear().type('GTM-XXXXXXX');
                    cy.get('#mapp_save').click();
                    cy.wait('@saveRequest').then(saveRequest => {
                        console.log(saveRequest);
                    })

                });

                // it('Exclude keys', async () => {
                //     await Admin.fillFormField('#mapp_filterKeys', 'language,pageName');
                //     await Admin.saveChanges();

                //     const value = await Admin.getFormFieldValue('filterKeys');
                //     expect(value).toBe('language,pageName');
                // });
            });
        });



    });

});

