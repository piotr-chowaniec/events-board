import { routes } from '../shared/constants';

describe('Events Board', () => {
  it('Navigates to Events Board and verify layout', () => {
    // when
    cy.visit(routes.MAIN);

    // then
    cy.title().should('eq', 'Events Board');
    cy.get('[data-testid=navbar-main-link]')
      .contains('EventsBoard')
      .should('be.visible')
      .and('have.attr', 'href', routes.MAIN);
    cy.get('[data-testid=navbar-login-dropdown]')
      .contains('Login/Register')
      .should('be.visible');
    cy.get('[data-testid=main-page-header]').should('be.visible');
    cy.get('[data-testid=footer]')
      .should('be.visible')
      .within(() => {
        cy.contains('© 2022 Piotr Chowaniec').should('be.visible');
        cy.get('a').should('have.length', 2);
      });
  });
});
