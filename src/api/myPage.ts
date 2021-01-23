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

const putUserInfo = async (nickname:string, aboutMe:string|null): Promise<any>=> {
    try{
        const res = await axios.request<putUserInfoResponse>({
            baseURL: API_URL,
            url: '/v1/user/user-info',
            method: 'put',
            data: {
                nickname: nickname,
                aboutMe: aboutMe
            }
        });
        
        return res.data as putUserInfoResponse;
    } catch(error){
        return error.response.data as errorResponse;
    }
}

export {
  putUserInfo
}; 