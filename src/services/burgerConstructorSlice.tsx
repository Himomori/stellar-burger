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
  async (ingredientOrder) => {
    const response = await orderBurgerApi(ingredientOrder);
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
    },
    removeBurgerConstructor: (state, { payload }: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== payload
      );
    },
    reorderBurgerConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      const [movedIngredient] = ingredients.splice(from, 1);
      ingredients.splice(to, 0, movedIngredient);
      state.ingredients = ingredients;
    },
    resetBurgerConstructor: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.order = action.payload;
          state.requestStatus = RequestStatus.Success;
          state.bun = initialState.bun;
          state.ingredients = initialState.ingredients;
        }
      )
      .addCase(orderBurger.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const BurgerConstructorActions = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
