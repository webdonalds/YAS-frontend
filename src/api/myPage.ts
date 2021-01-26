import axios from 'axios';


type putUserInfoResponse = {
    nickname: string,
    aboutMe: string | null
}

type errorResponse = {
    error: {
        message: string,
        specific: string | null
    }
}

const putUserInfo = async (nickname:string, aboutMe:string|null): Promise<errorResponse | putUserInfoResponse>=> {
    try{
        const res = await axios.request<errorResponse | putUserInfoResponse>({
            baseURL: API_URL,
            url: '/v1/user/user-info',
            method: 'put',
            data: {
                nickname: nickname,
                aboutMe: aboutMe
            }
        });
        
        return res.data;
    } catch(error){
        return <errorResponse> error.response.data;
    }
}

export {
  putUserInfo
}; 