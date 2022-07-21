/// <reference types="cypress" />

describe ('Esperas...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //antes de cada teste
    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    //não deve fazer assertivas no mesmo get, pois ele retorna o mesmo elemento, principalmente se forem assertivas opostas 
    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('exist')
            .should('not.exist')
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        //cy.get('#lista li')
        //    .find('span')
        //    .should('contain', 'Item 2')
        cy.get('#lista li span').should('contain', 'Item 2')

    })

    it('Uso do find List DOM', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        //cy.get('#lista li')
        //    .find('span')
        //    .should('contain', 'Item 2')
        cy.get('#lista li span').should('contain', 'Item 2')

    })

    it('Uso de timeout', () => {
        //cy.get('#buttonDelay').click()
        //cy.get('#novoCampo', {timeout: 1000}).should('exist')

        //cy.get('#buttonListDOM').click()
        //só usar em casos especificos, porque isso pode variar de acordo com o tempo de carregamento de cada site ou a internet utilizada. Mais indicada utilizar o timeout(pois não é uma espera fixa, mas sim um tempo limite para quebrar a execução) em um comando especifico, do que parar o teste com wait 
        //cy.wait(5000)
        //cy.get('#lista li span', {timeout: 30000}).should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span', {timeout: 30000})
            .should('have.length', 1)
            .should('have.length', 2)

        //assim garante a execução dos comandos separadamente
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
 
    })

    //cuidado com os retrys, porque ele tenta executar novamente o ultimo comando (REVER)
    it('Click retry', () => {
         cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', 1)   
    })

    it.only('Should vc Then', () => {
        //then espera a execução e o should fica executando a todo momento até achar 
        //cy.get('#buttonListDOM').click()
        //cy.get('#lista li span').then($el => {
            //.should('have.length', 1)
            //console.log($el)
            //expect($el).to.have.length(1)

        cy.get('#buttonListDOM').then($el => {
            expect($el).to.have.length(1)  
        }).and('have.id', 'buttonListDOM')
   })
})