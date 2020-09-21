/* eslint-disable no-undef */
/// <reference types="cypress" />

const { wait } = require("@testing-library/react");

it('Add a new red reminder with city on day 2 then delete it', () => {
    cy.visit('/')
    wait(500)
    cy.get('[data-cy="openmodal-2"]').click();
    wait(500)
    cy.get('[data-cy="reminder-field"]')
      .type('Testing a new reminder with 30').should('have.value', 'Testing a new reminder with 30');
    cy.get('[data-cy="city-field"]')
      .type('Goiania').should('have.value', 'Goiania');
    cy.get('[data-cy="color-field-red"]').click();
    cy.get('[data-cy="btn-save-reminder"]').click();
    wait(1000)
    cy.get('[data-cy="reminder-1"]').click();
    wait(500)
    cy.get('[data-cy="btn-delete-reminder"]').should('have.length', 1);
    cy.get('[data-cy="btn-delete-reminder"]').click();
    wait(500)
    cy.get('[data-cy="confirmation-yes"]').should('have.length', 1);
    cy.get('[data-cy="confirmation-yes"]').click();

    cy.get('[data-cy="reminder-1').should('have.length', 0);
    cy.contains('Goiania').should('have.length', 0);
});

it('Add two reminders on day 2 then delete both', () => {
  cy.visit('/')
  wait(500)
  cy.get('[data-cy="openmodal-2"]').click();
  wait(500)
  cy.get('[data-cy="reminder-field"]')
    .type('Testing a new reminder with 30').should('have.value', 'Testing a new reminder with 30');
  cy.get('[data-cy="city-field"]')
    .type('Goiania').should('have.value', 'Goiania');
  cy.get('[data-cy="color-field-blue"]').click();
  cy.get('[data-cy="btn-save-reminder"]').click();
  wait(1000)
  cy.get('[data-cy="openmodal-2"]').click();
  wait(500)
  cy.get('[data-cy="reminder-field"]')
    .type('Testing a new reminder with 30').should('have.value', 'Testing a new reminder with 30');
  cy.get('[data-cy="city-field"]')
    .type('Chicago').should('have.value', 'Chicago');
  cy.get('[data-cy="color-field-red"]').click();
  cy.get('[data-cy="btn-save-reminder"]').click();
  wait(1000)

  cy.get('[data-cy="openmodalexclude-2"]').click();
  cy.get('[data-cy="confirmation-yes"]').should('have.length', 1);
  cy.get('[data-cy="confirmation-yes"]').click();

  cy.get('[data-cy="reminder-1').should('have.length', 0);
  cy.get('[data-cy="reminder-2').should('have.length', 0);
});