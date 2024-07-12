import burgerConstructorReducer, { initialState, orderBurger, TConstructorState } from '../burgerConstructorSlice';
import { RequestStatus } from '@utils-types';

const initialTestState: TConstructorState = {
  bun: null,
  ingredients: [
    { id: '1', _id: '1', name: 'Ingredient 1', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: '', image_mobile: '', image_large: '' },
    { id: '2', _id: '2', name: 'Ingredient 2', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: '', image_mobile: '', image_large: '' },
    { id: '3', _id: '3', name: 'Ingredient 3', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: '', image_mobile: '', image_large: '' }
  ],
  order: null,
  requestStatus: RequestStatus.Idle
};

describe('тест burgerConstructorSlice', () => {

  test('добавление ингредиента', () => {
    const bun = { id: '4', _id: '4', name: 'Bun', type: 'bun', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: '', image_mobile: '', image_large: '' };
    const actionBun = { type: 'burgerConstructor/addToBurgerConstructor', payload: bun };
    const stateBun = burgerConstructorReducer(initialState, actionBun);
    expect(stateBun.bun).toEqual(bun);

    const ingredient = { id: '5', _id: '5', name: 'Ingredient 4', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: '', image_mobile: '', image_large: '' };
    const actionIngredient = { type: 'burgerConstructor/addToBurgerConstructor', payload: ingredient };
    const stateIngredient = burgerConstructorReducer(initialState, actionIngredient);
    expect(stateIngredient.ingredients.length).toBe(1);
    expect(stateIngredient.ingredients[0]).toEqual(ingredient);
  });

  test('изменение порядка ингредиентов', () => {
    const action = { type: 'burgerConstructor/reorderBurgerConstructor', payload: { from: 0, to: 2 } };
    const state = burgerConstructorReducer(initialTestState, action);

    expect(state.ingredients[0].name).toBe('Ingredient 2');
    expect(state.ingredients[1].name).toBe('Ingredient 3');
    expect(state.ingredients[2].name).toBe('Ingredient 1');
  });

  test('удалить ингредиент', () => {
    const action = { type: 'burgerConstructor/removeBurgerConstructor', payload: 1 };
    const state = burgerConstructorReducer(initialTestState, action);
    expect(state.ingredients.length).toBe(2);
    expect(state.ingredients.find(ingredient => ingredient.id === '2')).toBeUndefined();
  });

  test('проверка успешного orderBurger', () => {
    const action = { type: orderBurger.fulfilled.type };
    const state = burgerConstructorReducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  test('проверка ожидания orderBurger', () => {
    const action = { type: orderBurger.pending.type };
    const state = burgerConstructorReducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  test('проверка неудачного orderBurger', () => {
    const action = { type: orderBurger.rejected.type };
    const state = burgerConstructorReducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  test('проверка resetBurgerConstructor', () => {
    const action = { type: 'burgerConstructor/resetBurgerConstructor' };
    const state = burgerConstructorReducer(initialTestState, action);
    expect(state).toEqual(initialState);
  });

});