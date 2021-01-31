import axios from 'axios';


type PutUserInfoResponse = {
    nickname: string,
    aboutMe: string | null
}

type GetMyVideosResponse = {
    videoList: Array<VideoPostInfo>,
    pageToken: number|null
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
};

const getMyVideos = async (userId:number, pageToken:number|null): Promise<GetMyVideosResponse | ErrorResponse> => {
    try{
        const res = await axios.request<GetMyVideosResponse>({
            baseURL: API_URL,
            url: `/v1/post/user-videos/${userId}`,
            method: 'get',
            params: {
                pageToken: pageToken
            }
        })
        return res.data;
    } catch(error){
        return <ErrorResponse> error.response.data;
    }
};


export {
  putUserInfo,
  getMyVideos
}; 