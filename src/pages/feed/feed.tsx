import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/feedSlice';

export const Feed: FC = () => {
  // взяла переменную из стора
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.feed.orders);

  const refreshFeeds = () => {
    dispatch(getFeeds());
  };

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={refreshFeeds} />;
};
