import React, { useEffect, useState } from "react";
import VideoHook from "../../../hooks/Video";
import AddVideoModal from "./AddVideoModal";
import GetLogin from "../../../hooks/GetLogin";
import { FaTimes } from 'react-icons/fa';
import "./AddVideo.css";
import { postVideo, modifyVideo, deleteVideo } from "../../../api/addVideo";
import { maxTagCount, maxTagLength, titleMaxLength, titleMinLength, descriptionMaxLength, tagAllowedPattern } from "../../../constant/Addvideo";
import { match, Redirect } from "react-router-dom";
import { getYoutubeiframe } from "../../../util/youtube";

const setYoutubeId = (id: string) => {
  return `https://www.youtube.com/watch?v=${id}`
}

type AddVideoPathVariable = {
  postId: string
};

type AddVideoProps = {
  isUpdate: boolean,
  match: match<AddVideoPathVariable>
};

const AddVideo: React.FC<AddVideoProps> = (props) => {
  const { userInfo } = GetLogin();
  const { id, url, title, description, tags, init, setUrl, setTitle, setDescription, addTag, deleteTag } = VideoHook();
  const [tag, setTag] = useState("");

  // mount될 때만 init함수가 실행되도록 하고 싶어서 lint warning을 없앴습니다.
  useEffect(() => {
    if(props.isUpdate) {
      init(props.match.params.postId);
    } else {
      init(null);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(userInfo == null) {
    alert("로그인이 필요한 페이지입니다.");
    return <Redirect to="/"/>;
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const urlInput = (
    <div className="add-video-input-container">
      <span className="badge bg-primary">링크</span>
      <input name="url" value={url} onChange={handleUrlChange} disabled={props.isUpdate} />
    </div>
  );

  // is memoization needed?
  const thumbnailView = (id != "") ? (<div className="add-video-thumbnail-container">
    {getYoutubeiframe(id)}
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
      if(!tagAllowedPattern.test(tag)) {
        alert("태그에는 한글, 영어, 숫자만 입력 가능합니다.");
        return;
      }
      if(tag.length >= maxTagLength) {
        alert(`한 태그의 길이는 ${maxTagLength}자까지 가능합니다.`);
        return;
      }
      if(tags.some((val: string) => (val==tag))) {
        alert("같은이름의 태그가 존재합니다.");
        return;
      }
      if(tags.length >= maxTagCount) {
        alert(`태그는 ${maxTagCount}개까지 등록이 가능합니다.`);
        return;
      }
      addTag(tag);
      setTag("");
    }
  }

  const setVideo = (id: string) => {
    setUrl(setYoutubeId(id));
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

  const handleSubmit = async (): Promise<void> => {
    if(id == "") {
      alert("정상적인 유튜브 동영상을 입력해주세요.");
      return;
    }
    if(title == "") {
      alert("제목이 없습니다.");
      return;
    }
    if(title.length < titleMinLength || title.length > titleMaxLength) {
      alert(`제목은 ${titleMinLength}~${titleMaxLength}자까지 가능합니다.`);
      return;
    }
    if(description.length > descriptionMaxLength) {
      alert(`설명은 ${descriptionMaxLength}자까지 가능합니다.`);
      return;
    }

    // TODO: error handling
    let ok = false;
    if(props.isUpdate) {
      ok = await modifyVideo(props.match.params.postId, title, description, tags);
      if(!ok) {
        alert("알 수 없는 에러가 발생하였습니다.");
        return;
      }
    } else {
      ok = await postVideo(id, title, description, tags);
      if(!ok) {
        alert("알 수 없는 에러가 발생하였습니다.");
        return;
      }
    }

    // TODO: 동영상 페이지로 리다이렉트
    alert("gooood");
  }

  const handleDelete = async () => {
    if(confirm("삭제 하시겠습니까?")) {
      const ok = await deleteVideo(props.match.params.postId);
      if(!ok) {
        alert("삭제에 실패했습니다. 다시 시도해 주세요.");
        return;
      }

      // TODO: 메인 페이지로 리다이렉트
      alert("삭제 되었습니다.");
    }
  };

  let submitButton;
  if(props.isUpdate) {
    submitButton = (
      <div>
        <button type="button" className="btn btn-danger add-video-submit-button" onClick={handleDelete}>삭제</button>
        <button type="button" className="btn btn-primary add-video-submit-button" onClick={handleSubmit}>수정</button>
      </div>
    )
  } else {
    submitButton = (
      <div>
        <button type="button" className="btn btn-success add-video-submit-button" onClick={handleSubmit}>등록</button>
      </div>
    );
  }

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
    { submitButton }
  </div>);
}

export default AddVideo;