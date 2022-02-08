/// <reference path="./browseCommands.d.ts" />

Cypress.Commands.add('waitForApp', () => {
  let isAppReady;
  if (!isAppReady) {
    cy.log('Waiting for UI client to be loaded')
      .request({ url: '/', timeout: 300000 })
      .should((response) => {
        expect(response.isOkStatusCode).to.be.true;
      });

    isAppReady = true;
  }
});
