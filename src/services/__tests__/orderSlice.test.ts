import { RequestStatus } from "@utils-types";
import orderReducer, { getOrder, initialState } from "../orderSlice";

const orderData = {
    order: {
        id: 'test 1',
        ingredients: [],
        status: 'done',
        name: 'test order',
        createdAt: '',
        updatedAt: '',
        number: 1
    },
    name: 'test order',
    status: RequestStatus,
    error: undefined
};

describe('тест слайса orderSlice', () => {

    describe('Проверка экшенов получения информации о заказе', () => {

        test('Проверка ожидания получения информации о заказе', () => {
            const action = { type: getOrder.pending.type };
            const state = orderReducer(initialState, action);
            expect(state.status).toBe(RequestStatus.Loading);
        })

        test('Проверка успешного оформления заказа', () => {
            const action = { type: getOrder.fulfilled.type, payload: orderData };
            const state = orderReducer(initialState, action);
            expect(state.status).toBe(RequestStatus.Success);
        });

        test('Проверка неудачного оформления заказа', () => {
            const action = { type: getOrder.rejected.type };
            const state = orderReducer(initialState, action);
            expect(state.status).toBe(RequestStatus.Failed);
        });

    })
})