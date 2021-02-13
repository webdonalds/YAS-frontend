import axios from 'axios';


const getUserInfo = async (): Promise<UserData|ErrorResponse> => {
    try{
        const res = await axios.request<UserData>({
            baseURL: API_URL,
            url: '/v1/user/user-info',
            method: 'get'
        });

        return res.data;
    } catch(error){
        return <ErrorResponse> error.response.data;
    }
}

export {
  getUserInfo
}; 