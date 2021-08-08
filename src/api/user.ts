import axios from 'axios';

const getLoginUserInfo = async (): Promise<UserData|ErrorResponse> => {
    try{
        const res = await axios.request<UserData>({
            baseURL: API_URL,
            url: '/v1/user/login-user-info',
            method: 'get',
        });

        return res.data;
    } catch(error){
        return <ErrorResponse> error.response.data;
    }
}

const getUserInfo = async (userId:number): Promise<UserData|ErrorResponse> => {
    try{
        const res = await axios.request<UserData>({
            baseURL: API_URL,
            url: '/v1/user/user-info/' + userId.toString(),
            method: 'get'
        });

        return res.data;
    } catch(error){
        return <ErrorResponse> error.response.data;
    }
}

export {
    getLoginUserInfo,
    getUserInfo
}; 
