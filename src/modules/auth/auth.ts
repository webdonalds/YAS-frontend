import { createAction, ActionType, createReducer } from 'typesafe-actions';

// Action type
const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_ERROR = 'auth/LOGIN_ERROR';
const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';

type LoginErrorResponse = {
  code: number,
  message: string,
}


// Action generator
export const loginRequest = createAction(LOGIN_REQUEST)();
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  (userInfo: UserData, tokens: Tokens) => {
    return {
      userInfo: userInfo,
      tokens: tokens
    }
  },
)();
export const loginError = createAction(
  LOGIN_ERROR,
  (error: LoginErrorResponse) => error,
)();
export const logoutRequest = createAction(LOGOUT_REQUEST)();

const actions = { loginRequest, loginSuccess, loginError, logoutRequest };
export type AuthAction = ActionType<typeof actions>;


// State
type AuthState = {
  initialized: boolean,
  userInfo: UserData | null,
  tokens: Tokens | null,
  error: LoginErrorResponse | null,
}

const initialState: AuthState = {
  initialized: false,
  userInfo: null,
  tokens: null,
  error: null,
};


const auth = createReducer<AuthState, AuthAction>(initialState, {
  [LOGIN_REQUEST]: state => state,
  [LOGIN_SUCCESS]: (_, action) => ({
    initialized: true,
    userInfo: action.payload.userInfo,
    tokens: action.payload.tokens,
    error: null,
  }),
  [LOGIN_ERROR]: (_, action) => ({
    initialized: true,
    userInfo: null,
    tokens: null,
    error: action.payload,
  }),
  [LOGOUT_REQUEST] : () => ({
    initialized: true,
    userInfo: null,
    tokens: null,
    error: null
  }),
});

export default auth;