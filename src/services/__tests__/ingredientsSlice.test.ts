import { RequestStatus } from '@utils-types';
import ingredientsReducer, { getIngredients, initialState } from '../ingredientsSlice';

const ingredientsData = {
    ingredients: [
        {
            id: "test1", name: "test bun", type: "bun", proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: "",
            image_mobile: "", image_large: ""
        },
        {
            id: "test2", name: "test main", type: "main", proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: "",
            image_mobile: "", image_large: ""
        }
    ],
}

describe('тест ingredientsSlice', () => {

    test('Проверка ожидания запроса на получение ингредиентов', () => {
        const action = { type: getIngredients.pending.type };
        const state = ingredientsReducer(initialState, action);
        expect(state.status).toBe(RequestStatus.Loading);
    });

    test('Проверка успешного получения ингредиентов', () => {
        const action = { type: getIngredients.fulfilled.type, payload: ingredientsData };
        const state = ingredientsReducer(initialState, action);
        expect(state.status).toBe(RequestStatus.Success);

    });

    test('Проверка неудачного получения ингредиентов', () => {
        const action = { type: getIngredients.rejected.type };
        const state = ingredientsReducer(initialState, action)
        expect(state.status).toBe(RequestStatus.Failed);
    });

})