import React, { useEffect } from "react";
import { FaTag } from "react-icons/fa";
import { match } from "react-router-dom";
import VideoHook from "../../../hooks/Video";
import { getYoutubeiframe } from "../../../util/youtube";
import "./Video.css";

type VideoPathVariable = {
  postId: string
};

type VideoProps = {
  match: match<VideoPathVariable>
};

const Video: React.FC<VideoProps> = (props) => {
  const { id, title, description, tags, user, init } = VideoHook();

  useEffect(() => {
    init(props.match.params.postId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const titleView = (
    <div className="mt-4 font-sans font-bold text-3xl">
      {title}
    </div>
  );

  const thumbnailView = (id != "") ? (<div className="video-thumbnail-container">{getYoutubeiframe(id)}</div>) : (<div></div>);

  const profileImagePath = (user != null && user.imagePath != null)
    ? user.imagePath
    : "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-%EB%82%A8%EC%84%B1%EC%9D%84%EC%9C%84%ED%95%9C-%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%B0%94%ED%83%80-%ED%94%84%EB%A1%9C%ED%95%84-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%9A%8C%EC%83%89-%EC%82%AC%EC%A7%84-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C-%EC%9E%90-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%B2%A1%ED%84%B0.jpg?ver=6"

  const userProfileView = (
    <div className="video-user-profile-container">
      <div className="video-user-profile-image-container">
        <img src={profileImagePath} />
      </div>
      <div className="video-user-profile-text-container">
        <div>
          {user!=null?user.nickname:null}
        </div>
        <div>
          {user!=null?user.aboutMe:null}
        </div>
      </div>
    </div>
  );

  const descriptionView = (
    <div className="video-description-container">
      <span>{description}</span>
    </div>
  );

  const getTagView = (tag: string, idx: number) => {
    return (<span key={idx} className="video-tag">
      {tag}
    </span>);
  };

  const tagsView = (
    <div className="video-tags-container">
      <FaTag />
      {tags.map((tag, idx) => getTagView(tag, idx))}
    </div>
  );

  return (<div className="video-container">
    {titleView}
    {thumbnailView}
    {userProfileView}
    {descriptionView}
    {tagsView}
  </div>);
}

export default Video;