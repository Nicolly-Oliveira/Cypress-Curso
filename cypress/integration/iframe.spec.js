/// <reference types="cypress" />

/*describe('Work with iframe', () => {

    it('Deve preencher campo de texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')

        //essa forma possui limitações
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Alert simples')
        })
        cy.wrap(body).find('#otherButton').click()

        })
    })

    it('Deve testar frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })

})*/