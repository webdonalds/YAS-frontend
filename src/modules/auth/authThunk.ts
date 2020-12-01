import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthAction, loginRequest, loginSuccess, loginError } from './auth';
import { getAuthToken } from '../../api/login';

const loginThunk = (code: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const loginInfo = await getAuthToken(code);
      dispatch(loginSuccess(loginInfo.userInfo, loginInfo.token));
    } catch (e) {
      dispatch(loginError(e));
    }
  }
}

export {
  loginThunk,
};