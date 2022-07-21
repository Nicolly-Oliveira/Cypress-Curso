/// <reference types="cypress" />

describe('Work with basic elements', () => {
    //antes de todos os teste
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //antes de cada teste
    beforeEach(() => {
        cy.reload()
    })
    
    it('Teste', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()

        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')
        //algo escrito no input é acessado atraves do value da tag
        cy.get('#formNome').should('have.value', 'Cypress Test')

        //utilizar \\: no lugar de \: nesse tipo de localização de elemento
        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')
            .should('have.value', '???')

        // é utilizado o Colchetes quando se quer fazer uma busca em alguma propriedade do elemento 
        cy.get('[data-cy="dataSobrenome"]')
            .type('Test Cypressss{backspace}{backspace}')
            .should('have.value', 'Test Cypress')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            //selectall substitui o que foi selecionado pela palavra seguinte
            .type('Erro{selectall}Acerto', {delay: 100})
            //.should('have.value', 'Hello!')
            .should('have.value', 'Acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')
        
        cy.get('#formSexoMasc')
            .should('not.be.checked')

        cy.get('[name="formSexo"]').should('have.length', 2)
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita').click({multiple: true})

        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('Combo', () => {
        cy.get('[data-test="dataEscolaridade"]')
            //posso utilizar o valor visivel ao usuário
            .select('2o grau completo')
            .should('have.value', '2graucomp')
            //posso utilizar o valor no html
            .select('1graucomp')
            .should('have.value', '1graucomp') //só aceita o value da option

        cy.get('[data-test="dataEscolaridade"] option')
            .should('have.length', 8)
        cy.get('[data-test="dataEscolaridade"] option').then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
        
        //TODO validar as opções que eu tinha disponível no combo
    })

    it.only('ComboMultiple', () => {
        cy.get('[data-testid="dataEsportes"]')
            .select(['natacao', 'Corrida']) //precisa ser o value

        //cy.get('[data-testid="dataEsportes"]').should('have.value', ['natacao', 'Corrida'])

        cy.get('[data-testid="dataEsportes"]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida'])
            expect($el.val()).to.have.length(2)
        })

        cy.get('[data-testid="dataEsportes"]')
            .invoke('val')
            .should('eql', ['natacao', 'Corrida'])

        //TODO validar as opções marcadas
    })
})