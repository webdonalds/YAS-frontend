import axios from 'axios';

const getAuthToken = async (code: string): Promise<string> => {
  try {
    const res = await axios({
      baseURL: API_URL,
      url: '/v1/auth',
      method: 'get',
      params: {
        code: code,
      },
    });
    // TODO: make jwtToken from res
    return res.data.email;
  } catch(error) {
    // TODO: error
    return "";
  }
}

export {
  getAuthToken,
};