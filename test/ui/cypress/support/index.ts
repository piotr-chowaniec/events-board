import './commands/browseCommands';

before(() => {
  cy.waitForApp().task('initDb');
});

beforeEach(() => {
  cy.task('resetDbData');
});

after(() => {
  cy.task('tearDownDb');
});
