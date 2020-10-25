// action type
const LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
const LOGIN_ERROR = 'auth/LOGIN_ERROR' as const;

type LoginSuccessResponse = {
  accessToken: string,
  secretKey: string,
}
type LoginErrorResponse = {
  // TODO: after api structure fixed
}

// action generator
export const loginRequest = () => ({ type: LOGIN_REQUEST });

export const loginSuccess = (res: LoginSuccessResponse) => ({ 
  type: LOGIN_SUCCESS,
  payload: res,
});

export const loginError = (error: LoginErrorResponse) => ({
  type: LOGIN_ERROR ,
  payload: error,
});

type AuthAction =
| ReturnType<typeof loginRequest>
| ReturnType<typeof loginSuccess>
| ReturnType<typeof loginError>

type AuthState = {
  bearerToken: string | null,
  error: LoginErrorResponse | null,
}

const initialState: AuthState = {
  bearerToken: null,
  error: null,
};

export default function auth(state = initialState, action: AuthAction) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_SUCCESS:
      const jwtToken = "1234" // TODO: JWT token by using accessToken and secretKey
      return {
        ...state,
        bearerToken: jwtToken,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        bearerTokean: null,
        error: action.payload,
      };
    default:
      return state;
  }
}