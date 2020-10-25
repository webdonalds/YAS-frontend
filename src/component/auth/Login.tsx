import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login: React.SFC<RouteComponentProps> = ({ history }) => {
  const { bearerToken, error, onLogin } = useLogin();

  useEffect(() => {
      // already login
    if(bearerToken != null) {
      history.push("/");
    }
  });

  if(bearerToken != null) {
    return null;
  }

  // login error
  if(error != null) {
    // TODO
  }

  return (
    <div>
      login 페이지
      <button onClick={onLogin}>login</button>
    </div>
  );
}

export default Login;