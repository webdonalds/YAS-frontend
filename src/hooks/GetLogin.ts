import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getSavedLoginThunk } from '../modules/auth/authThunk';
import localStorageService from '../service/localStorageService';


const GetLogin = () => {
  const { userInfo, tokens, error } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  // if not initialized
  if(userInfo==null && tokens==null && error==null){
    const savedUserLoginInfo: userLoginInfo = localStorageService.getUserLoginInfoFromLocalStorage();
    
    if(savedUserLoginInfo!=null){
      dispatch(getSavedLoginThunk(savedUserLoginInfo));
    }
  }
  
  return {
    userInfo,
    tokens,
    error,
  }
}

export default GetLogin;