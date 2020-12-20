import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { setValue } from '../modules/addVideo/addVideo';

const AddVideoHook = () => {
  const { id, url, title, description, tags } = useSelector((state: RootState) => state.addVideo);
  const dispatch = useDispatch();
  
  const setUrl = (url: string) => {
    // TODO: set Id, thumbnail
    dispatch(setValue('url', url));
  };

  const setTitle = (title: string) => {
    dispatch(setValue('title', title));
  };

  const setDescription = (description: string) => {
    dispatch(setValue('description', description));
  }

  return {
    id,
    url,
    title,
    description,
    tags,
    setUrl,
    setTitle,
    setDescription,
  }
}

export default AddVideoHook;