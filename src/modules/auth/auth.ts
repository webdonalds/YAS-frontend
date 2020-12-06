import { createAction, ActionType, createReducer } from 'typesafe-actions';

// Action type
const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_ERROR = 'auth/LOGIN_ERROR';

type LoginErrorResponse = {
  code: number,
  message: string,
}


// Action generator
export const loginRequest = createAction(LOGIN_REQUEST)();
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  (userInfo: userData, token: string) => {
    return {
      userInfo: userInfo,
      bearerToken: token
    }
  },
)();
export const loginError = createAction(
  LOGIN_ERROR,
  (error: LoginErrorResponse) => error,
)();

const actions = { loginRequest, loginSuccess, loginError };
export type AuthAction = ActionType<typeof actions>;


// State
type AuthState = {
  userInfo: userData | null,
  bearerToken: string | null,
  error: LoginErrorResponse | null,
}

const initialState: AuthState = {
  userInfo: null,
  bearerToken: null,
  error: null,
};


const auth = createReducer<AuthState, AuthAction>(initialState, {
  [LOGIN_REQUEST]: state => state,
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: action.payload.userInfo,
    bearerToken: action.payload.bearerToken,
    error: null,
  }),
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    userInfo: null,
    bearerToken: null,
    error: action.payload,
  })
});

export default auth;