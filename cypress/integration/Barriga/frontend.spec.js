/// <reference types="cypress" />

import locators from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at a interface', () => {

    beforeEach(() => {
        buildEnv()
        cy.login('nicollyqwerty@gmail.com', 'Brazil123*')
        cy.get(locators.MENU.HOME).click()
    })

    after(() => {
        cy.clearLocalStorage()
    })

    it('Should create an account', () => {

        cy.intercept({ method: 'POST', url: '/contas'}, (req) => {
            req.reply(
                {id: 3, nome: "Conta de teste", visivel: true, usuario_id: 222}
            )
        }).as('saveConta')

        cy.acessarMenuConta()

        cy.intercept({method: 'GET', url: '/contas'}, (req) => {
            req.reply([
                {id: 1, nome: "Carteira", visivel: true, usuario_id: 222},
                {id: 2, nome: "Banco", visivel: true, usuario_id: 222},
                {id: 3, nome: "Conta de teste", visivel: true, usuario_id: 222}
            ])
        }).as('contasave')
       
        cy.inserirConta('Primeira Conta')
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')

    })

    it('Should update an account', () => {

        cy.intercept({method: 'PUT', url: '/contas/**'}, (req) => {
            req.reply(
                {id: 1, nome: "Conta Alterada", visivel: true, usuario_id: 222}
            )
        }).as('alterarConta')

        cy.acessarMenuConta()

        cy.xpath(locators.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(locators.CONTAS.NOME)
            .clear()
            .type('Conta Alterada')
        cy.get(locators.CONTAS.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('be.visible').and('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.intercept({method: 'POST', url: '/contas'}, (req) => {
            req.reply({
                erro: "Já existe uma conta com esse nome!",
                statusCode: 400
            })
        }).as('saveContaMesmoNome')

        cy.acessarMenuConta();

        cy.get(locators.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(locators.CONTAS.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'code 400')
    })

    it('Should test colors', () => {
        cy.intercept({method: 'GET', url: '/extrato/**'}, (req) => {
            req.reply(
                [
                    {"conta":"Conta para movimentacoes","id":1203292,"descricao":"Receita Paga","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2022-07-22T03:00:00.000Z","data_pagamento":"2022-07-22T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":1290634,"usuario_id":31300,"transferencia_id":null,"parcelamento_id":null},
                    {"conta":"Conta com movimentacao","id":1203293,"descricao":"Receita Pendente","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2022-07-22T03:00:00.000Z","data_pagamento":"2022-07-22T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":1290635,"usuario_id":31300,"transferencia_id":null,"parcelamento_id":null},
                    {"conta":"Conta para saldo","id":1203294,"descricao":"Despesa Paga","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2022-07-22T03:00:00.000Z","data_pagamento":"2022-07-22T03:00:00.000Z","valor":"3500.00","status":true,"conta_id":1290636,"usuario_id":31300,"transferencia_id":null,"parcelamento_id":null},
                    {"conta":"Conta para saldo","id":1203295,"descricao":"Despesa Pendente","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2022-07-22T03:00:00.000Z","data_pagamento":"2022-07-22T03:00:00.000Z","valor":"-1000.00","status":false,"conta_id":1290636,"usuario_id":31300,"transferencia_id":null,"parcelamento_id":null}
                ]
            )
        })

        cy.get(locators.MENU.EXTRATO).click()
        cy.xpath(locators.EXTRATO.FN_XP_LINHA('Receita Paga')).should('have.class', 'receitaPaga')
        cy.xpath(locators.EXTRATO.FN_XP_LINHA('Receita Pendente')).should('have.class', 'receitaPendente')
        cy.xpath(locators.EXTRATO.FN_XP_LINHA('Despesa Paga')).should('have.class', 'despesaPaga')
        cy.xpath(locators.EXTRATO.FN_XP_LINHA('Despesa Pendente')).should('have.class', 'despesaPendente')
    })
    
    it('Should test the responsiveness', () => {
        cy.get(locators.MENU.HOME).should('exist').and('be.visible')
        cy.viewport(500, 700)
        cy.get(locators.MENU.HOME).should('exist').and('not.be.visible')
    })

    

})