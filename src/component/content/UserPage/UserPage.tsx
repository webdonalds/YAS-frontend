import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import GetLogin from "../../../hooks/GetLogin";
import utils from "../../../service/utils";
import { match } from "react-router-dom";
import { getUserVideos, getUserFollowers, getUserFollowees, getIsFollowing, followUser, unfollowUser } from '../../../api/userPage';
import { getUserInfo } from '../../../api/user';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import NavBar, { NavOption } from '../Commons/NavBar/NavBar';

import ModifyInfoModal from "./ModifyInfoModal/ModifyInfoModal"
import VideoPostCard from '../Commons/VideoPostCard/VideoPostCard';
import FollowCard from '../Commons/FollowCard/FollowCard';

type UserPagePathVariable = {
  userId: string
};

type UserPageProps = {
  match: match<UserPagePathVariable>
};

enum UserPageCategory {
  USER_VIDEO,
  USER_FOLLOWER,
  USER_FOLLOWEE
}

type UserPageState = {
  userPageCategory: UserPageCategory,
  isMyPage: boolean|null,
  userInfo: UserData,
  isFollowing: boolean|null
}

type UserVideosState = {
  userVideos: Array<VideoPostInfoWithUser>,
  pageToken: number|null
}

type UserFollowsState = {
  follows: Array<FollowInfo>,
  pageToken: number|null
}

const dummyUser: UserData = {
  aboutMe: "null",
  email: "null",
  id: -1,
  imagePath: null,
  nickname: "null"
}

