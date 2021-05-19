import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideo } from '../api/addVideo';
import { RootState } from '../modules';
import { initialize, setValue, addTag as addTagToRedux, deleteTag as deleteTagToRedux, setUser, setNumberValue } from '../modules/video/video';
import useDebounce from '../util/debounce';
import { getYoutubeUrl } from '../util/youtube';

const searchDebounceDelay = 500; // ms

function getVideoId(youtubeUrl: string): string {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = youtubeUrl.match(regExp);
  return (match && match[7].length==11) ? match[7] : "";
}

const VideoHook = () => {
  const { id, url, title, description, tags, user, totalLikes } = useSelector((state: RootState) => state.video);
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  const init = async (postId: string | null) => {
    dispatch(initialize());
    if(postId != null) {
      const post = await getVideo(postId);
      dispatch(setValue('id', post.videoId));
      dispatch(setUser(post.user));
      setUrl(getYoutubeUrl(post.videoId));
      setTitle(post.title);
      setDescription(post.description);
      post.tags.forEach((tag) => {
        addTag(tag.tagName);
      });
      setTotalLikes(post.totalLikes);
      setInitialized(true);
    }
  }

  const debounceSetIdFromUrl = useDebounce(url, searchDebounceDelay);
  useEffect(() => {
    const id = getVideoId(url);
    dispatch(setValue('id', id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSetIdFromUrl]);

  const setUrl = (url: string) => {
    dispatch(setValue('url', url));
  };

  const setTitle = (title: string) => {
    dispatch(setValue('title', title));
  };

  const setDescription = (description: string) => {
    dispatch(setValue('description', description));
  }

  const addTag = (tag: string) => {
    dispatch(addTagToRedux(tag));
  }

  const deleteTag = (tag: string) => {
    dispatch(deleteTagToRedux(tag));
  }

  const setTotalLikes = (likes: number) => {
    dispatch(setNumberValue('totalLikes', likes));
  }

  return {
    initialized,
    id,
    url,
    title,
    description,
    tags,
    user,
    totalLikes,
    init,
    setUrl,
    setTitle,
    setDescription,
    addTag,
    deleteTag,
  }
}

export default VideoHook;