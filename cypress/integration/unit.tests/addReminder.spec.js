/* eslint-disable no-undef */
/// <reference types="cypress" />

const { wait } = require("@testing-library/react");

it('Add a new blue reminder with city on day 15', () => {
    cy.visit('/')
    wait(500)
    cy.get('[data-cy="openmodal-15"]').click();
    wait(500)
    cy.get('[data-cy="reminder-field"]')
      .type('Testing a new reminder with 30').should('have.value', 'Testing a new reminder with 30');
    cy.get('[data-cy="city-field"]')
      .type('Goiania').should('have.value', 'Goiania');
    cy.get('[data-cy="color-field-blue"]').click();
    cy.get('[data-cy="btn-save-reminder"]').click();
});

it('Add a new reminder with no city', () => {
    cy.visit('/')
    wait(500)
    cy.get('[data-cy="openmodal-20"]').click();
    wait(500)
    cy.get('[data-cy="reminder-field"]')
      .type('Testing a new reminder with 30').should('have.value', 'Testing a new reminder with 30');
    cy.get('[data-cy="color-field-blue"]').click();
    cy.get('[data-cy="btn-save-reminder"]').click();
    cy.contains('City can\'t be empty.').should('have.length', 1);
});

it('Add a new reminder with no description', () => {
    cy.visit('/')
    wait(500)
    cy.get('[data-cy="openmodal-10"]').click();
    wait(500)
    cy.get('[data-cy="city-field"]')
    .type('Goiania').should('have.value', 'Goiania');
    cy.get('[data-cy="color-field-blue"]').click();
    cy.get('[data-cy="btn-save-reminder"]').click();
    cy.contains('Reminder can\'t be empty.').should('have.length', 1);
});

it('Add a new reminder with no color', () => {
    cy.visit('/')
    wait(500)
    cy.get('[data-cy="openmodal-10"]').click();
    wait(500)
    cy.get('[data-cy="reminder-field"]')
    .type('Testing a new reminder with 30').should('have.value', 'Testing a new reminder with 30');
    cy.get('[data-cy="city-field"]')
    .type('Goiania').should('have.value', 'Goiania');
    cy.get('[data-cy="btn-save-reminder"]').click();
    cy.contains('Please select a color.').should('have.length', 1);
});
