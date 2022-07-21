// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import locators from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        console.log(msg)
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, passwd) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.get(locators.LOGIN.USER).type(user)
    cy.get(locators.LOGIN.PASSWORD).type(passwd)
    cy.get(locators.LOGIN.BTN_LOGIN).click()
    cy.get(locators.MESSAGE).should('be.visible').and('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.MENU.RESET).click()
})

Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            redirecionar: false,
            senha: password
        }
    }).its('body.token')
        .should('not.be.empty')
        .then(token => {
            Cypress.env('token', token)
            return token
    })
})

Cypress.Commands.add('resetRest', () => {
    cy.getToken("nicollyqwerty@gmail.com", "Brazil123*").then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}`}
        }).its('status').should('be.equal', 200)
    })
    
})

Cypress.Commands.add('getContaByName', name => {
    cy.getToken("nicollyqwerty@gmail.com", "Brazil123*").then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                nome: name
            }
        })
    }).then(res => {
        return res.body[0].id
    })
    
})

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if(options.length === 1){
        if(Cypress.env('token')) {
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
            }
            
        }
    }

    return originalFn(...options)
})