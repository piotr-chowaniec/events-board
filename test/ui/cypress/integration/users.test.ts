import { routes } from '../shared/constants';

describe('Users', () => {
  beforeEach(() => {
    cy.visit(routes.MAIN);
  });

  describe('Admin', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        pathname: '/api/users',
      }).as('getUsersRequest');

      cy.visit(routes.MAIN);
      cy.navbarLoginAdmin();

      cy.get('[data-testid=navbar-admin-dropdown-button]').click();
      cy.get('[data-testid=navbar-admin-dropdown]').within(() => {
        cy.contains('Users').click();
      });
      cy.wait('@getUsersRequest');
    });

    it('should display list of participants', () => {
      // then
      cy.contains('All Users').should('be.visible');
      cy.get('[data-testid=all-users]').within(() => {
        cy.get('button:visible:contains("Edit")').should('be.visible');
        cy.get('button:visible:contains("Delete")').should('be.visible');
      });
    });

    it('should successfully edit user details', () => {
      // given
      const oldUserEmail = 'user_5@events.com';
      const updatedUserEmail = 'updated_user@events.com';

      // when
      cy.get('[data-testid=all-users]').within(() => {
        cy.get('button:visible:contains("Edit")')
          .its('length')
          .as('numberOfUsers');
        cy.get('tr')
          .contains(oldUserEmail)
          .should('be.visible')
          .parent('tr')
          .find('button:visible:contains("Edit")')
          .click({
            scrollBehavior: 'center',
          });
      });
      cy.get('[data-testid=edit-user-form]').within(() => {
        cy.get('#email').clear().type(updatedUserEmail);
      });
      cy.get('[data-testid=form-modal-button-confirm]')
        .should('be.visible')
        .click();
      cy.wait('@getUsersRequest');

      // then
      cy.get('[data-testid=all-users]').within(() => {
        cy.contains(updatedUserEmail);
        cy.get('@numberOfUsers').then((numberOfUsers) => {
          cy.get('button:visible:contains("Edit")').should(
            'have.length',
            +numberOfUsers,
          );
        });
      });
    });

    it('should successfully delete user', () => {
      // given
      const userToDelete = 'user_5@events.com';

      // when
      cy.get('[data-testid=all-users]').within(() => {
        cy.get('button:visible:contains("Delete")')
          .its('length')
          .as('numberOfUsers');
        cy.get('tr')
          .contains(userToDelete)
          .should('be.visible')
          .parent('tr')
          .find('button:visible:contains("Delete")')
          .click({
            scrollBehavior: 'center',
          });
      });
      cy.get('[data-testid=modal-button-confirm]').should('be.visible').click();

      cy.wait('@getUsersRequest');

      // then
      cy.get('[data-testid=all-users]').within(() => {
        cy.get('@numberOfUsers').then((numberOfUsers) => {
          cy.get('button:visible:contains("Delete")').should(
            'have.length',
            +numberOfUsers - 1,
          );
        });
      });
    });
  });
});
