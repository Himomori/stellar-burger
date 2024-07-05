import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { userActions, userSelectors } from '../../services/userSlice';
import { useEffect } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { getIsAuthChecked, getUser } = userSelectors;
  const user = useSelector(getUser);
  const { authCheck } = userActions;
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    dispatch(authCheck());
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
