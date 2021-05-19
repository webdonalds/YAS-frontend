import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLike, setLike as setLikeApi } from '../api/like';
import { RootState } from '../modules';
import { setLikeAction } from '../modules/video/like';

const LikeHook = () => {
  const { like } = useSelector((state: RootState) => state.like);
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  const init = async (videoId: string | null) => {
    if(!initialized && videoId != null) {
      const like = await getLike(videoId);
      dispatch(setLikeAction(like));
      setInitialized(true);
    }
  }
  
  const setLike = (videoId: string, like: boolean) => {
    setLikeApi(videoId, like);
    dispatch(setLikeAction(like));
  };

  return {
    like,
    init,
    setLike,
  }
}

export default LikeHook;