import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { orderBurgerApi } from '@api';
import { TOrder, RequestStatus } from '@utils-types';

interface TConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  order: TOrder | null;
  requestStatus: RequestStatus;
}

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  order: null,
  requestStatus: RequestStatus.Idle
};

type TOrderBurgerArgs = string[];

export const orderBurger = createAsyncThunk<TOrder, TOrderBurgerArgs>(
  'burgerConstructor/orderBurger',
  async (ingredientIds) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToBurgerConstructor: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      }),
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      }
    }
  }
});

export const BurgerConstructorActions = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
