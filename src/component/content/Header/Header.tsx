import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import GetLogin from "../../../hooks/GetLogin";
import useLogout from "../../../hooks/useLogout";
import { GoogleLogin, GoogleLoginResponseOffline, GoogleLoginResponse } from 'react-google-login';
import utils from "../../../service/utils";

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
    <li className="pr-4">
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login"
        responseType="code"
        onSuccess={handleSuccessLogin}
        onFailure={handleFailureLogin}
        redirectUri="postmessage"
        scope={[
          "profile",
          "email",
          "https://www.googleapis.com/auth/youtube.readonly",
        ].join(" ")}
      />
    </li>
  );

  const handleMyPage = () => {
    history.push("/my-page");
  }
 
  const handleAdd = () => {
    history.push("/add-video");
  };

  const addVideoButton = (
    <li className="pr-5">
      <svg onClick={handleAdd} className="cursor-pointer h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </li>
  )

  const logoutButtonClass = "text-lg px-4 py-2 rounded-md text-white bg-purple-400 cursor-pointer mt-4 lg:mt-0 "
  const logoutButtonHoverClass = "hover:text-white hover:bg-purple-500 hover:border-purple-500 "

  const logoutButton = (
    <li className="pr-5 pl-10">
      <span onClick={onLogout} className={logoutButtonClass + logoutButtonHoverClass}>
        Logout
      </span>
    </li>
  );

  const searchButton = (
    <li className="pr-5">
      <svg className="cursor-pointer h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </li>
  )

  const userButton = (
    <li className="pr-5">
      <img className="rounded-full h-12 w-12 object-cover cursor-pointer" onClick={handleMyPage} src={userInfo && userInfo.imagePath ? userInfo.imagePath : utils.defaultProfileImage}/>
    </li>
  )

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
      <Link to="/">
        <div className="flex items-center flex-no-shrink text-black mr-6">
          <img className="w-20 h-20" src="https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png"/>
          <span className="font-semibold text-3xl tracking-tight">YAS</span>
        </div>
      </Link>
      <ul className="flex flex-row items-center">
        {searchButton}
        {userInfo ? addVideoButton : null}
        {userInfo ? userButton : null}
        {userInfo ? logoutButton : googleLoginButton}
      </ul>
    </nav>
  );
}
export default withRouter(Header);
