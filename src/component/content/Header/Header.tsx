import React, { useEffect } from "react";
import useLogin from "../../../hooks/useLogin";
import { GoogleLogin, GoogleLoginResponseOffline, GoogleLoginResponse } from 'react-google-login';

import "./Header.css";

const Header:React.FC = () => {
  const { userInfo, bearerToken, error, onLogin } = useLogin();
  
  useEffect(() => {
    console.log(userInfo);
  });
  
  
  const handleSuccessLogin = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    onLogin(response.code);
  }
    
  const handleFailureLogin = (error: any) => { // eslint-disable-line
    alert("구글 로그인에 실패하였습니다.\n잠시 후에 다시 시도해주세요.");
  }

  if(error!=null){
    alert("로그인 중 에러가 발생하였습니다.");
  }


  const googleLoginButton = (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Login"
      responseType="code"
      onSuccess={handleSuccessLogin}
      onFailure={handleFailureLogin}
      redirectUri="postmessage"
    />
  );

  return (
    <div className="header_container">
      <div className="header_content">
        <div className="header_logo_container">
          <a href="/">
            <img src="https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png"/>
          </a>
        </div>

        <div className="header_right_end_container">
          <div>
            {userInfo ? userInfo.nickname : googleLoginButton }
          </div>
        </div>    
        <div className="header_right_end_container">
          <div>
            {userInfo ? "영상추가" : ""}
          </div>
        </div>    
        <div className="header_right_end_container">
          <div>
            필터
          </div>
        </div>  
        <div className="header_right_end_container">
          <div>
            검색
          </div>
        </div>  
      </div>
    </div>
    );
}
export default Header;
