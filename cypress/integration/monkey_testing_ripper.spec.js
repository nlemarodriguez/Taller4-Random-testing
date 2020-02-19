describe('Los estudiantes under monkeys', function () {
    it('visits los estudiantes and survives monkeys', function () {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomClick(0);
    })

    it.only('Usando funcion RandomEvent', function () {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(50);
    })
})



function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if (monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if (!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({ force: true });
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }
}

function randomEvent(monkeys) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function getRandomTypeObject() {
        var arr = ["a", "input", "select", "button"]
        return arr[Math.floor(Math.random() * arr.length)];
    };

    function randomWord() {
        var letras = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
        var letras = letras.split('');
        var palabra = '';
        for (let i = 0; i < 10; i++) {
            palabra += letras[Math.floor(Math.random() * letras.length)];
        }
        return palabra;
    };

    var monkeys = monkeys;
    if (monkeys > 0) {

        var obj = getRandomTypeObject();
        cy.log('ahora salio: ' + obj)

        cy.get("body").then($body => {
            if ($body.find(obj).length > 0) {   //Evalua si existe ese tipo de objeto en el body
                cy.get(obj).then($objects => {
                    var randomObject = $objects.get(getRandomInt(0, $objects.length));
                    cy.log(randomObject)
                    if (!Cypress.dom.isHidden(randomObject)) {
                        switch (String(obj)) {
                            case 'a':
                                cy.wrap(randomObject).click({ force: true });
                                break;
                            case 'input':
                                cy.wrap(randomObject).click({ force: true }).type(randomWord(), { force: true });;
                                break;
                            case 'select':
                                cy.wrap(randomObject).children('option').eq(getRandomInt(0, randomObject.options.length)).then(e => { cy.wrap(randomObject).select(e.val(), { force: true }); });
                                break;
                            case 'button':
                                cy.wrap(randomObject).click({ force: true });
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        });

        monkeys = monkeys - 1;
        cy.wait(1000);
        randomEvent(monkeys);


    }

}

