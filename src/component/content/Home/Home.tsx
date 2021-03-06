import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import VideoPostCard from "../Commons/VideoPostCard/VideoPostCard";
import { getRecentVideoPosts, getHotVideoPosts } from '../../../api/home';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import NavBar, { NavOption } from '../Commons/NavBar/NavBar';

import "./Home.css";

enum VideoPostCategory {
  RECENT_POSTS,
  HOT_POSTS
}

type VideoPostsState = {
  postCategory: VideoPostCategory,
  videoPosts: Array<VideoPostInfoWithUser>
  pageToken: number|null
}

const Home: React.FC<RouteComponentProps> = () => {
  const [videoPostsState, setVideoPostsState ] = useState<VideoPostsState>({
    postCategory: VideoPostCategory.RECENT_POSTS,
    videoPosts: [],
    pageToken: null
  });

  // Init with recent posts.
  useEffect(() => {
    handleRecentVideoPostList(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

  const handleRecentVideoPostList = async (pageToken:number|null) => {
    const response = await getRecentVideoPosts(pageToken);
    if(pageToken==null){
      setVideoPostsState({
        postCategory: VideoPostCategory.RECENT_POSTS,
        videoPosts: response.videoList,
        pageToken: response.pageToken
      });
    } 
    else{
      setVideoPostsState({
        postCategory: VideoPostCategory.RECENT_POSTS,
        videoPosts: videoPostsState.videoPosts.concat(response.videoList),
        pageToken: response.pageToken
      });
    }
  }


  const handleHotVideoPostList = async () => {
    const response = await getHotVideoPosts();
    
    setVideoPostsState({
      postCategory: VideoPostCategory.HOT_POSTS,
      videoPosts: response.videoList,
      pageToken: null
    })
  }


  const loadMoreVideo = () => {
    switch(videoPostsState.postCategory){
      case VideoPostCategory.RECENT_POSTS:
        handleRecentVideoPostList(videoPostsState.pageToken);
        break;
      
      case VideoPostCategory.HOT_POSTS:
        break;
    }
  }

  const options: Array<NavOption> = [
    {
      label: "최신 영상", eventKey: "recent", onClickHandler: () => handleRecentVideoPostList(null)
    },
    { 
      label: "인기 영상", eventKey: "hot", onClickHandler: () => handleHotVideoPostList()
    }
  ]

  // handle end of the scroll : for infinite scroll
  useBottomScrollListener(loadMoreVideo);
  
  return (
    <div className="container mx-auto">
      <NavBar navOptions={options}/>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {
          videoPostsState.videoPosts.map(post => (
            <VideoPostCard id={post.id} title={post.title} userId={post.userId} videoId={post.videoId} description={post.description} 
            totalLikes={post.totalLikes} createdAt={post.createdAt} updatedAt={post.updatedAt} tags={post.tags} key={post.id} user={post.user}/>
          ))
        }
      </div>
    </div>
  );
}
export default withRouter(Home);
