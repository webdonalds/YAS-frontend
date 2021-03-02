import axios from 'axios';


type PutUserInfoResponse = {
    nickname: string,
    aboutMe: string | null
}

type GetMyVideosResponse = {
    videoList: Array<VideoPostInfoWithUser>,
    pageToken: number|null
}

type PutProfileImageResponse = {
    message: string
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

const putProfileImage = async (imagePath: string | null): Promise<ErrorResponse | PutProfileImageResponse> => {
    try{
        const res = await axios.request<PutProfileImageResponse>({
            baseURL: API_URL,
            url: '/v1/user/profile-image',
            method: 'put',
            data: {
                imagePath: imagePath
            }
        });
        
        return res.data;
    } catch(error){
        return <ErrorResponse> error.response.data;
    }
}

const getMyVideos = async (userId:number, pageToken:number|null): Promise<GetMyVideosResponse | ErrorResponse> => {
    try{
        const res = await axios.request({
            baseURL: API_URL,
            url: `/v1/post/user-videos/${userId}`,
            method: 'get',
            params: {
                pageToken: pageToken
            }
        })

        for(let i=0; i<res.data.videoList.length; i++){
            res.data.videoList[i].tags = res.data.videoList[i].Tags;
            res.data.videoList[i].user = res.data.videoList[i].User;
        }

        return res.data;
    } catch(error){
        return <ErrorResponse> error.response.data;
    }
};


export {
  putUserInfo,
  putProfileImage,
  getMyVideos
}; 