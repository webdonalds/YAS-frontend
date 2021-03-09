import axios from 'axios';

type AuthTokenResponse = {
  data: UserData,
  auth: Tokens,
};

type RefreshResponse = {
  yasAccessToken: string
};

const getAuthToken = async (code: string): Promise<UserLoginInfo> => {
  const res = await axios.request<AuthTokenResponse>({
    baseURL: API_URL,
    url: '/v1/auth/login',
    method: 'get',
    params: {
      code: code,
    },
  });

  const data = res.data;
  
  const ret = {
    userInfo: data.data,
    tokens: data.auth
  }

  return ret;
}

const refreshAuthToken = async (refreshToken: string): Promise<string> => {
  const res = await axios.request<RefreshResponse>({
    baseURL: API_URL,
    url: '/v1/auth/access-token',
    method: 'get',
    params: {
      token: refreshToken,
    },
  });
  return res.data.yasAccessToken;
}

export {
  getAuthToken,
  refreshAuthToken,
};