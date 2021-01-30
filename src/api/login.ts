import axios from 'axios';

type AuthTokenResponse = {
  data: UserData,
  auth: Tokens,
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

export {
  getAuthToken,
};