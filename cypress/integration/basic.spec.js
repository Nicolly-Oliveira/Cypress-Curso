/// <reference types="cypress" />

describe('Cypress basic', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    
        //const title = cy.title();
        //console.log(title);

        //pausa o teste e permite executar o teste passo a passo
        cy.pause()

        cy.title()
            .debug() //pega mais informações no console do navegador
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        let syncTitle

        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy="dataSobrenome"]').then($el => {
            $el.val = syncTitle
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })

        //Ver diferença entre then e should
        cy.title().should(title => {
            console.log(title)

            //cy.get('#formNome').type(title)
        })


        //TODO Imprimir o title no console
        //TODO Imprimir o title em um campo de texto
    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})

//http://demo.automationtesting.in/