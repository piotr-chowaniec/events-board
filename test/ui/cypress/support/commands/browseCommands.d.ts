declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Waits for client app to start
     * @example
     *  cy.waitForApp()
     */
    waitForApp(): Chainable<Subject>;
  }
}
