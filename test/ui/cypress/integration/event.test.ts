import { routes } from '../shared/constants';

describe('Event', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      pathname: '/api/events',
    }).as('eventsRequest');
    cy.intercept('GET', '/api/events/*').as('eventDetails');
    cy.intercept('DELETE', '/api/events/*').as('deleteEventRequest');

    cy.visit(routes.MAIN);
    cy.wait('@eventsRequest');
  });

  describe('User', () => {
    it('should not display create event button if not logged in', () => {
      // then
      cy.get('[data-testid=create-new-event-button]').should('not.exist');
    });

    it('should not have any events', () => {
      // given
      cy.navbarLoginUser();
      cy.get('[data-testid=navbar-buttons]').within(() => {
        cy.contains('Your Events').click();
      });
      cy.wait('@eventsRequest');

      // then
      cy.get('[data-testid=event-card-item]').should('not.exist');
    });

    it('should successfully create new event', () => {
      // given
      cy.navbarLoginUser();
      cy.wait('@eventsRequest');

      cy.get('[data-testid=event-list]').within(() => {
        // when
        cy.get('[data-testid=create-new-event-button]').click({
          scrollBehavior: 'center',
        });
      });
      cy.wait('@eventDetails');

      // then
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Publish').should('be.visible');
        cy.get('button').contains('Edit').should('be.visible');
        cy.get('button').contains('Delete').should('be.visible');
      });
    });

    it('should successfully delete event', () => {
      // given
      cy.navbarLoginUser();
      cy.wait('@eventsRequest');

      cy.get('[data-testid=event-list]').within(() => {
        cy.get('[data-testid=create-new-event-button]').click({
          scrollBehavior: 'center',
        });
      });
      cy.wait('@eventDetails');

      // when
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Delete').click();
      });
      cy.get('[data-testid=modal-button-confirm]').should('be.visible').click();
      cy.wait('@deleteEventRequest');

      // then
      cy.location('pathname').should('eq', routes.MAIN);
    });

    it('should mark newly created event as draft', () => {
      // given
      cy.navbarLoginUser();
      cy.wait('@eventsRequest');

      // when
      cy.get('[data-testid=event-list]').within(() => {
        cy.get('[data-testid=create-new-event-button]').click({
          scrollBehavior: 'center',
        });
      });
      cy.wait('@eventDetails');

      // then
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Publish').should('be.visible');
      });
      cy.get('[data-testid=navbar-buttons]').within(() => {
        cy.contains('Your Events').click();
      });
      cy.wait('@eventsRequest');
      cy.get('[data-testid=event-card-item]')
        .should('have.length', 1)
        .and('contain', 'DRAFT');
    });

    it('should successfully mark event as published', () => {
      // given
      cy.navbarLoginUser();
      cy.wait('@eventsRequest');

      // when
      cy.get('[data-testid=event-list]').within(() => {
        cy.get('[data-testid=create-new-event-button]').click({
          scrollBehavior: 'center',
        });
      });
      cy.wait('@eventDetails');
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Publish').should('be.visible').click();
      });

      // then
      cy.get('[data-testid=navbar-buttons]').within(() => {
        cy.contains('Your Events').click();
      });
      cy.wait('@eventsRequest');
      cy.get('[data-testid=event-card-item]')
        .should('have.length', 1)
        .and('not.contain', 'DRAFT');
    });

    it('should successfully update event data', () => {
      // given
      const eventDetails = {
        title: 'Event title',
        shortDescription: 'This is event short description',
        description: 'This is event description',
        eventDate: '2023-10-17T12:30',
      };

      cy.navbarLoginUser();
      cy.wait('@eventsRequest');

      cy.get('[data-testid=event-list]').within(() => {
        cy.get('[data-testid=create-new-event-button]').click({
          scrollBehavior: 'center',
        });
      });
      cy.wait('@eventDetails');
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Edit').should('be.visible').click();
      });

      cy.get('[data-testid=event-details-form]').within(() => {
        // when
        cy.get('#title').clear().type(eventDetails.title);
        cy.get('#shortDescription').clear().type(eventDetails.shortDescription);
        cy.get('.ql-editor').clear().type(eventDetails.description);
        cy.get('#eventDate').clear().type(eventDetails.eventDate);
        cy.get('button').contains('Save').click();
      });

      cy.wait('@eventDetails');

      // then
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('h2').should('contain', eventDetails.title);
        cy.get('h4').should('contain', eventDetails.shortDescription);
        cy.get('[data-testid=event-details-description]').should(
          'contain',
          eventDetails.description,
        );
      });
    });
  });

  describe('Admin', () => {
    it('should successfully update someones event data', () => {
      // given
      const eventToEdit = 7;
      const eventDetails = {
        title: 'Admin updated Event title',
      };

      cy.navbarLoginAdmin();
      cy.wait('@eventsRequest');

      cy.get('[data-testid=event-card-item]').eq(eventToEdit).click();
      cy.wait('@eventDetails');

      // when
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Edit').should('be.visible').click();
      });
      cy.get('[data-testid=event-details-form]').within(() => {
        cy.get('#title').clear().type(eventDetails.title);
        cy.get('button').contains('Save').click();
      });

      cy.wait('@eventDetails');

      // then
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('h2').should('contain', eventDetails.title);
      });
    });

    it('should successfully delete someones event', () => {
      // given
      const eventToDelete = 3;
      cy.navbarLoginAdmin();
      cy.wait('@eventsRequest');

      cy.get('[data-testid=event-card-item]').eq(eventToDelete).click();
      cy.wait('@eventDetails');

      // when
      cy.get('[data-testid=event-details]').within(() => {
        cy.get('button').contains('Delete').click();
      });
      cy.get('[data-testid=modal-button-confirm]').should('be.visible').click();
      cy.wait('@deleteEventRequest');

      // then
      cy.location('pathname').should('eq', routes.MAIN);
    });
  });
});
