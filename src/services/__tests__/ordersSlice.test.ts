import { RequestStatus } from '@utils-types';
import ordersReducer, { getOrders, initialState } from '../ordersSlice';

const ordersData = {
  orders: [
    {
      id: "test",
      ingredients: [],
      status: "done",
      name: "",
      createdAt: "",
      updatedAt: "",
      number: 1,
    },
  ]
}

describe('тест feedSlice', () => {

  test('Проверка ожидания запроса на получение ленты заказов', () => {
    const action = { type: getOrders.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Проверка успешного получения ленты заказов', () => {
    const action = { type: getOrders.fulfilled.type, payload: ordersData };
    const state = ordersReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Success);
  });

  test('Проверка неудачного получения ленты заказов', () => {
    const action = { type: getOrders.rejected.type };
    const state = ordersReducer(initialState, action)
    expect(state.status).toBe(RequestStatus.Failed);
  });
});