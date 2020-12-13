import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthAction, loginRequest, loginSuccess, loginError } from './auth';
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

      dispatch(loginSuccess(loginInfo.userInfo, loginInfo.tokens));
    } catch (e) {
      dispatch(loginError(e));
    }
  }
}


const getSavedLoginThunk = (loginInfo: userLoginInfo): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    console.log("111");
    dispatch(loginSuccess(loginInfo.userInfo, loginInfo.tokens));
  }
}

export {
  loginThunk,
  getSavedLoginThunk
};