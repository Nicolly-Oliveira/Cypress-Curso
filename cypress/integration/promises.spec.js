//const { Promise, reject } = require("cypress/types/bluebird");

it('sem teste ainda', () => {})

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(11);
        }, 1000)
    })
    
}

const system = () => {
    console.log('init');
    getSomething().then(some => {
        console.log('Something is ' + some)
        console.log('end')
    })
    
}

system();