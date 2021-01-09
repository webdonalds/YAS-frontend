import React, { useEffect, useState } from "react";
import AddVideoHook from "../../../hooks/AddVideo";

import AddVideoModal from "./AddVideoModal";
import { FaTimes } from 'react-icons/fa';
import "./AddVideo.css";

const getYoutubeThumbnailUrl = (id: string) => {
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}
const getThumbnailUrl = (id: string) => {
  return `https://www.youtube.com/watch?v=${id}`
}
const maxTagCount = 5;

const AddVideo: React.FC = () => {
  const { id, url, title, description, tags, init, setUrl, setTitle, setDescription, addTag, deleteTag } = AddVideoHook();
  const [tag, setTag] = useState("");

  // mount될 때만 init함수가 실행되도록 하고 싶어서 lint warning을 없앴습니다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(init, []);

  // TODO: implement debounce
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const urlInput = (
    <div className="add-video-input-container">
      <span className="badge bg-primary">링크</span>
      <input name="url" value={url} onChange={handleUrlChange}/>
    </div>
  );

  // is memoization needed?
  const thumbnailView = (id != "") ? (<div className="add-video-thumbnail-container">
    <img src={getYoutubeThumbnailUrl(id)} />
  </div>) : (<div className="add-video-thumbnail-container">
    <div>
      <FaTimes className="add-video-thumbnail-times" />
    </div>
    <div className="add-video-thumbnail-text">
      완전한 유튜브 링크를 입력해주세요.
    </div>
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

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  }
  const handleTagInput = (e: React.KeyboardEvent) => {
    if(e.key == " ") {
      e.preventDefault();
    }
    if(e.key == "Enter" || e.key == " ") {
      if(tag == "") {
        return;
      }
      if(tags.some((val) => (val==tag))) {
        alert("같은이름의 태그가 존재합니다.");
        return;
      }
      if(tags.length >= maxTagCount) {
        alert("태그는 5개까지 등록이 가능합니다.");
        return;
      }
      addTag(tag);
      setTag("");
    }
  }

  const setVideo = (id: string) => {
    setUrl(getThumbnailUrl(id));
  }

  const tagsInput = (
    <div className="add-video-input-container">
      <span className="badge bg-primary">태그</span>
      <input name="tags" value={tag} onChange={handleTagChange} onKeyPress={handleTagInput}/>
    </div>
  );

  const tagInput = (tag: string, idx: number) => {
    return (<div key={idx} className="add-video-tag-container">
      {tag} <FaTimes className="add-video-tag-delete" onClick={()=>{deleteTag(tag)}} />
    </div>);
  };

  return (<div className="add-video-container">
    <AddVideoModal setVideo={setVideo}/>
    {urlInput}
    {thumbnailView}
    {titleInput}
    {descriptionInput}
    {tagsInput}
    <div className="add-video-tags-container">
      {tags.map((tag, idx) => tagInput(tag, idx))}
    </div>
    <button type="button" className="btn btn-success add-video-submit-button">등록</button>
  </div>);
}

export default AddVideo;