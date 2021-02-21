import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const GetLogin = () => {
  const { initialized, userInfo, tokens, error } = useSelector((state: RootState) => state.auth);
  
  return {
    initialized,
    userInfo,
    tokens,
    error,
  }
}

export default GetLogin;