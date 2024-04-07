// // cypress/integration/main_menu_spec.js

// describe('Main Menu', () => {
//     beforeEach(() => {
//         cy.visit('/');
//         cy.login();
//     });

//     it('adds and removes an item from the shopping list', () => {
//         cy.get('#shoppingList').find('button').contains('Add to list').click();

//         cy.get('input[placeholder="Shopping Item"]').type('Milk');
//         cy.get('input[placeholder="Shopping Item Description"]').type('2 Liters');

//         cy.get('button').contains('Add to shopping list').click();
//         cy.contains('Milk (2 Liters)').should('exist');

//         cy.contains('Milk (2 Liters)').parent('p').find('button').click();
//         cy.contains('Milk (2 Liters)').should('not.exist');
//     });

//     it('adds and removes a task from the task list', () => {
//         cy.get('#taskList').find('button').contains('Add to list').click();

//         cy.get('input[placeholder="Task Name"]').type('Laundry');
//         cy.get('input[placeholder="task description"]').type('Wash clothes');

//         cy.get('select').select('m');

//         cy.get('button').contains('Add to task list').click();

//         cy.get('#taskList').contains('Laundry - m');

//         cy.get('#taskList').contains('Laundry - m').parent('p').find('button').click();

//         cy.get('#taskList').should('not.contain', 'Laundry - m');
//     });


// });