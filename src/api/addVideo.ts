import axios from 'axios';

export type Video = {
  id: string,
  snippet: {
    title: string,
    description: string,
  }
};

export type PlayList = {
  id: string,
  snippet: {
    title: string,
    description: string,
  }
};

type VideosResponse = {
  items: Array<Video>,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  },
};

type PlayListsResponse = {
  items: Array<PlayList>,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  },
};

const getPlayLists = async (pageToken = ""): Promise<PlayListsResponse> => {
  const res = await axios.request<PlayListsResponse>({
    baseURL: API_URL,
    url: '/v1/contents/playlists',
    method: 'get',
    params: {
      pageToken: pageToken,
    },
  });
  return res.data;
};

const getPlayList = async (playListId: string, pageToken = ""): Promise<VideosResponse> => {
  const res = await axios.request<VideosResponse>({
    baseURL: API_URL,
    url: '/v1/contents/playlist',
    method: 'get',
    params: {
      id: playListId,
      pageToken: pageToken,
    },
  });
  return res.data;
};

const getLikeList = async (pageToken = ""): Promise<VideosResponse> => {
  const res = await axios.request<VideosResponse>({
    baseURL: API_URL,
    url: '/v1/contents/likelist',
    method: 'get',
    params: {
      pageToken: pageToken,
    },
  });
  return res.data;
};

const getSearchList = async (keyword: string, pageToken = ""): Promise<VideosResponse> => {
  const res = await axios.request<VideosResponse>({
    baseURL: API_URL,
    url: '/v1/contents/search',
    method: 'get',
    params: {
      keyword: keyword,
      pageToken: pageToken,
    },
  });
  return res.data;
};

export {
  getPlayLists,
  getPlayList,
  getLikeList,
  getSearchList,
};