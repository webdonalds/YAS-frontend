import axios from 'axios';
import jwt from 'jsonwebtoken';

type AuthTokenResponse = {
  data: userData,
  auth: tokenData,
};


const getAuthToken = async (code: string): Promise<userLoginInfo> => {
  const res = await axios.request<AuthTokenResponse>({
    baseURL: API_URL,
    url: '/v1/auth',
    method: 'get',
    params: {
      code: code,
    },
  });

  const data = res.data;
  const token: string = jwt.sign({
    yasToken: data.auth.yasToken,
  }, data.auth.yasSecretKey, {
    expiresIn:3600,
  });
 
  const ret = {
    userInfo: data.data,
    token: token
  }

  return ret;
}

export {
  getAuthToken,
};