import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route } from 'react-router-dom';
import { title } from 'process';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      {/* защищенные маршруты отсюда */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      {/* до сюда */}
      {/* модальные окна с доп. информацией */}
      <Route path='/feed/:number' element={<OrderInfo />} />
      <Route path='/ingredients/:id' element={<IngredientDetails />} />
      <Route path='/ingredients/:id' element={<IngredientDetails />} />
      <Route path='/profile/orders/:number' element={<OrderInfo />} />
      {/* до сюда */}
      {/* страница ошибки */}
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
