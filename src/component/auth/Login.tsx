import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import { GoogleLogin, GoogleLoginResponseOffline, GoogleLoginResponse } from 'react-google-login';

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

  const handleSuccessLogin = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    // TODO
    console.log(response);
  }

  const handleFailureLogin = (error: any) => {
    // TODO
    console.log(error);
  }

  return (
    <div>
      login 페이지
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        responseType="code"
        onSuccess={handleSuccessLogin}
        onFailure={handleFailureLogin}
        redirectUri="postmessage"
      />
    </div>
  );
}

export default Login;