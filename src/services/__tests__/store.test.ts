import { configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from '../burgerConstructorSlice';
import { feedSlice } from '../feedSlice';
import { ingredientsSlice } from '../ingredientsSlice';
import { orderSlice } from '../orderSlice';
import { ordersSlice } from '../ordersSlice';
import { userSlice } from '../userSlice';
import { rootReducer } from '../store';

const initialRootState = {
    [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
    [feedSlice.name]: feedSlice.getInitialState(),
    [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
    [orderSlice.name]: orderSlice.getInitialState(),
    [ordersSlice.name]: ordersSlice.getInitialState(),
    [userSlice.name]: userSlice.getInitialState(),
};

describe('test rootReducer', () => {
    test('объединение состояний', () => {
        const store = configureStore({ reducer: rootReducer })
        const state = store.getState()
        expect(state).toEqual(initialRootState);
    });
    test('возвращает корректное начальное состояние при неизвестном действии', () => {
        const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
        expect(state).toEqual(initialRootState);
    });
});