import React, { useEffect } from "react";
import { Link, match } from "react-router-dom";
import GetLogin from "../../../hooks/GetLogin";
import VideoHook from "../../../hooks/Video";
import { getYoutubeIframeContainer } from "../../../util/youtube";
import { BsTag, BsPencil } from 'react-icons/bs';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import LikeHook from "../../../hooks/Like";

type VideoPathVariable = {
  postId: string
};

type VideoProps = {
  match: match<VideoPathVariable>
};

const Video: React.FC<VideoProps> = (props) => {
  const { id, title, description, tags, user, totalLikes, init:videoInit, addLikes } = VideoHook();
  const { like:myLike, init:likeInit, setLike } = LikeHook();
  const postId = props.match.params.postId;
  const { userInfo } = GetLogin();
  const isMyVideo = user?.id == userInfo?.id;

  useEffect(() => {
    videoInit(postId);
    likeInit(postId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const titleView = (
    <div className="mt-4 font-sans font-bold text-3xl">
      <div className="inline-block">
        {title}
      </div>
      {
        isMyVideo
          ? <div className="float-right"><Link to={`/modify-video/${postId}`}><BsPencil className="cursor-pointer" /></Link></div>
          : null
      }
    </div>
  );

  const thumbnailView = (id != "") 
    ? <div className="mt-3">
        {getYoutubeIframeContainer(id)}
      </div>
    : null;

  const profileImagePath = (user != null && user.imagePath != null)
    ? user.imagePath
    : "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-%EB%82%A8%EC%84%B1%EC%9D%84%EC%9C%84%ED%95%9C-%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%B0%94%ED%83%80-%ED%94%84%EB%A1%9C%ED%95%84-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%9A%8C%EC%83%89-%EC%82%AC%EC%A7%84-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C-%EC%9E%90-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%B2%A1%ED%84%B0.jpg?ver=6"

  const userProfileView = (
    <div className="flex mt-6 mb-1 ml-auto mr-auto h-20">
      <div className="w-20 h-20">
        <img src={profileImagePath} />
      </div>
      <div className="flex flex-col justify-around ml-5">
        <div className="font-bold text-xl">
          {user!=null?user.nickname:null}
        </div>
        <div>
          {user!=null?user.aboutMe:null}
        </div>
      </div>
    </div>
  );

  const descriptionView = (
    <div className="pt-3 ml-auto mr-auto">
      <span className="ml-3">{description}</span>
    </div>
  );

  const getTagView = (tag: string, idx: number) => {
    return (<span key={idx} className="inline-block mt-2 ml-4 p-1 bg-gray-200 rounded-xl">
      {tag}
    </span>);
  };

  const getLikeView = () => {
    const iconClassName = "inline cursor-pointer w-5 h-5";
    const onClickEvent = () => {
      if(userInfo == null)  return;
      setLike(postId, !myLike);
      addLikes(myLike ? -1 : 1);
    }
    return (<div className="float-right">
      {myLike
        ? <FaThumbsUp className={iconClassName} onClick={onClickEvent} />
        : <FaRegThumbsUp className={iconClassName} onClick={onClickEvent} />}
      <div className="inline-block ml-3">
        {totalLikes}
      </div>
    </div>);
  };

  const infoView = (
    <div className="mt-4 ml-auto mr-auto">
      <BsTag className="inline-block ml-3 w-7 h-7"/>
      {tags.map((tag, idx) => getTagView(tag, idx))}
      {getLikeView()}
    </div>
  );

  return (<div className="m-0 m-auto w-192 max-w-9/10">
    {titleView}
    {thumbnailView}
    <div className="divide-y divide-fuchsia-400">
      {userProfileView}
      {descriptionView}
    </div>
    {infoView}
  </div>);
}

export default Video;
