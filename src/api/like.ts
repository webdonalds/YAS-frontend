import axios from 'axios';

export type Like = {
  like: boolean
};

const getLike = async (videoId: string): Promise<boolean> => {
  const res = await axios.request<Like>({
    baseURL: API_URL,
    url: `/v1/like/myLike/${videoId}`,
    method: 'get',
  });
  return res.data.like;
}

const setLike = async (videoId: string, like: boolean): Promise<boolean> => {
  const res = await axios.request({
    baseURL: API_URL,
    url: '/v1/like',
    method: like ? 'post' : 'delete',
    data: {
      videoId: videoId,
    },
  });
  return res.status == 200;
}

export {
  getLike,
  setLike,
};