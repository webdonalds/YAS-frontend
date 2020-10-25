import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { loginThunk } from '../modules/auth/authThunk';
import { useCallback } from 'react';

const useLogin = () => {
  const { bearerToken, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const onLogin = useCallback(() => dispatch(loginThunk()), [dispatch])

  return {
    bearerToken,
    error,
    onLogin,
  }
}

export default useLogin;