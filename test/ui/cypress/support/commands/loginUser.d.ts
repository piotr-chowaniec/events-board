declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Logging user with fallback login page
     * @example
     *  cy.loginUser()
     */
    loginUser(): Chainable<Subject>;

    /**
     * Logging admin with fallback login page
     * @example
     *  cy.loginAdmin()
     */
    loginAdmin(): Chainable<Subject>;

    /**
     * Logging user with navbar form
     * @example
     *  cy.navbarLoginUser()
     */
    navbarLoginUser(): Chainable<Subject>;

    /**
     * Logging admin with navbar form
     * @example
     *  cy.navbarLoginAdmin()
     */
    navbarLoginAdmin(): Chainable<Subject>;

    /**
     * Logout
     * @example
     *  cy.navbarLoginAdmin()
     */
    navbarLogout(): Chainable<Subject>;
  }
}
