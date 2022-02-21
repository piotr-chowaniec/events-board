import { routes } from '../shared/constants';

describe('Profile', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/profile').as('profileRequest');

    cy.visit(routes.PROFILE);
    cy.loginUser();
    cy.wait('@profileRequest');
  });

  it('should display form', () => {
    // then
    cy.get('[data-testid=profile]').within(() => {
      cy.get('input').should('have.length', 4);
      cy.get('button').should('have.length', 2);
      cy.get('a').should('have.length', 1);
    });
  });

  it('should successfully update user data', () => {
    // given
    const updatedUser = {
      firstName: 'Mark',
      lastName: 'Smith',
      email: 'new@events.com',
    };

    cy.get('[data-testid=profile]').within(() => {
      // when
      cy.get('#firstName').clear().type(updatedUser.firstName);
      cy.get('#lastName').clear().type(updatedUser.lastName);
      cy.get('#email').clear().type(updatedUser.email);
      cy.get('button').contains('Save').click();

      cy.wait('@profileRequest');

      // then
      cy.get('#firstName').invoke('val').should('eq', updatedUser.firstName);
      cy.get('#lastName').invoke('val').should('eq', updatedUser.lastName);
      cy.get('#email').invoke('val').should('eq', updatedUser.email);
    });
  });

  it('should successfully update user password', () => {
    // given
    cy.get('[data-testid=profile]').get('a').contains('Password').click();

    cy.get('[data-testid=profile-password-change]').within(() => {
      // when
      cy.get('#password').type('newPassword');
      cy.get('#confirmPassword').type('newPassword');
      cy.get('button').contains('Change Password').click();
    });

    cy.wait('@profileRequest');

    // then
    cy.location('pathname').should('eq', routes.PROFILE);
  });

  it('should successfully remove user profile and logout', () => {
    // given
    cy.intercept('DELETE', '/api/users/*').as('deleteProfileRequest');

    cy.get('[data-testid=profile]')
      .get('button')
      .contains('Remove Your Profile')
      .click();

    // when
    cy.get('[data-testid=modal-button-confirm]').should('be.visible').click();
    cy.wait('@deleteProfileRequest');

    // then
    cy.location('pathname').should('eq', routes.MAIN);
    cy.get('[data-testid=navbar-login-dropdown]').should('be.visible');
  });
});
