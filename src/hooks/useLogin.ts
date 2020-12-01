import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { loginThunk } from '../modules/auth/authThunk';
import { useCallback } from 'react';

const useLogin = () => {
  const { userInfo, bearerToken, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const onLogin = useCallback((code) => dispatch(loginThunk(code)), [dispatch])


  return {
    userInfo,
    bearerToken,
    error,
    onLogin,
  }
}

export default useLogin;