import { routes } from '../shared/constants';

describe('Participate', () => {
  describe('User', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        pathname: '/api/events',
        query: {
          status: 'PUBLISHED',
        },
      }).as('eventsRequest');
      cy.intercept('GET', '/api/events/*').as('eventDetails');
      cy.intercept('POST', '/api/participants').as('addParticipationRequest');

      cy.visit(routes.MAIN);
      cy.wait('@eventsRequest');
    });

    it('should require logged in user in order to sign in participation', () => {
      // given
      cy.get('[data-testid=event-card-item]').eq(0).click();
      cy.wait('@eventDetails');
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Going').click();
      });

      // then
      cy.location('pathname').should('eq', routes.LOGIN);
    });

    it('should successfully add user participation', () => {
      // given
      cy.navbarLoginUser();
      cy.get('[data-testid=event-card-item]').eq(0).click();
      cy.wait('@eventDetails');

      // when
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('h2').invoke('text').as('eventTitle');
        cy.get('button').contains('Going').click();
      });
      cy.wait('@addParticipationRequest');

      // then
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('not Going');
      });
      cy.get('[data-testid=navbar-buttons]').within(() => {
        cy.contains('You Participate').click();
      });
      cy.wait('@eventsRequest');

      cy.get('@eventTitle').then((eventTitle) => {
        cy.get('[data-testid=event-card-item]')
          .should('have.length', 1)
          .and('contain', eventTitle)
          .and('be.visible');
      });
    });

    it('should successfully remove user participation', () => {
      // given
      cy.navbarLoginUser();
      cy.get('[data-testid=event-card-item]').eq(0).click();
      cy.wait('@eventDetails');
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Going').click();
      });
      cy.wait('@addParticipationRequest');

      // when
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('not Going').click();
      });

      // then
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Going');
      });
      cy.get('[data-testid=navbar-buttons]').within(() => {
        cy.contains('You Participate').click();
      });
      cy.wait('@eventsRequest');

      cy.get('[data-testid=event-card-item]').should('not.exist');
    });
  });

  describe('Admin', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        pathname: '/api/participants',
      }).as('getParticipantsRequest');

      cy.visit(routes.MAIN);
      cy.navbarLoginAdmin();

      cy.get('[data-testid=navbar-admin-dropdown-button]').click();
      cy.get('[data-testid=navbar-admin-dropdown]').within(() => {
        cy.contains('Participants').click();
      });
      cy.wait('@getParticipantsRequest');
    });

    it('should display list of participants', () => {
      // then
      cy.contains('All Participants').should('be.visible');
      cy.get('[data-testid=all-participants]').within(() => {
        cy.get('a').should('be.visible');
        cy.get('button:visible:contains("Delete")').should('be.visible');
      });
    });

    it('should successfully remove user participation', () => {
      // given
      const participantToDelete = 20;

      // when
      cy.get('[data-testid=all-participants]').within(() => {
        cy.get('button').its('length').as('numberOfParticipants');
        cy.get('button:visible:contains("Delete")')
          .eq(participantToDelete)
          .click({
            scrollBehavior: 'center',
          });
      });
      cy.get('[data-testid=modal-button-confirm]').should('be.visible').click();

      cy.wait('@getParticipantsRequest');

      // then
      cy.get('[data-testid=all-participants]').within(() => {
        cy.get('@numberOfParticipants').then((numberOfParticipants) => {
          cy.get('button').should('have.length', +numberOfParticipants - 1);
        });
      });
    });
  });
});
