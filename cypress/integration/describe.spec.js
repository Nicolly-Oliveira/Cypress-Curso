/// <reference types="cypress" />

//skip - Não executa o test ou grupo de test (funciona em mais de um lugar no código)
//only - Executa apenas o teste que tive ele, porém só pode ser usado uma vez no código, pois ele só executa o ultimo only no script.


it('A external test...', () => {

})

describe('Should group tests...', () => {
    describe ('Should group more specific tests...', () => {
        it.skip('A specific test...', () => {

        })
    })

    describe ('Should group more specific tests 2...', () => {
        it('A specific test 2...', () => {

        })
    })
    
    it('A external test...', () => {

    })
})