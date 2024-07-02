import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice';
import { burgerConstructorSlice } from './burgerConstructorSlice';
import { userSlice } from './userSlice';
import { feedSlice } from './feedSlice';
import { orderSlice } from './orderSlice';
import { ordersSlice } from './ordersSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
