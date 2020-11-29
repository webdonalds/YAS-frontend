import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthAction, loginRequest, loginSuccess, loginError } from './auth';
import { getAuthToken } from '../../api/login';

const loginThunk = (code: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const token = await getAuthToken(code);
      dispatch(loginSuccess(token));
    } catch (e) {
      dispatch(loginError(e));
    }
  }
}

export {
  loginThunk,
};