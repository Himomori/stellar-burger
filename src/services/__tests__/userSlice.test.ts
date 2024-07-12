import userReducer, { registerUser, loginUser, checkUserAuth, updateUser, logoutUser, userActions, initialState, userSelectors } from '../userSlice';
import { RequestStatus } from '@utils-types';

describe('userSlice reducer', () => {

  const testUser = { name: 'Himomori', email: 'Himomori@bk.ru', password: 'qwerty123' };
  const updateUsers = { name: 'UpdateUser', email: 'Update@mail.ru', password: 'password' };
  const userData = { name: 'Test', email: 'Test@mail.ru', password: 'password' };

  test('обработка authCheck', () => {
    const state = userReducer(initialState, userActions.authCheck());
    expect(state.isAuthChecked).toEqual(true);
  });

  test('обработка userLogout', () => {
    const stateData = { ...initialState, data: testUser };
    const state = userReducer(stateData, userActions.userLogout());
    expect(state.data).toEqual(null);
  });

  test('обработка успешного checkUserAuth', () => {
    const state = userReducer(initialState, checkUserAuth.fulfilled(testUser, ''));
    expect(state.data).toEqual(testUser);
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  test('обработка ожидания checkUserAuth', () => {
    const state = userReducer(initialState, checkUserAuth.pending(''));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  test('обработка неудачного checkUserAuth', () => {
    const state = userReducer(initialState, checkUserAuth.rejected(new Error('ошибка авторизации'), ''));
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  test('обработка успешного registerUser', () => {
    const state = userReducer(initialState, registerUser.fulfilled(testUser, '', testUser));
    expect(state.data).toEqual(testUser);
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  test('обработка ожидания registerUser', () => {
    const state = userReducer(initialState, registerUser.pending('', testUser));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  test('обработка неудачного registerUser', () => {
    const state = userReducer(initialState, registerUser.rejected(new Error('Ошибка регистрации'), '', userData));
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  test('обработка успешного loginUser', () => {
    const state = userReducer(initialState, loginUser.fulfilled(testUser, '', testUser));
    expect(state.data).toEqual(testUser);
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  test('обработка ожидания loginUser', () => {
    const state = userReducer(initialState, loginUser.pending('', testUser));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  test('обработка неудачного loginUser', () => {
    const state = userReducer(initialState, loginUser.rejected(new Error('Ошибка входа'), '', userData));
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  test('обработка успешного logoutUser', () => {
    const state = userReducer(initialState, logoutUser.fulfilled(undefined, ''));
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  test('обработка ожидания logoutUser', () => {
    const state = userReducer(initialState, logoutUser.pending(''));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  test('обработка неудачного logoutUser', () => {
    const state = userReducer(initialState, logoutUser.rejected(new Error('Ошибка выхода'), ''));
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  test('обработка успешного updateUser', () => {
    const state = userReducer(initialState, updateUser.fulfilled(updateUsers, '', userData));
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  test('обработка ожидания updateUser', () => {
    const state = userReducer(initialState, updateUser.pending('', userData));
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  test('обработка ошибки updateUser', () => {
    const state = userReducer(initialState, updateUser.rejected(new Error('Ошибка проверки аутентификации'), '', userData));
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });

  test('тест getUser selector', () => {
    const state = { user: { ...initialState, data: testUser } };
    expect(userSelectors.getUser(state)).toEqual(testUser);
  });

  test('тест getIsAuthChecked selector', () => {
    const state = { user: { ...initialState, isAuthChecked: true } };
    expect(userSelectors.getIsAuthChecked(state)).toEqual(true);
  });
});
