describe('burger constructor is working', function () {
  beforeEach(function () {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", { fixture: "ingredients.json" });
    cy.visit('http://localhost:3000');
  });

  it('should open main page by default', () => {
    cy.contains('Соберите бургер');
  });

  it('should drag bun', function () {
    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')

    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('exist')
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist')
  })

  it('should drag ingredient', function () {
    cy.get('[data-cy=ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')
    cy.get('[data-cy=ingredients]')
      .contains('Соус Spicy-X')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')

    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist')
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist')
  })
});

describe("should ingredient popup work correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", { fixture: "ingredients.json" });
    cy.visit('http://localhost:3000');
  })

  it('should open modal', function () {
    cy.contains('Детали ингредиента').should('not.exist')
    cy.contains('Краторная булка N-200i').click()
    cy.contains('Детали ингредиента').should('exist')
    cy.get('#modal').contains('Краторная булка N-200i').should('exist')
  })

  it('should close modal on button click', function () {
    cy.contains('Детали ингредиента').should('not.exist')
    cy.contains('Краторная булка N-200i').click()
    cy.contains('Детали ингредиента').should('exist')
    cy.get('#modal').find('button').click()
    cy.contains('Детали ингредиента').should('not.exist')
  })

  it('should close modal on overlay click', function () {
    cy.contains('Краторная булка N-200i').click()
    cy.contains('Детали ингредиента').should('exist')
    cy.get('[data-cy=modal-overlay]').click({ force: true })
    cy.contains('Детали ингредиента').should('not.exist')
  })

  it('should close modal on esc', function () {
    cy.contains('Краторная булка N-200i').click()
    cy.contains('Детали ингредиента').should('exist')
    cy.get('body').type('{esc}')
    cy.contains('Детали ингредиента').should('not.exist')
  })
});

describe('should create order', () => {
  beforeEach(function () {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", { fixture: "ingredients.json" });
    cy.visit('http://localhost:3000');
  })

  it('shouldn not create order without ingredients', function() {
    cy.get('button').contains('Оформить заказ')
      .should('be.disabled')

    cy.get('#order-popup')
      .should('not.exist');
  });

  it('should add ingredients and click order button', () => {
    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')

    cy.get('[data-cy=ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .trigger('dragstart')
    cy.get('[data-cy=constructor]').trigger('drop')

    cy.get('button').contains('Оформить заказ').should('not.be.disabled').click();
  });
});


