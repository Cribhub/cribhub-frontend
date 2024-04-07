// cypress/integration/login_spec.js

describe('Login Page', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully logs in with correct credentials', () => {
    cy.login();
  });

  /*
  it('shows an error message with incorrect credentials', () => {
    // Replace with the actual input selectors and incorrect credentials
    cy.get('input[type=email]').type('wrong@example.com');
    cy.get('input[type=password]').type('wrongpassword');

    // Replace with the actual button selector
    cy.get('button').contains('SUBMIT').click();

    // Replace with the actual error message or error message selector
    cy.get('.error-message').should('be.visible').and('contain', 'Invalid email or password');
  });
*/
});