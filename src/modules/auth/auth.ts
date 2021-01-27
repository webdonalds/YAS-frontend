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
  (userInfo: UserData, tokens: tokens) => {
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
  userInfo: UserData | null,
  tokens: tokens | null,
  error: LoginErrorResponse | null,
}

const initialState: AuthState = {
  userInfo: null,
  tokens: null,
  error: null,
};


const auth = createReducer<AuthState, AuthAction>(initialState, {
  [LOGIN_REQUEST]: state => state,
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: action.payload.userInfo,
    tokens: action.payload.tokens,
    error: null,
  }),
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    userInfo: null,
    tokens: null,
    error: action.payload,
  }),
  [LOGOUT_REQUEST] : (state) => ({
    ...state,
    userInfo: null,
    tokens: null,
    error: null
  }),
});

export default auth;