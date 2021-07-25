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
  nextPageToken: string | undefined,
};

type PlayListsResponse = {
  items: Array<PlayList>,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  },
  nextPageToken: string | undefined,
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
  nextPageToken: string | undefined,
};

export type PostVideoResponse = {
  ok: boolean,
  postId: number,
}

const getPlayLists = async (pageToken: string|undefined = undefined): Promise<PlayListsResponse> => {
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

const getPlayList = async (playListId: string, pageToken: string|undefined = undefined): Promise<VideosResponse> => {
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

const getLikeList = async (pageToken: string|undefined = undefined): Promise<VideosResponse> => {
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
  return {
    items: videos,
    pageInfo: res.data.pageInfo,
    nextPageToken: res.data.nextPageToken,
  }
};

const getSearchList = async (keyword: string, pageToken: string|undefined = undefined): Promise<VideosResponse> => {
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

// TODO: error handling
const getVideo = async (postId: string): Promise<VideoPostInfoWithUser> => {
  const res = await axios.request({
    baseURL: API_URL,
    url: `/v1/post/video/${postId}`,
    method: 'get'
  });
  res.data.tags = res.data.Tags;
  res.data.user = res.data.User;
  return res.data;
}

const postVideo = async (videoId: string, title: string, description: string, tags: Array<string>): Promise<number | null> => {
  try {
    const res = await axios.request({
      baseURL: API_URL,
      url: '/v1/post/video',
      method: 'post',
      data: {
        videoId: videoId,
        title: title,
        description: description,
        tags: tags,
      },
    });
    return res.data.postId;
  } catch(error) {
    return null;
  }
}

const modifyVideo = async (postId: string, title: string, description: string, tags: Array<string>): Promise<number | null> => {
  try {
    const res = await axios.request({
      baseURL: API_URL,
      url: '/v1/post/video',
      method: 'put',
      data: {
        videoPostId: postId,
        title: title,
        description: description,
        tags: tags,
      },
    });
    return res.data.postId;
  } catch(error) {
    return null;
  }
}

const deleteVideo = async (postId: string): Promise<boolean> => {
  const res = await axios.request({
    baseURL: API_URL,
    url: '/v1/post/video',
    method: 'delete',
    data: {
      videoPostId: postId
    },
  });
  return res.status == 200;
}

export {
  getPlayLists,
  getPlayList,
  getLikeList,
  getSearchList,
  getVideo,
  postVideo,
  modifyVideo,
  deleteVideo
};
