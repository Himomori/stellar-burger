import { RequestStatus } from '@utils-types';
import feedReducer, { getFeeds, initialState } from '../feedSlice';

const feedsData = {
  feeds: [
    { id: 'test 1', ingredients: [], status: 'pending', name: 'test 1', createdAt: '', updatedAt: '', number: 1},
    { id: 'test 2', ingredients: [], status: 'done', name: 'test 2', createdAt: '', updatedAt: '', number: 2}
  ],
  total: 1,
  totalToday: 1
};

describe('тест feedSlice', () => {

  test('Проверка ожидания запроса на получение ленты заказов', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Проверка успешного получения ленты заказов', () => {
    const action = { type: getFeeds.fulfilled.type, payload: feedsData };
    const state = feedReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Success);
  });

  test('Проверка неудачного получения ленты заказов', () => {
    const action = { type: getFeeds.rejected.type };
    const state = feedReducer(initialState, action)
    expect(state.status).toBe(RequestStatus.Failed);
  });
});