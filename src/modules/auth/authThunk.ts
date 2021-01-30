import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { RootState } from '..';
import { AuthAction, loginRequest, loginSuccess, loginError, logoutRequest } from './auth';
import { getAuthToken } from '../../api/login';
import localStorageService from '../../service/localStorageService';
import { getUserInfo } from '../../api/user';

const loginThunk = (code: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const loginInfo = await getAuthToken(code);

      // save logged in to local storage
      localStorageService.setUserTokenToLocalStorage(loginInfo.tokens);

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


const getSavedLoginThunk = (userToken: tokens): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    axios.defaults.headers.common['x-access-token'] = userToken.yasAccessToken;
    
    const userInfo = await getUserInfo();

    // if api call fails
    if('error' in userInfo){
      console.log(userInfo.error.message);
      dispatch(logoutRequest());
    } else{
      dispatch(loginSuccess(userInfo, userToken));
    }
  }
}

export {
  loginThunk,
  logoutThunk,
  getSavedLoginThunk,
};