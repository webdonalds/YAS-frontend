import axios from 'axios';

export type videoPostInfo = {
    id: number,
    videoId: string,
    userId: number,
    title: string,
    description: string,
    totalLikes: number,
    createdAt: string,
    updatedAt: string
};

type videoPostsResponse = {
    videoList: Array<videoPostInfo>,
    pageToken: number|null
}

const getRecentVideoPosts = async (pageToken:number|null): Promise<videoPostsResponse> => {
    const res = await axios.request<videoPostsResponse>({
        baseURL: API_URL,
        url: '/v1/logoffed-post-list/recent-videos',
        method: 'get',
        params: {
            pageToken: pageToken
        }
    });
    return res.data;
}


const getHotVideoPosts = async (): Promise<videoPostsResponse> => {
    const res = await axios.request<videoPostsResponse>({
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