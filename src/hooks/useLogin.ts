import { useDispatch } from 'react-redux';
import { loginThunk } from '../modules/auth/authThunk';
import { useCallback } from 'react';


const useLogin = () => {
  const dispatch = useDispatch();

  const onLogin = useCallback((code) => dispatch(loginThunk(code)), [dispatch])

  return onLogin;
}

export default useLogin;