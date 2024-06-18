import React, { FC, memo } from 'react';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { BurgerConstructorActions } from '../../services/burgerConstructorSlice';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(BurgerConstructorActions.addToBurgerConstructor(ingredient));
      console.log('ингредиент');
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
