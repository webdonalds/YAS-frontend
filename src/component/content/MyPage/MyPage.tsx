import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import GetLogin from "../../../hooks/GetLogin";
import utils from "../../../service/utils";
import { getMyVideos } from '../../../api/myPage';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import NavBar, { NavOption } from '../Commons/NavBar/NavBar';

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
  myVideos: Array<VideoPostInfoWithUser>
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
            totalLikes={post.totalLikes} createdAt={post.createdAt} updatedAt={post.updatedAt} key={post.id} tags={post.tags} user={post.user}/>
          ))
        );
      case MyPageCategory.MY_FOLLOWER:
        return (<div>my follower</div>);
      case MyPageCategory.MY_FOLLOWEE:
        return (<div>my followee</div>);
    }
  }
 

  const MyInfoCard = (
    <div className="max-w-md mx-auto overflow-hidden">
      <div className="flex">
        <div className="w-full p-2 py-10">
          <div className="flex justify-center">
            <img src={userInfo.imagePath ? userInfo.imagePath : utils.defaultProfileImage} alt="test" className="rounded-full w-44 h-44"/>
          </div> 
          <div className="flex flex-col text-center mt-3 mb-4">
            <span className="text-2xl font-bold">{userInfo.nickname}</span>
          </div>
          <p className="px-8 text-center text-md text-gray-800 mb-4">{userInfo.aboutMe}</p>
          <ModifyInfoModal id={userInfo.id} email={userInfo.email} nickname={userInfo.nickname} 
          imagePath={userInfo.imagePath} aboutMe={userInfo.aboutMe}/>
        </div>
      </div>
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

  const options: Array<NavOption> = [
    { label: "내 영상", eventKey: "my_video", onClickHandler: () => loadMyVideo(myVideosState.pageToken) },
    { label: "팔로워", eventKey: "my_follower", onClickHandler: () => handleMyFollower() },
    { label: "팔로윙", eventKey: "my_followee", onClickHandler: () => handleMyFollowee() }
  ]

  return (
    <div className="container mx-auto">
      {MyInfoCard}
      <NavBar navOptions={options}/>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {getContent(myPageState)} 
      </div>
    </div>
  );
}

export default withRouter(MyPage);
