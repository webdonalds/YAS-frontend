import React, { useState } from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { Nav } from "react-bootstrap";
import GetLogin from "../../../hooks/GetLogin";
import utils from "../../../service/utils";

import ModifyInfoModal from "./ModifyInfoModal/ModifyInfoModal"
import MyVideo from "./MyVideo/MyVideo";
import "./MyPage.css";


enum MyPageCategory {
  MY_VIDEO,
  MY_FOLLOWER,
  MY_FOLLOWEE
}

type MyPageState = {
  myPageCategory: MyPageCategory
}

const MyPage: React.FC<RouteComponentProps> = () => {
  const { userInfo } = GetLogin();

  const [myPageState, setMyPageState ] = useState<MyPageState>({
    myPageCategory: MyPageCategory.MY_VIDEO
  });

  if(userInfo == null) {
    alert("로그인이 필요한 페이지입니다.");
    return <Redirect to="/"/>;
  } 

  const getContent = (state: MyPageState) => {
    switch(state.myPageCategory){
      case MyPageCategory.MY_VIDEO:
        return (<MyVideo/>);
      case MyPageCategory.MY_FOLLOWER:
        return (<div>my follower</div>);
      case MyPageCategory.MY_FOLLOWEE:
        return (<div>my followee</div>);
    }
  }




  const MyInfoCard = (
    <div className="my_page_my_info_card">
      <img src={userInfo.imagePath ? userInfo.imagePath : utils.defaultProfileImage} alt="test" className="img-thumbnail"/>
      <div className="my_page_my_info_card_content">
        <div>{userInfo.nickname}</div>
        <div>{userInfo.aboutMe}</div>
      </div>
      <ModifyInfoModal id={userInfo.id} email={userInfo.email} nickname={userInfo.nickname} 
      imagePath={userInfo.imagePath} aboutMe={userInfo.aboutMe}/>
    </div>
  )


  const handleMyVideo = () => setMyPageState({myPageCategory: MyPageCategory.MY_VIDEO});
  
  const handleMyFollower = () => setMyPageState({myPageCategory: MyPageCategory.MY_FOLLOWER});

  const handleMyFollowee = () => setMyPageState({myPageCategory: MyPageCategory.MY_FOLLOWEE});


  return (
    <div className="my_page_container">
      <div className="my_page_content">
        {MyInfoCard}
        <Nav variant="pills" defaultActiveKey="my_video">
          <Nav.Item>
            <Nav.Link eventKey="my_video" onClick={handleMyVideo}>내 영상</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="my_follower" onClick={handleMyFollower}>팔로워</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="my_followee" onClick={handleMyFollowee}>팔로윙</Nav.Link>
          </Nav.Item>
        </Nav>
        {getContent(myPageState)}
      </div>
    </div>
  );
}

export default withRouter(MyPage);
