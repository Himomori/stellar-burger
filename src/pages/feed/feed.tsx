import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/feedSlice';
import { checkUserAuth, userActions } from '../../services/userSlice';

export const Feed: FC = () => {
  // взяла переменную из стора
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.feed.orders);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
