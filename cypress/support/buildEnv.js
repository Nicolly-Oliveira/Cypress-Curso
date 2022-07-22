const buildEnv = () => {
    cy.intercept({method: 'GET', url: '/signin'}, (req) => {
        req.reply({
            id: '222',
            name: 'Usuario Falso',
            token: 'Uma string que nao deveria ser aceita'
        })
    }).as('singin')

    cy.intercept({method: 'GET', url: '/saldo'}, (req) => {
        req.reply([{
            contaId: 220,
            conta: "Carteira",
            saldo: "80.00"
        },
        {
            contaId: 100,
            conta: "Banco",
            saldo: "100000.00"
        }])
    }).as('saldo')

    cy.intercept({method: 'GET',url: '/contas'}, (req) => {
        [
            {id: 1, nome: "Carteira", visivel: true, usuario_id: 222},
            {id: 2, nome: "Banco", visivel: true, usuario_id: 222}
        ]
    }).as('contas')
    
}

export default buildEnv