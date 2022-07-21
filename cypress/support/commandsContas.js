import locators from './locators'

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.MENU.CONTAS).click()   
})

Cypress.Commands.add('inserirConta', () => {
    cy.get(locators.CONTAS.NOME).type('Primeira Conta')
    cy.get(locators.CONTAS.BTN_SALVAR).click()
})