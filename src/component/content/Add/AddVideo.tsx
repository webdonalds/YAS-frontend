import React, { useEffect } from "react";
import AddVideoHook from "../../../hooks/AddVideo";

import "./AddVideo.css";

const getYoutubeThumbnailUrl = (id: string) => {
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}

const AddVideo: React.FC = () => {
  const { id, url, title, description, tags, init, setUrl, setTitle, setDescription } = AddVideoHook();

  useEffect(init, []);

  // TODO: implement debounce
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const urlInput = (
    <div className="add-video-input-container">
      <span className="badge bg-primary">url</span>
      <input name="url" value={url} onChange={handleUrlChange}/>
    </div>
  );

  // is memoization needed?
  const thumbnailView = (id != "") ? (<div className="add-video-thumbnail-container">
    <img src={getYoutubeThumbnailUrl(id)} />
  </div>) : (<div className="add-video-thumbnail-container">
    empty
  </div>);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const titleInput = (
    <div className="add-video-input-container">
      <span className="badge bg-primary">제목</span>
      <input name="title" value={title} onChange={handleTitleChange}/>
    </div>
  );

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const descriptionInput = (
    <div className="add-video-input-container">
      <span className="badge bg-primary">설명</span>
      <input name="description" value={description} onChange={handleDescriptionChange}/>
    </div>
  );

  return (<div className="add-video-container">
    {urlInput}
    {thumbnailView}
    {titleInput}
    {descriptionInput}
  </div>);
}

export default AddVideo;