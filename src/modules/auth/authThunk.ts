import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { RootState } from '..';
import { AuthAction, loginRequest, loginSuccess, loginError, logoutRequest } from './auth';
import { getAuthToken } from '../../api/login';
import localStorageService from '../../service/localStorageService';

const loginThunk = (code: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const loginInfo = await getAuthToken(code);

      // save logged in to local storage
      localStorageService.setUserLoginInfoToLocalStorage({
        userInfo: loginInfo.userInfo,
        tokens: loginInfo.tokens
      });

      axios.defaults.headers.common['x-access-token'] = loginInfo.tokens.yasAccessToken;
      dispatch(loginSuccess(loginInfo.userInfo, loginInfo.tokens));
    } catch (e) {
      dispatch(loginError(e));
    }
  }
}

const logoutThunk = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async(dispatch) => {
    axios.defaults.headers.common['x-access-token'] = null;
    dispatch(logoutRequest());
  }
}


const getSavedLoginThunk = (loginInfo: userLoginInfo): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    axios.defaults.headers.common['x-access-token'] = loginInfo.tokens.yasAccessToken;
    dispatch(loginSuccess(loginInfo.userInfo, loginInfo.tokens));
  }
}

export {
  loginThunk,
  logoutThunk,
  getSavedLoginThunk,
};