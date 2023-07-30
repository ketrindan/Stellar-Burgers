const baseUrl = 'http://localhost:3000';
const apiUrl = "https://norma.nomoreparties.space/api/ingredients";
const bunName = 'Краторная булка N-200i';
const ingredientName = 'Биокотлета из марсианской Магнолии';
const ingredientsSelector ='[data-cy=ingredients]';
const constructorSelector = '[data-cy=constructor]';
const ingredientModalTitle = 'Детали ингредиента';

describe('burger constructor is working', function () {
  beforeEach(function () {
    cy.intercept("GET", apiUrl, { fixture: "ingredients.json" });
    cy.visit(baseUrl);
  });

  it('should open main page by default', () => {
    cy.contains('Соберите бургер');
  });

  it('should drag bun', function () {
    cy.get(ingredientsSelector)
      .contains(bunName)
      .trigger('dragstart')
    cy.get(constructorSelector).trigger('drop')

    cy.get('[data-cy=constructor-bun-1]')
      .contains(bunName)
      .should('exist')
    cy.get('[data-cy=constructor-bun-2]')
      .contains(bunName)
      .should('exist')
  })

  it('should drag ingredient', function () {
    cy.get(ingredientsSelector)
      .contains(ingredientName)
      .trigger('dragstart')
    cy.get(constructorSelector).trigger('drop')
    cy.get(ingredientsSelector)
      .contains('Соус Spicy-X')
      .trigger('dragstart')
    cy.get(constructorSelector).trigger('drop')

    cy.get('[data-cy=constructor-ingredients]')
      .contains(ingredientName)
      .should('exist')
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist')
  })
});

describe("should ingredient popup work correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", apiUrl, { fixture: "ingredients.json" });
    cy.visit(baseUrl);
  })

  it('should open modal', function () {
    cy.contains(ingredientModalTitle).should('not.exist')
    cy.contains(bunName).click()
    cy.contains(ingredientModalTitle).should('exist')
    cy.get('#modal').contains(bunName).should('exist')
  })

  it('should close modal on button click', function () {
    cy.contains(ingredientModalTitle).should('not.exist')
    cy.contains(bunName).click()
    cy.contains(ingredientModalTitle).should('exist')
    cy.get('#modal').find('button').click()
    cy.contains(ingredientModalTitle).should('not.exist')
  })

  it('should close modal on overlay click', function () {
    cy.contains(bunName).click()
    cy.contains(ingredientModalTitle).should('exist')
    cy.get('[data-cy=modal-overlay]').click({ force: true })
    cy.contains(ingredientModalTitle).should('not.exist')
  })

  it('should close modal on esc', function () {
    cy.contains(bunName).click()
    cy.contains(ingredientModalTitle).should('exist')
    cy.get('body').type('{esc}')
    cy.contains(ingredientModalTitle).should('not.exist')
  })
});

describe('should create order', () => {
  beforeEach(function () {
    cy.intercept("GET", apiUrl, { fixture: "ingredients.json" });
    cy.visit(baseUrl);
  })

  it('shouldn not create order without ingredients', function() {
    cy.get('button').contains('Оформить заказ')
      .should('be.disabled')

    cy.get('#order-popup')
      .should('not.exist');
  });

  it('should add ingredients and create order', () => {
    cy.get(ingredientsSelector)
      .contains(bunName)
      .trigger('dragstart')
    cy.get(constructorSelector).trigger('drop')

    cy.get(ingredientsSelector)
      .contains(ingredientName)
      .trigger('dragstart')
    cy.get(constructorSelector).trigger('drop')

    cy.get('button').contains('Оформить заказ').should('not.be.disabled').click();

    cy.contains('Вход')

    cy.get('form').within(() => {
      cy.get('input:first').should('have.attr', 'name', 'email').type('keitilins@yandex.ru');
      cy.get('input:last').should('have.attr', 'name', 'password').type('654321');
    })
    cy.get('button').contains('Войти').click();
    
    cy.get('button').contains('Оформить заказ').should('not.be.disabled').click();

    /* eslint-disable */
    cy.wait(20000);

    cy.get('#modal').contains('идентификатор заказа').should('exist')
  });
});