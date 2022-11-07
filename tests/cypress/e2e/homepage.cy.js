// / <reference types="Cypress" />

describe('MappIntelligencePluginTests: Homepage', () => {

    it('homepage basic datalayer', () => {
        cy.visit("/");
        cy.contains("Mapp Cloud WordPress/Woocommerce E3E");
    });
});
