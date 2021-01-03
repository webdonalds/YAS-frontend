import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import GetLogin from "../../../hooks/GetLogin";
import useLogout from "../../../hooks/useLogout";
import { GoogleLogin, GoogleLoginResponseOffline, GoogleLoginResponse } from 'react-google-login';
import { FaPlusCircle } from 'react-icons/fa';

import "./Header.css";

const Header: React.FC<RouteComponentProps> = ({history}) => {
  const { userInfo, error } = GetLogin();
  const onLogin = useLogin();
  const onLogout = useLogout();
  
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

  const handleAdd = () => {
    history.push("/add");
  };
  const addVideoButton = (
    <div className="header_right_end_container">
      <FaPlusCircle className="header_hover" onClick={handleAdd} />
    </div>
  )
  
  const logoutButton = (
    <div className="header_right_end_container">
      <div>
        <button onClick={onLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );

  return (
    <div className="header_container">
      <div className="header_content">
        <div className="header_logo_container">
          <Link to="/">
            <img src="https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png"/>
          </Link>
        </div>

        {userInfo ? logoutButton : null}
      
        <div className="header_right_end_container">
          <div>
            {userInfo ? userInfo.nickname : googleLoginButton }
          </div>
        </div>
        {userInfo ? addVideoButton : null}
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
export default withRouter(Header);
