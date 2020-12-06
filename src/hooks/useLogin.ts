import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getSavedLoginThunk, loginThunk } from '../modules/auth/authThunk';
import _ from 'lodash';
import { useCallback } from 'react';
import localStorageService from '../service/localStorageService';

const useLogin = () => {
  const { userInfo, bearerToken, error } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  // check if saved login exist
  const savedUserLoginInfo: userLoginInfo = localStorageService.getUserLoginInfoFromLocalStorage();

  if(savedUserLoginInfo != null){
    if(!(_.isEqual(userInfo, savedUserLoginInfo.userInfo) && bearerToken===savedUserLoginInfo.token)){
      dispatch(getSavedLoginThunk(savedUserLoginInfo));
    }
  }
  
  const onLogin = useCallback((code) => dispatch(loginThunk(code)), [dispatch])


  return {
    userInfo,
    bearerToken,
    error,
    onLogin,
  }
}

export default useLogin;