const UserPage: React.FC<UserPageProps> = (props) => {
  const loginUserInfo = GetLogin().userInfo;
  const { match } = props;

  const [ userPageState, setUserPageState ] = useState<UserPageState>({
    userPageCategory: UserPageCategory.USER_VIDEO,
    isMyPage: null,
    userInfo: dummyUser,
    isFollowing: null
  });

  const [ userVideosState, setUserVideosState ] = useState<UserVideosState>({
    userVideos: [],
    pageToken: null
  });

  const [ userFollowersState, setUserFollowersState ] = useState<UserFollowsState>({
    follows: [],
    pageToken: null
  });

  const [ userFolloweesState, setUserFolloweesState ] = useState<UserFollowsState>({
    follows: [],
    pageToken: null
  });

  // Init my videos
  useEffect(() => {
    if(loginUserInfo != null) initUserPageState(parseInt(match.params.userId), loginUserInfo.id);
  }, [match]); // eslint-disable-line react-hooks/exhaustive-deps

  const initUserPageState = async (userId:number, loginUserId:number) => {
    const userInfoResponse = await getUserInfo(userId);

    if('error' in userInfoResponse){
      alert(userInfoResponse.error.message);
      return;
    }

    const isFollowingResponse = await getIsFollowing(userId, loginUserId);

    if('error' in isFollowingResponse){
      alert(isFollowingResponse.error.message);
      return;
    }

    setUserPageState({
      ...userPageState,
      userInfo: userInfoResponse,
      isFollowing: isFollowingResponse.isFollowing,
      userPageCategory: UserPageCategory.USER_VIDEO,
      isMyPage: loginUserInfo != null && loginUserInfo.id == userId ? true : false
    });

    const userVideosResponse = await getUserVideos(userId, null);

    if('error' in userVideosResponse){
      alert(userVideosResponse.error.message);
      return;
    }

    const userFollowersResponse = await getUserFollowers(userId, null);
    
    if('error' in userFollowersResponse){
      alert(userFollowersResponse.error.message);
      return;
    }

    const userFolloweesResponse = await getUserFollowees(userId, null);
    
    if('error' in userFolloweesResponse){
      alert(userFolloweesResponse.error.message);
      return;
    }
    
    setUserVideosState({userVideos: userVideosResponse.videoList, pageToken: userVideosResponse.pageToken});
    setUserFollowersState({follows: userFollowersResponse.follows, pageToken: userFollowersResponse.pageToken});
    setUserFolloweesState({follows: userFolloweesResponse.follows, pageToken: userFolloweesResponse.pageToken});
  }


  const loadMoreContents = () => {
    switch(userPageState.userPageCategory){
      case UserPageCategory.USER_VIDEO:
        loadUserVideo(userVideosState.pageToken);
        break;
      case UserPageCategory.USER_FOLLOWER:
        loadUserFollower(userFollowersState.pageToken);
        break;
      case UserPageCategory.USER_FOLLOWEE:
        loadUserFollowee(userFolloweesState.pageToken);
        break;
      default:
        break;
    }
  }

  // handle end of the scroll
  useBottomScrollListener(loadMoreContents);

  if(loginUserInfo == null) {
    alert("로그인이 필요한 페이지입니다.");
    return <Redirect to="/"/>;
  }
  
  const getContent = (state: UserPageState) => {
    switch(state.userPageCategory){
      case UserPageCategory.USER_VIDEO:
        return (
          userVideosState.userVideos.map(post => (
            <VideoPostCard id={post.id} title={post.title} userId={post.userId} videoId={post.videoId} description={post.description} 
            totalLikes={post.totalLikes} createdAt={post.createdAt} updatedAt={post.updatedAt} key={post.id} tags={post.tags} user={post.user}/>
          ))
        );
      case UserPageCategory.USER_FOLLOWER:
        return (
          userFollowersState.follows.map(follow => (
            <FollowCard id={follow.id} imagePath={follow.imagePath} nickname={follow.nickname} aboutMe={follow.aboutMe} key={follow.id}/>
          ))
        );
      case UserPageCategory.USER_FOLLOWEE:
        return (
          userFolloweesState.follows.map(follow => (
            <FollowCard id={follow.id} imagePath={follow.imagePath} nickname={follow.nickname} aboutMe={follow.aboutMe} key={follow.id}/>
          ))
        );
    }
  }
 
  const followButtonClass = "bg-purple-400 text-lg px-4 py-2 text-white font-bold border border-gray-400 rounded relative "

  const onChangeFollow = async () => {
    let response;
    
    if(userPageState.isFollowing){
      response = await unfollowUser(userPageState.userInfo.id);
    } else{
      response = await followUser(userPageState.userInfo.id);
    }

    if('error' in response){
      alert("팔로우/언팔로우 실패하였습니다.");
      return;
    }

    setUserPageState({
      ...userPageState,
      isFollowing: !userPageState.isFollowing
    })
  }

  const followButton = (
    <div className="mt-5 text-center">
      <button type="button" className={followButtonClass} onClick={onChangeFollow}>{userPageState.isFollowing ? "팔로우 취소" : "팔로우"}</button>
    </div>
  )
  

  const UserInfoCard = (
    <div className="max-w-md mx-auto overflow-hidden">
      <div className="flex">
        {
          userPageState.userInfo ? 
          <div className="w-full p-2 py-10">
            <div className="flex justify-center">
              <img src={userPageState.userInfo.imagePath ? userPageState.userInfo.imagePath : utils.defaultProfileImage} alt="test" className="rounded-full w-44 h-44"/>
            </div> 
            <div className="flex flex-col text-center mt-3 mb-4">
              <span className="text-2xl font-bold">{userPageState.userInfo.nickname}</span>
            </div>
            <p className="px-8 text-center text-md text-gray-800 mb-4">{userPageState.userInfo.aboutMe}</p>
            {
              userPageState.isMyPage ? 
                <ModifyInfoModal id={userPageState.userInfo.id} email={userPageState.userInfo.email} nickname={userPageState.userInfo.nickname} 
                imagePath={userPageState.userInfo.imagePath} aboutMe={userPageState.userInfo.aboutMe}/> 
                : followButton
            }
          </div> 
          : null
        }
      </div>
    </div>
  )


  const loadUserVideo = async (pageToken:number|null) => {
    setUserPageState({...userPageState, userPageCategory: UserPageCategory.USER_VIDEO, });

    if(userPageState.userInfo==null) return;

    const response = await getUserVideos(userPageState.userInfo.id, pageToken);

    if('error' in response){
      alert(response.error.message);
      return;
    }

    if(pageToken==null){
      setUserVideosState({
        userVideos: response.videoList,
        pageToken: response.pageToken
      });
    } 
    else{
      setUserVideosState({
        userVideos: userVideosState.userVideos.concat(response.videoList),
        pageToken: response.pageToken
      });
    }
  };

  const loadUserFollower = async (pageToken:number|null) => {
    setUserPageState({...userPageState, userPageCategory: UserPageCategory.USER_FOLLOWER});

    if(userPageState.userInfo==null) return;

    const response = await getUserFollowers(userPageState.userInfo.id, pageToken);
    
    if('error' in response){
      alert(response.error.message);
      return;
    }

    if(pageToken==null){
      setUserFollowersState(response)
    } 
    else{
      setUserFollowersState({
        follows: userFollowersState.follows.concat(response.follows),
        pageToken: response.pageToken
      })
    }
  }

  const onNavClick = (userPageCategory: UserPageCategory) => {
    setUserPageState({...userPageState, userPageCategory: userPageCategory});
  }

  const loadUserFollowee = async (pageToken:number|null) => {
    setUserPageState({...userPageState, userPageCategory: UserPageCategory.USER_FOLLOWEE});

    if(userPageState.userInfo==null) return;
    
    const response = await getUserFollowees(userPageState.userInfo.id, pageToken);
    
    if('error' in response){
      alert(response.error.message);
      return;
    }

    if(pageToken==null){
      setUserFolloweesState(response)
    } 
    else{
      setUserFolloweesState({
        follows: userFolloweesState.follows.concat(response.follows),
        pageToken: response.pageToken
      })
    }
  }

  const options: Array<NavOption> = [
    { label: "영상", eventKey: "user_video", onClickHandler: () => onNavClick(UserPageCategory.USER_VIDEO) },
    { label: "팔로워", eventKey: "user_follower", onClickHandler: () => onNavClick(UserPageCategory.USER_FOLLOWER) },
    { label: "팔로잉", eventKey: "user_followee", onClickHandler: () => onNavClick(UserPageCategory.USER_FOLLOWEE) }
  ]

  return (
    <div className="container mx-auto">
      {UserInfoCard}
      <div className="flex justify-center my-10">
        <NavBar navOptions={options}/>
      </div>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {getContent(userPageState)} 
      </div>
    </div>
  );
}

export default UserPage;
