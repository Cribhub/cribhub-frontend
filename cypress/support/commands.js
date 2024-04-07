// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js

// Cypress.Commands.add('createUser', () => {
//   const registerUrl = '/createaccount';
//   const email = 'test@example.com';
//   const username = 'testuser';
//   const password = 'password';

//   // Create an account
//   cy.visit(registerUrl);
//   cy.get('[placeholder="Email"]').type(email);
//   cy.get('[placeholder="Username"]').type(username);
//   cy.get('[placeholder="Password"]').type(password);
//   cy.get('[placeholder="Confirm Password"]').type(password);
//   cy.get('button').contains('CREATE').click();
// })

Cypress.Commands.add('login', () => {
  const loginUrl = '/';
  const email = 'test@test.com';
  const password = 'password';

  // Log in to the account
  cy.visit(loginUrl);
  cy.get('input[type=email]').type(email);
  cy.get('input[type=password]').type(password);
  cy.get('button').contains('SUBMIT').click();
});

// cypress/support/index.js

import './commands';