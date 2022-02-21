import { routes } from '../shared/constants';

describe('Register', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/auth/register').as('registerRequest');
    cy.intercept('GET', '/api/profile').as('profileRequest');

    cy.visit(routes.REGISTER);
  });

  it('should display form', () => {
    // then
    cy.get('[data-testid=register]').within(() => {
      cy.get('input').should('have.length', 5);
      cy.get('button').should('have.length', 1);
    });
  });

  it('should successfully register user', () => {
    // given
    const newUser = {
      firstName: 'Mark',
      lastName: 'Smith',
      email: 'new@events.com',
      password: 'newPassword',
      confirmPassword: 'newPassword',
    };

    cy.get('[data-testid=register]').within(() => {
      // when
      cy.get('#firstName').clear().type(newUser.firstName);
      cy.get('#lastName').clear().type(newUser.lastName);
      cy.get('#email').clear().type(newUser.email);
      cy.get('#password').clear().type(newUser.password);
      cy.get('#confirmPassword').clear().type(newUser.confirmPassword);
      cy.get('button').contains('Register').click();

      cy.wait('@registerRequest');
      cy.wait('@profileRequest');

      // then
      cy.location('pathname').should('eq', routes.PROFILE);
    });
  });
});
