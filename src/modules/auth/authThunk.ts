import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthAction, loginRequest, loginSuccess, loginError } from '../auth/auth';
import { getAuthToken } from '../../api/login';

// TODO: logic
const loginThunk = (code: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const token = await getAuthToken(code)
      dispatch(loginSuccess(token))
    } catch (e) {
      dispatch(loginError(e));
    }
  }
}

export {
  loginThunk,
};