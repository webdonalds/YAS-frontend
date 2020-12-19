import { useDispatch } from 'react-redux';
import { logoutThunk } from '../modules/auth/authThunk';
import { useCallback } from 'react';
import localStorageService from '../service/localStorageService';

const useLogout = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
      localStorageService.eraseUserLoginInfoInLocalStorage();
      dispatch(logoutThunk())
  }, [dispatch]);

  return onLogout;
}

export default useLogout;