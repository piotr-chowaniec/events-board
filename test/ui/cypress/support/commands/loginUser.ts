/// <reference path="./loginUser.d.ts" />

import { user, admin, routes } from '../../shared/constants';

Cypress.Commands.add('loginUser', () => {
  cy.intercept('POST', '/api/auth/login').as('login');

  cy.location('pathname').should('eq', routes.LOGIN);

  cy.get('[data-testid=login').within(() => {
    cy.get('#email').type(user.email);
    cy.get('#password').type(user.password);
    cy.get('button').contains('Login').click();
    cy.wait('@login');
  });
});

Cypress.Commands.add('loginAdmin', () => {
  cy.intercept('POST', '/api/auth/login').as('login');

  cy.location('pathname').should('eq', routes.LOGIN);

  cy.get('[data-testid=login').within(() => {
    cy.get('#email').type(admin.email);
    cy.get('#password').type(admin.password);
    cy.get('button').contains('Login').click();
    cy.wait('@login');
  });
});

Cypress.Commands.add('navbarLoginUser', () => {
  cy.intercept('POST', '/api/auth/login').as('login');

  cy.get('[data-testid=navbar-login-dropdown]').click();

  cy.get('[data-testid=navbar-login-form').within(() => {
    cy.get('#email').type(user.email);
    cy.get('#password').type(user.password);
    cy.contains('Login').click();
    cy.wait('@login');
  });
});

Cypress.Commands.add('navbarLoginAdmin', () => {
  cy.intercept('POST', '/api/auth/login').as('login');

  cy.get('[data-testid=navbar-login-dropdown]').click();

  cy.get('[data-testid=navbar-login-form').within(() => {
    cy.get('#email').type(admin.email);
    cy.get('#password').type(admin.password);
    cy.contains('Login').click();
    cy.wait('@login');
  });
});

Cypress.Commands.add('navbarLogout', () => {
  cy.get('[data-testid=navbar-authenticated-dropdown-button]').click();
  cy.get('[data-testid=navbar-authenticated-dropdown]').within(() => {
    cy.contains('Logout').click();
  });
});
