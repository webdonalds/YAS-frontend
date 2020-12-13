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
  (userInfo: userData, tokens: tokens) => {
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

const actions = { loginRequest, loginSuccess, loginError };
export type AuthAction = ActionType<typeof actions>;


// State
type AuthState = {
  userInfo: userData | null,
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
  })
});

export default auth;