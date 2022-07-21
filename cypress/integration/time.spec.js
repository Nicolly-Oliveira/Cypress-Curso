/// <reference types="cypress" />

describe('Time tests', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to the past', () => {
        //cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '14/07/2022')

        //cy.clock()
        //cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2016, 8, 1, 11, 20, 33)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '01/09/2016')
    })

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '165781')
        cy.get('#resultado > span').invoke('text').should('be.gt', '1657812524535')

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.lte', 1657812524535)
        //cy.wait(5000)
        //cy.get('#buttonTimePassed').click()
        //cy.get('#resultado > span').invoke('text').should('be.lte', 1657812524535)

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.gt', 5000)
    })
})