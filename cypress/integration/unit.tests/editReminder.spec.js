/* eslint-disable no-undef */
/// <reference types="cypress" />

const { wait } = require("@testing-library/react");

it('Add a new black reminder with city on day 10 then edit the city', () => {
    cy.visit('/')
    wait(500)
    cy.get('[data-cy="openmodal-10"]').click();
    wait(500)
    cy.get('[data-cy="reminder-field"]')
      .type('Testing a new reminder with 30').should('have.value', 'Testing a new reminder with 30');
    cy.get('[data-cy="city-field"]')
      .type('Goiania').should('have.value', 'Goiania');
    cy.get('[data-cy="color-field-black"]').click();
    cy.get('[data-cy="btn-save-reminder"]').click();
    wait(1000)
    cy.get('[data-cy="reminder-1"]').click();
    wait(500)

    cy.get('[data-cy="city-field"]').should('have.value', 'Goiania');
    cy.get('[data-cy="city-field"]').clear();
    cy.get('[data-cy="city-field"]')
      .type('New York').should('have.value', 'New York');
    cy.get('[data-cy="btn-save-reminder"]').click();
    wait(1000)
    cy.contains('Goiania').should('have.length', 1);
    cy.contains('New York').should('have.length', 1);
});