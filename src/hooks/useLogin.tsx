import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { loginRequest } from '../modules/auth';
import { useCallback } from 'react';

const useLogin = () => {
  const { bearerToken, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const onLogin = useCallback(() => dispatch(loginRequest()), [dispatch])

  return {
    bearerToken,
    error,
    onLogin,
  }
}

export default useLogin;