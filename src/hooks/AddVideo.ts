import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { initialize, setValue, addTag as addTagToRedux, deleteTag as deleteTagToRedux } from '../modules/addVideo/addVideo';
import useDebounce from '../util/debounce';

const searchDebounceDelay = 500; // ms

function getVideoId(youtubeUrl: string): string {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = youtubeUrl.match(regExp);
  return (match && match[7].length==11) ? match[7] : "";
}

const AddVideoHook = () => {
  const { id, url, title, description, tags } = useSelector((state: RootState) => state.addVideo);
  const dispatch = useDispatch();

  const init = () => {
    dispatch(initialize());
  }

  const debounceSetIdFromUrl = useDebounce(url, searchDebounceDelay);
  useEffect(() => {
    const id = getVideoId(url);
    dispatch(setValue('id', id));
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

  return {
    id,
    url,
    title,
    description,
    tags,
    init,
    setUrl,
    setTitle,
    setDescription,
    addTag,
    deleteTag,
  }
}

export default AddVideoHook;