import axios from 'axios';


type PutUserInfoResponse = {
    nickname: string,
    aboutMe: string | null
}

type GetUserVideosResponse = {
    videoList: Array<VideoPostInfoWithUser>,
    pageToken: number|null
}

type PutProfileImageResponse = {
    message: string
}

type IsFollowingResponse = {
    isFollowing: boolean
}

type PostFollowResponse = {
    followerId: number,
    followeeId: number
}       
  
type DeleteFollowResponse = {
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

const getUserVideos = async (userId:number, pageToken:number|null): Promise<GetUserVideosResponse | ErrorResponse> => {
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

const getUserFollowers = async (userId:number, pageToken:number|null): Promise<FollowListResponse | ErrorResponse> => {
    try{
        const res = await axios.request({
            baseURL: API_URL,
            url: `/v1/follow`,
            method: 'get',
            params: {
                pageToken: pageToken,
                followeeId: userId
            }
        })

        return res.data;
    } catch(error){
        return <ErrorResponse> error.response.data;
    }
}

const getUserFollowees = async (userId:number, pageToken:number|null): Promise<FollowListResponse | ErrorResponse> => {
    try{
        const res = await axios.request({
            baseURL: API_URL,
            url: `/v1/follow`,
            method: 'get',
            params: {
                pageToken: pageToken,
                followerId: userId
            }
        })

        return res.data;
    } catch(error){
        return <ErrorResponse> error.response.data;
    }
}

const getIsFollowing = async (followeeId:number, followerId:number): Promise<IsFollowingResponse | ErrorResponse> => {
    try {
        const res = await axios.request({
            baseURL: API_URL,
            url: `/v1/follow/isFollowing`,
            method: 'get',
            params: {
                followeeId: followeeId,
                followerId: followerId
            }
        })

        return res.data;
    } catch(error) {
        return <ErrorResponse> error.response.data
    }
}

const followUser = async (followeeId:number): Promise<PostFollowResponse | ErrorResponse> => {
    try {
        const res = await axios.request({
            baseURL: API_URL,
            url: `/v1/follow/${followeeId}`,
            method: 'post',
        })

        return res.data;
    } catch(error) {
        return <ErrorResponse> error.response.data
    }
}

const unfollowUser = async (followeeId:number): Promise<DeleteFollowResponse | ErrorResponse> => {
    try {
        const res = await axios.request({
            baseURL: API_URL,
            url: `/v1/follow/${followeeId}`,
            method: 'delete',
        })

        return res.data;
    } catch(error) {
        return <ErrorResponse> error.response.data
    }
}

export {
  putUserInfo,
  putProfileImage,
  getUserVideos,
  getUserFollowers,
  getUserFollowees,
  getIsFollowing,
  followUser,
  unfollowUser,
}; 
