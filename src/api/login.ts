import axios from 'axios';

type AuthTokenResponse = {
  data: userData,
  auth: tokens,
};


const getAuthToken = async (code: string): Promise<userLoginInfo> => {
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