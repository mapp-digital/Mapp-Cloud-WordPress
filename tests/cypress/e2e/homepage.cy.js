// / <reference types="Cypress" />

describe('MappIntelligencePluginTests: Homepage', () => {

    it('homepage basic datalayer', () => {
        // cy.adminLogin();
        cy.setOptions({v:5});
        cy.visit("/");
        cy.contains("Mapp Cloud WordPress/Woocommerce E2E");
    });
});
