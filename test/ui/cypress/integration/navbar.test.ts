import { routes } from '../shared/constants';

describe('Navbar', () => {
  beforeEach(() => {
    cy.visit(routes.MAIN);
  });

  it('should display navbar login dropdown', () => {
    // when
    cy.get('[data-testid=navbar-login-dropdown]').should('be.visible').click();

    // then
    cy.get('[data-testid=register-link]')
      .contains('Register')
      .should('be.visible');

    cy.get('[data-testid=navbar-login-form]')
      .should('be.visible')
      .find('input')
      .should('have.length', 2)
      .should('be.visible');
  });

  it('should successfully login user', () => {
    // when
    cy.navbarLoginUser();

    // then
    cy.get('[data-testid=navbar-authenticated-dropdown-button]')
      .contains('Logged In')
      .should('be.visible');
  });

  it('should successfully logout user', () => {
    // given
    cy.navbarLoginUser();
    cy.get('[data-testid=navbar-authenticated-dropdown-button]')
      .contains('Logged In')
      .should('be.visible');

    // when
    cy.navbarLogout();

    // then
    cy.get('[data-testid=navbar-login-dropdown]')
      .contains('Login/Register')
      .should('be.visible');
  });

  it('should display user navbar items', () => {
    // when
    cy.navbarLoginUser();

    // then
    cy.get('[data-testid=navbar-buttons]').within(() => {
      cy.contains('Your Events').should('be.visible');
      cy.contains('You Participate').should('be.visible');
    });

    cy.get('[data-testid=navbar-authenticated-dropdown-button]')
      .contains('Logged In')
      .should('be.visible')
      .click();
    cy.get('[data-testid=navbar-authenticated-dropdown]').within(() => {
      cy.contains('Profile').should('have.attr', 'href', routes.PROFILE);
      cy.contains('Logout').should('be.visible');
    });
  });

  it('should successfully login admin', () => {
    // when
    cy.navbarLoginAdmin();

    // then
    cy.get('[data-testid=navbar-authenticated-dropdown-button]')
      .contains('Logged In')
      .should('be.visible');
  });

  it('should display admin navbar items', () => {
    // when
    cy.navbarLoginAdmin();

    // then
    cy.get('[data-testid=navbar-buttons]').within(() => {
      cy.contains('Your Events').should('be.visible');
      cy.contains('You Participate').should('be.visible');
    });

    cy.get('[data-testid=navbar-admin-dropdown-button]')
      .contains('Admin Panel')
      .should('be.visible')
      .click();
    cy.get('[data-testid=navbar-admin-dropdown]').within(() => {
      cy.contains('Events')
        .should('have.attr', 'href', routes.ALL_EVENTS)
        .and('be.visible');
      cy.contains('Users')
        .should('have.attr', 'href', routes.ALL_USERS)
        .and('be.visible');
      cy.contains('Participants')
        .should('have.attr', 'href', routes.ALL_PARTICIPANTS)
        .and('be.visible');
    });

    cy.get('[data-testid=navbar-authenticated-dropdown-button]')
      .contains('Logged In')
      .should('be.visible')
      .click();
    cy.get('[data-testid=navbar-authenticated-dropdown]').within(() => {
      cy.contains('Profile').should('have.attr', 'href', routes.PROFILE);
      cy.contains('Logout').should('be.visible');
    });
  });

  it('should remain not logged in when provided user does not exist', () => {
    // when
    cy.get('[data-testid=navbar-login-dropdown]').click();

    cy.get('[data-testid=navbar-login-form]').within(() => {
      cy.get('#email').type('random@events.com');
      cy.get('#password').type('someRandomPassword');
      cy.contains('Login').click();
    });

    cy.get('[data-testid=navbar-login-dropdown]')
      .contains('Login/Register')
      .should('be.visible');
  });
});
