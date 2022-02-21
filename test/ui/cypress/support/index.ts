import './commands/browseCommands';
import './commands/loginUser';

before(() => {
  cy.waitForApp().task('initDb');
});

beforeEach(() => {
  cy.clearLocalStorage();
  cy.task('resetDbData');
});

after(() => {
  cy.task('tearDownDb');
});
