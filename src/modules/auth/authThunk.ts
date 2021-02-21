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


const getSavedLoginThunk = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    const savedUserToken = localStorageService.getUserTokenFromLocalStorage();

    if(savedUserToken==null){
      dispatch(logoutRequest());
      return;
    }
  
    axios.defaults.headers.common['x-access-token'] = savedUserToken.yasAccessToken;
    
    const userInfo = await getUserInfo();

    // if api call fails
    if('error' in userInfo){
      alert("Logouted. Please re-login");
      axios.defaults.headers.common['x-access-token'] = null;
      localStorageService.deleteUserTokenInLocalStorage();
      dispatch(logoutRequest());
    } else{
      dispatch(loginSuccess(userInfo, savedUserToken));
    }
  }
}

export {
  loginThunk,
  logoutThunk,
  getSavedLoginThunk,
};