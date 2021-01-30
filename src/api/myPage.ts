import axios from 'axios';


type PutUserInfoResponse = {
    nickname: string,
    aboutMe: string | null
}


const putUserInfo = async (nickname:string, aboutMe:string|null): Promise<ErrorResponse | PutUserInfoResponse>=> {
    try{
        const res = await axios.request<ErrorResponse | PutUserInfoResponse>({
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
        return <ErrorResponse> error.response.data;
    }
}

export {
  putUserInfo
}; 