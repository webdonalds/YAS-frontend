import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthAction, loginRequest, loginSuccess, loginError } from '../auth/auth';
import { getCodeFromGoogleLogin } from '../../api/login';

// TODO: logic
const loginThunk = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const token = await getCodeFromGoogleLogin()
      dispatch(loginSuccess(token))
    } catch (e) {
      dispatch(loginError(e));
    }
  }
}

export {
  loginThunk,
};