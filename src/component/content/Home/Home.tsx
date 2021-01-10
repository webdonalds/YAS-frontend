import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import VideoPostCard from "../Commons/VideoPostCard/VideoPostCard";
import { getRecentVideoPosts, getHotVideoPosts } from '../../../api/home';
import { Nav } from 'react-bootstrap';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import "./Home.css";

enum VideoPostCategory {
  RECENT_POSTS,
  HOT_POSTS
}


type VideoPostsState = {
  postCategory: VideoPostCategory,
  videoPosts: Array<videoPostInfo>
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

  // handle end of the scroll : for infinite scroll
  useBottomScrollListener(loadMoreVideo);
  
  return (
    <div className="home_container">
      <div className="home_content">
        <Nav variant="pills" defaultActiveKey="recent">
          <Nav.Item>
            <Nav.Link eventKey="recent" onClick={() => handleRecentVideoPostList(null)}>최신 영상</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="hot" onClick={handleHotVideoPostList}>인기 영상</Nav.Link>
          </Nav.Item>
        </Nav>

        <div className="home_video_list_container">
          {
            videoPostsState.videoPosts.map(post => (
              <VideoPostCard id={post.id} title={post.title} userId={post.userId} videoId={post.videoId} description={post.description} 
              totalLikes={post.totalLikes} createdAt={post.createdAt} updatedAt={post.updatedAt} key={post.id}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}
export default withRouter(Home);
