describe('Events Board', function () {
  it('Navigates to Events Board and verify title', function () {
    cy.visit('/');
    cy.title().should('eq', 'Events Board');
  });
});
