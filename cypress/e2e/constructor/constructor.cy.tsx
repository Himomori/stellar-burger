describe('Проверка оформления заказа', () => {
  beforeEach(() => {
    // перехваты запросов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'indredients.json'
    });

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    });

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('postOrder');
  });

  afterEach(function () {
    // очистка хранилищ после выполнения теста 
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Проверяем страницу конструктора бургера', () => {
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');

    // проверяю наличие ингредиентов в конструкторе до добавления
    cy.get('[data-cy=constructor-ingredient]').should('not.exist');

    // проверены кнопки добавления: булок, начинок, соусов
    cy.get('[data-cy=643d69a5c3f7b9001cfa093c]>button').contains('Добавить').click();
    cy.get('[data-cy=643d69a5c3f7b9001cfa0941]>button').contains('Добавить').click();
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]>button').contains('Добавить').click();

    // проверяю наличие ингредиентов в конструкторе после добавления
    cy.get('[data-cy=order-button-submit]').should('have.length', 1);

    // проверка работы модального окна: открытие, закрытие 
    
    // выбор игредиента
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]>a').click();

    // проверка видимости модального окна
    cy.get('[data-cy=modal]').should('be.visible');

    // проверяю что модальное содержимое ожидаемое имя ингредиента
    cy.get('[data-cy=modal]').should('contain', 'Соус Spicy-X');

    // закрываю модальное окно
    cy.get('[data-cy=modal-close]').click();

    // убеждаюсь что модальное окно закрыто
    cy.get('[data-cy=modal]').should('not.exist');


    // проверка оформления заказа
    cy.get('[data-cy=order-button-submit]').find('button').contains('Оформить заказ').click();

    cy.get('[data-cy=modal]').should('be.visible');

    cy.get('[data-cy=order-number]').should('have.text', '44907');

    cy.get('[data-cy=constructor-null]').should('have.length', 1);

    cy.get('[data-cy=modal-close]').click();

    cy.get('[data-cy=modal]').should('not.exist');
  });
});