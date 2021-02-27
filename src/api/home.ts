import axios from 'axios';


const getRecentVideoPosts = async (pageToken:number|null): Promise<VideoPostsResponse> => {
    const res = await axios.request({
        baseURL: API_URL,
        url: '/v1/logoffed-post-list/recent-videos',
        method: 'get',
        params: {
            pageToken: pageToken
        }
    });

    for(let i=0; i<res.data.videoList.length; i++){
        res.data.videoList[i].tags = res.data.videoList[i].Tags;
        res.data.videoList[i].user = res.data.videoList[i].User;
    }

    return res.data;
}


const getHotVideoPosts = async (): Promise<VideoPostsResponse> => {
    const res = await axios.request({
        baseURL: API_URL,
        url: '/v1/logoffed-post-list/hot-videos',
        method: 'get'
    });

    for(let i=0; i<res.data.videoList.length; i++){
        res.data.videoList[i].tags = res.data.videoList[i].Tags;
        res.data.videoList[i].user = res.data.videoList[i].User;
    }
    
    return res.data;
}


export {
  getRecentVideoPosts,
  getHotVideoPosts
}; 