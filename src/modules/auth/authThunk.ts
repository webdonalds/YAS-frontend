import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { RootState } from '..';
import { AuthAction, loginRequest, loginSuccess, loginError, logoutRequest } from './auth';
import { getAuthToken, refreshAuthToken } from '../../api/login';
import localStorageService from '../../service/localStorageService';
import { getUserInfo } from '../../api/user';

const JWT_EXPIRY_TIME = 3600*1000;
const JWT_REFRESH_FREQUENCY = JWT_EXPIRY_TIME / 2;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refresh = async (dispatch: any) => {
  const savedUserToken = localStorageService.getUserTokenFromLocalStorage();
  if(savedUserToken == null) {
    return;
  }

  try {
    const accessToken = await refreshAuthToken(savedUserToken.yasRefreshToken);
    savedUserToken.yasAccessToken = accessToken;
    localStorageService.setUserTokenToLocalStorage(savedUserToken);

    axios.defaults.headers.common['x-access-token'] = accessToken;

    setTimeout(() => {
      refresh(dispatch);
    }, JWT_REFRESH_FREQUENCY);
  } catch (e) {
    alert("Logouted. Please re-login");
    dispatch(logoutThunk());
  }
}

const loginThunk = (code: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const loginInfo = await getAuthToken(code);

      // save logged in to local storage
      localStorageService.setUserTokenToLocalStorage(loginInfo.tokens);

      axios.defaults.headers.common['x-access-token'] = loginInfo.tokens.yasAccessToken;
      dispatch(loginSuccess(loginInfo.userInfo, loginInfo.tokens));
      refresh(dispatch);
    } catch (e) {
      dispatch(loginError(e));
      dispatch(logoutThunk());
    }
  }
}

const logoutThunk = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async(dispatch) => {
    axios.defaults.headers.common['x-access-token'] = null;
    localStorageService.deleteUserTokenInLocalStorage();
    dispatch(logoutRequest());
  }
}


const getSavedLoginThunk = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    const savedUserToken = localStorageService.getUserTokenFromLocalStorage();

    if(savedUserToken==null){
      dispatch(logoutThunk());
      return;
    }
  
    axios.defaults.headers.common['x-access-token'] = savedUserToken.yasAccessToken;
    
    const userInfo = await getUserInfo();

    // if api call fails
    if('error' in userInfo){
      alert("Logouted. Please re-login");
      dispatch(logoutThunk());
    } else{
      dispatch(loginSuccess(userInfo, savedUserToken));
      refresh(dispatch);
    }
  }
}

export {
  loginThunk,
  logoutThunk,
  getSavedLoginThunk,
};