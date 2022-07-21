/// <reference types="cypress" />

import locators from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
    before(() => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '/signin',
            response: {
                id: '222',
                name: 'Usuario Falso',
                token: 'Uma string que nao deveria ser aceita'
            }

        }).as('singin')
        cy.login('nicollyqwerty@gmail.com', 'Brazil123*')
        
    })

    beforeEach(() => {
        cy.get(locators.MENU.HOME).click()
        cy.resetApp()
    })

    /*it('Registrar', () => {
        cy.contains('Registrar').click()
        cy.get('.jumbotron > :nth-child(1) > .form-control').type('Nicolly Oliveira')
        cy.get('.input-group > .form-control').type('nicollyqwerty@gmail.com')
        cy.get(':nth-child(3) > .form-control').type('Brazil123*')
        cy.get('.btn').click()
        cy.get('.toast-message').should('be.visible').and('contain', "Usuário adicionado com sucesso")
    })*/

    /*it('Login and logout', () => {
        cy.get('[data-test="email"]').type('nicollyqwerty@gmail.com')
        cy.get('[data-test="passwd"]').type('Brazil123*')
        cy.get('.btn').click()
        cy.get('.toast-message').should('be.visible').and('contain', 'Bem vindo, Nicolly Oliveira!')
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/logout"]').click()
        cy.get('.toast-message').should('be.visible').and('contain', 'Até Logo!')
    })*/

    it('Should create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Primeira Conta')
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')

        //cy.get(locators.MENU.SETTINGS).click()
        //cy.get(locators.MENU.CONTAS).click()
        //cy.get(locators.CONTAS.NOME).type('Primeira Conta')
        //cy.get(locators.CONTAS.BTN_SALVAR).click()
        //cy.get(locators.MESSAGE).should('be.visible').and('contain', 'Conta inserida com sucesso!')
        //cy.get(':nth-child(2) > .far').click()
        //cy.get('.toast-message').should('be.visible').and('contain', 'Conta excluída com sucesso!')
    })

    it('Should update an account', () => {
        cy.acessarMenuConta()

        cy.xpath(locators.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(locators.CONTAS.NOME)
            .clear()
            .type('Conta Alterada')
        cy.get(locators.CONTAS.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('be.visible').and('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta();

        cy.get(locators.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(locators.CONTAS.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(locators.MENU.MOVIMENTACAO).click()

        cy.get(locators.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(locators.MOVIMENTACAO.VALOR).type('123')
        cy.get(locators.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(locators.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(locators.MOVIMENTACAO.STATUS).click()
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR_MOV).click()
        cy.get(locators.MESSAGE).should('contain', 'sucesso')

        cy.get(locators.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(locators.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.intercept('GET', 'https://barrigarest.wcaquino.me/saldo').as('statusCode')

        cy.get(locators.MENU.HOME).click()
        cy.wait('@statusCode')
        cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).and('contain', '534,00')

        cy.get(locators.MENU.EXTRATO).click()
        cy.xpath(locators.EXTRATO.FN_XP_EDITAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        //cy.wait(1000)
        cy.get(locators.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(locators.MOVIMENTACAO.STATUS).click()
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR_MOV).click()
        cy.get(locators.MESSAGE).should('contain', 'sucesso')

        cy.get(locators.MENU.HOME).click()
        cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')

    })

    it('Should remove a transaction', () => {
        cy.get(locators.MENU.EXTRATO).click()
        cy.xpath(locators.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(locators.MESSAGE).should('contain', 'sucesso')
    })

})