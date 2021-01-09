import axios from 'axios';

export type Video = {
  id: string,
  title: string,
  description: string,
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
  nextPageToken: string,
};

type PlayListsResponse = {
  items: Array<PlayList>,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  },
  nextPageToken: string,
};

type PlaylistVideo = {
  snippet: {
    title: string,
    description: string,
    resourceId: {
      videoId: string,
    },
  },
};

type LikeVideo = {
  id: string,
  snippet: {
    title: string,
    description: string,
  },
};

type SearchVideo = {
  id: {
    videoId: string,
  },
  snippet: {
    title: string,
    description: string,
  },
};

type AxiosVideoResponse<T> = {
  items: Array<T>,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  },
  nextPageToken: string,
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
  const res = await axios.request<AxiosVideoResponse<PlaylistVideo>>({
    baseURL: API_URL,
    url: '/v1/contents/playlist',
    method: 'get',
    params: {
      id: playListId,
      pageToken: pageToken,
    },
  });

  const videos = res.data.items.map(val => ({
    id: val.snippet.resourceId.videoId,
    title: val.snippet.title,
    description: val.snippet.description,
  }));
  return {
    items: videos,
    pageInfo: res.data.pageInfo,
    nextPageToken: res.data.nextPageToken,
  }
};

const getLikeList = async (pageToken = ""): Promise<VideosResponse> => {
  const res = await axios.request<AxiosVideoResponse<LikeVideo>>({
    baseURL: API_URL,
    url: '/v1/contents/likelist',
    method: 'get',
    params: {
      pageToken: pageToken,
    },
  });

  const videos = res.data.items.map(val => ({
    id: val.id,
    title: val.snippet.title,
    description: val.snippet.description,
  }));
  console.log(res.data);
  console.log(videos);
  return {
    items: videos,
    pageInfo: res.data.pageInfo,
    nextPageToken: res.data.nextPageToken,
  }
};

const getSearchList = async (keyword: string, pageToken = ""): Promise<VideosResponse> => {
  const res = await axios.request<AxiosVideoResponse<SearchVideo>>({
    baseURL: API_URL,
    url: '/v1/contents/search',
    method: 'get',
    params: {
      keyword: keyword,
      pageToken: pageToken,
    },
  });

  const videos = res.data.items.map(val => ({
    id: val.id.videoId,
    title: val.snippet.title,
    description: val.snippet.description,
  }));
  return {
    items: videos,
    pageInfo: res.data.pageInfo,
    nextPageToken: res.data.nextPageToken,
  }
};

export {
  getPlayLists,
  getPlayList,
  getLikeList,
  getSearchList,
};