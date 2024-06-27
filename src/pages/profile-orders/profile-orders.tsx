import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrders } from '../../services/ordersSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  // взяла переменную из стора
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
