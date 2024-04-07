
describe('Main Menu', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.login();
    });

    it('displays the main menu after login', () => {
        cy.get('.mainMenuContainer').should('be.visible');
    });

    it('displays the task list', () => {
        cy.get('#taskList').should('be.visible');
        cy.get('#taskList').contains('TASK LIST');
    });

    it('displays the shopping list', () => {
        cy.get('#shoppingList').should('be.visible');
        cy.get('#shoppingList').contains('SHOPPING LIST');
    });

});