import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import GetLogin from '../../hooks/GetLogin';
import { GoogleLogin, GoogleLoginResponseOffline, GoogleLoginResponse } from 'react-google-login';

const Login: React.SFC<RouteComponentProps> = ({ history }) => {
  const { userInfo, tokens, error } = GetLogin();
  const onLogin = useLogin();

  useEffect(() => {
      // already login
    if(tokens != null) {
      console.log(userInfo);
      history.push("/");
    }
  });

  if(tokens != null) {
    return null;
  }

  let errorComponent = null
  if(error != null) {
    // TODO: error code별 예외처리
    errorComponent = (<div>Error</div>)
  }

  const handleSuccessLogin = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    onLogin(response.code);
  }

  const handleFailureLogin = (error: any) => { // eslint-disable-line
    alert("구글 로그인에 실패하였습니다.\n잠시 후에 다시 시도해주세요.");
  }

  return (
    <div>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        responseType="code"
        onSuccess={handleSuccessLogin}
        onFailure={handleFailureLogin}
        redirectUri="postmessage"
      />
      {errorComponent}
    </div>
  );
}

export default Login;