import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.user.data?.name);
  return <AppHeaderUI userName={userName} />;
};
