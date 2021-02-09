import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { Nav } from "react-bootstrap";
import GetLogin from "../../../hooks/GetLogin";
import utils from "../../../service/utils";
import { getMyVideos } from '../../../api/myPage';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import ModifyInfoModal from "./ModifyInfoModal/ModifyInfoModal"
import VideoPostCard from '../Commons/VideoPostCard/VideoPostCard';
import "./MyPage.css";


enum MyPageCategory {
  MY_VIDEO,
  MY_FOLLOWER,
  MY_FOLLOWEE
}

type MyPageState = {
  myPageCategory: MyPageCategory
}

type MyVideosState = {
  myVideos: Array<VideoPostInfo>
  pageToken: number|null
}

const MyPage: React.FC<RouteComponentProps> = () => {
  const { userInfo } = GetLogin();

  const [ myPageState, setMyPageState ] = useState<MyPageState>({
    myPageCategory: MyPageCategory.MY_VIDEO
  });

  const [ myVideosState, setMyVideosState ] = useState<MyVideosState>({
    myVideos: [],
    pageToken: null
  });

  // Init my videos
  useEffect(() => {
    loadMyVideo(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const loadMoreVideo = () => {
    switch(myPageState.myPageCategory){
      case MyPageCategory.MY_VIDEO:
        loadMyVideo(myVideosState.pageToken);
        break;
      default:
        break;
    }
  }

  // handle end of the scroll
  useBottomScrollListener(loadMoreVideo);

  if(userInfo == null) {
    alert("로그인이 필요한 페이지입니다.");
    return <Redirect to="/"/>;
  } 

  

  const getContent = (state: MyPageState) => {
    switch(state.myPageCategory){
      case MyPageCategory.MY_VIDEO:
        return (
          myVideosState.myVideos.map(post => (
            <VideoPostCard id={post.id} title={post.title} userId={post.userId} videoId={post.videoId} description={post.description} 
            totalLikes={post.totalLikes} createdAt={post.createdAt} updatedAt={post.updatedAt} key={post.id} tags={[]}/>
          ))
        );
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


  const loadMyVideo = async (pageToken:number|null) => {
    setMyPageState({myPageCategory: MyPageCategory.MY_VIDEO});
    const response = await getMyVideos(userInfo.id, pageToken);

    if('error' in response){
      alert(response.error.message);
      return;
    }

    if(pageToken==null){
      setMyVideosState({
        myVideos: response.videoList,
        pageToken: response.pageToken
      });
    } 
    else{
      setMyVideosState({
        myVideos: myVideosState.myVideos.concat(response.videoList),
        pageToken: response.pageToken
      });
    }
  };
  
  const handleMyFollower = () => setMyPageState({myPageCategory: MyPageCategory.MY_FOLLOWER});

  const handleMyFollowee = () => setMyPageState({myPageCategory: MyPageCategory.MY_FOLLOWEE});

  return (
    <div className="my_page_container">
      <div className="my_page_content">
        {MyInfoCard}
        <Nav variant="pills" defaultActiveKey="my_video">
          <Nav.Item>
            <Nav.Link eventKey="my_video" onClick={() => {loadMyVideo(myVideosState.pageToken)}}>내 영상</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="my_follower" onClick={handleMyFollower}>팔로워</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="my_followee" onClick={handleMyFollowee}>팔로윙</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="my_page_content_container">
          {getContent(myPageState)}
        </div>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
