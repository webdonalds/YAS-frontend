import axios from 'axios';

export type VideoPostInfo = {
    id: number,
    videoId: string,
    userId: number,
    title: string,
    description: string,
    totalLikes: number,
    createdAt: string,
    updatedAt: string
};

type VideoPostsResponse = {
    videoList: Array<VideoPostInfo>,
    pageToken: number|null
}

const getRecentVideoPosts = async (pageToken:number|null): Promise<VideoPostsResponse> => {
    const res = await axios.request<VideoPostsResponse>({
        baseURL: API_URL,
        url: '/v1/logoffed-post-list/recent-videos',
        method: 'get',
        params: {
            pageToken: pageToken
        }
    });
    return res.data;
}


const getHotVideoPosts = async (): Promise<VideoPostsResponse> => {
    const res = await axios.request<VideoPostsResponse>({
        baseURL: API_URL,
        url: '/v1/logoffed-post-list/hot-videos',
        method: 'get'
    });
    return res.data;
}


export {
  getRecentVideoPosts,
  getHotVideoPosts
}; 