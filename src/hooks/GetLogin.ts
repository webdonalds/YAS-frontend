import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const GetLogin = () => {
  const { userInfo, tokens, error } = useSelector((state: RootState) => state.auth);
  
  return {
    userInfo,
    tokens,
    error,
  }
}

export default GetLogin;