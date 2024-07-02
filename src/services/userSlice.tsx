import {
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type TUserState = {
  data: TUser | null;
  isAuthChecked: boolean;
  requestStatus: RequestStatus;
};

export const initialState: TUserState = {
  data: null,
  isAuthChecked: false,
  requestStatus: RequestStatus.Idle
};

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/registerUser',
  async (data) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const loginUser = createAsyncThunk<TUser, TRegisterData>(
  'user/loginUser',
  async (user) => {
    const response = await loginUserApi(user);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const updateUser = createAsyncThunk<TUser, TRegisterData>(
  'user/updateUser',
  async (user) => {
    const response = await updateUserApi(user);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userActions.userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

export const tryLoginByCookies = createAsyncThunk(
  'user/tryLoginByCookies',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(checkUserAuth());
    }
  }
);

export const checkUserAuth = createAsyncThunk<TUser>(
  'user/checkUserAuth',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.requestStatus = RequestStatus.Success;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.requestStatus = RequestStatus.Success;
    });
    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.requestStatus = RequestStatus.Success;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.data = null;
      state.requestStatus = RequestStatus.Success;
    });
  },
  selectors: {
    getUser: (state: TUserState) => state.data,
    getIsAuthChecked: (state: TUserState) => state.isAuthChecked
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
