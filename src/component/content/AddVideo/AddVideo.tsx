import React, { useEffect, useState } from "react";
import VideoHook from "../../../hooks/Video";
import AddVideoModal from "./AddVideoModal";
import GetLogin from "../../../hooks/GetLogin";
import { FaTimes } from 'react-icons/fa';
import { PostVideoResponse ,postVideo, modifyVideo, deleteVideo } from "../../../api/addVideo";
import { maxTagCount, maxTagLength, titleMaxLength, titleMinLength, descriptionMaxLength, tagAllowedPattern } from "../../../constant/Addvideo";
import { match, Redirect } from "react-router-dom";
import { getYoutubeIframeContainer, getYoutubeUrl } from "../../../util/youtube";
import { BsTag } from "react-icons/bs";

type AddVideoPathVariable = {
  postId: string
};

type AddVideoProps = {
  isUpdate: boolean,
  match: match<AddVideoPathVariable>
};

const AddVideo: React.FC<AddVideoProps> = (props) => {
  const { userInfo } = GetLogin();
  const { initialized, id, url, title, description, tags, user, init, setUrl, setTitle, setDescription, addTag, deleteTag } = VideoHook();
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (props.isUpdate) {
      init(props.match.params.postId);
    } else {
      init(null);
    }
  }, [props.isUpdate, props.match.params.postId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (userInfo == null) {
    alert("로그인이 필요한 페이지입니다.");
    return <Redirect to="/" />;
  }
  if (props.isUpdate && initialized && user?.id != userInfo.id) {
    alert("본인의 계정만 수정 가능합니다.");
    return <Redirect to="/" />;
  }

  const setVideo = (id: string) => {
    setUrl(getYoutubeUrl(id));
  }
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const urlInput = (
    <div>
      <label className="inline-block text-2xl mr-2">링크</label>
      { props.isUpdate ? null : <AddVideoModal setVideo={setVideo} />}
      <div className="mt-1 relative rounded-md">
        <input type="text" name="url" value={url} onChange={handleUrlChange} disabled={props.isUpdate}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pt-1 pb-1 pl-2 pr-2 sm:text-lg border border-indigo-300 rounded-md" />
      </div>
    </div>
  );

  // is memoization needed?
  const thumbnailView = (id != "") ? (<div className="mt-3">
    {getYoutubeIframeContainer(id)}
  </div>) : (<div className="relative max-w-full h-0 overflow-hidden pb-1/2 text-gray-500 text-center">
    <div className="absolute top-0 left-0 w-full h-full">
      <FaTimes className="w-4/5 h-4/5 m-0 m-auto" />
      <div className="text-lg">완전한 유튜브 링크를 입력해주세요.</div>
    </div>
  </div>);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const titleInput = (
    <div className="mt-3">
      <label className="block text-2xl">제목</label>
      <div className="mt-1 relative rounded-md">
      <input name="title" value={title} onChange={handleTitleChange}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pt-1 pb-1 pl-2 pr-2 sm:text-lg border border-indigo-300 rounded-md" />
      </div>
    </div>
  );

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const descriptionInput = (
    <div className="mt-3">
      <label className="block text-2xl">설명</label>
      <div className="mt-1 relative rounded-md">
      <input name="description" value={description} onChange={handleDescriptionChange}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pt-1 pb-1 pl-2 pr-2 sm:text-lg border border-indigo-300 rounded-md" />
      </div>
    </div>
  );

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  }
  const handleTagInput = (e: React.KeyboardEvent) => {
    if (e.key == " ") {
      e.preventDefault();
    }
    if (e.key == "Enter" || e.key == " ") {
      if (tag == "") {
        return;
      }
      if (!tagAllowedPattern.test(tag)) {
        alert("태그에는 한글, 영어, 숫자만 입력 가능합니다.");
        return;
      }
      if (tag.length >= maxTagLength) {
        alert(`한 태그의 길이는 ${maxTagLength}자까지 가능합니다.`);
        return;
      }
      if (tags.some((val: string) => (val == tag))) {
        alert("같은이름의 태그가 존재합니다.");
        return;
      }
      if (tags.length >= maxTagCount) {
        alert(`태그는 ${maxTagCount}개까지 등록이 가능합니다.`);
        return;
      }
      addTag(tag);
      setTag("");
    }
  }

  const tagsInput = (
    <div className="mt-3">
      <label className="block text-2xl">태그</label>
      <div className="mt-1 relative rounded-md">
      <input name="tags" value={tag} onChange={handleTagChange} onKeyPress={handleTagInput}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pt-1 pb-1 pl-2 pr-2 sm:text-lg border border-indigo-300 rounded-md" />
      </div>
    </div>
  );

  const tagInput = (tag: string, idx: number) => {
    return (<div key={idx} className="inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-1 ml-2">
      {tag} <FaTimes className="inline-block cursor-pointer" onClick={() => { deleteTag(tag) }} />
    </div>);
  };

  const handleSubmit = async (): Promise<void> => {
    if (id == "") {
      alert("정상적인 유튜브 동영상을 입력해주세요.");
      return;
    }
    if (title == "") {
      alert("제목이 없습니다.");
      return;
    }
    if (title.length < titleMinLength || title.length > titleMaxLength) {
      alert(`제목은 ${titleMinLength}~${titleMaxLength}자까지 가능합니다.`);
      return;
    }
    if (description.length > descriptionMaxLength) {
      alert(`설명은 ${descriptionMaxLength}자까지 가능합니다.`);
      return;
    }

    // TODO: error handling
    let response: PostVideoResponse;
    if (props.isUpdate) {
      response = await modifyVideo(props.match.params.postId, title, description, tags);
    } else {
      response = await postVideo(id, title, description, tags);
    }
    if (!response.ok) {
      alert("알 수 없는 에러가 발생하였습니다.");
      return;
    }
    const postId = response.postId;

    // TODO: 동영상 페이지로 리다이렉트
    alert("등록이 완료되었습니다.");
  }

  const handleDelete = async () => {
    if (confirm("삭제 하시겠습니까?")) {
      const ok = await deleteVideo(props.match.params.postId);
      if (!ok) {
        alert("삭제에 실패했습니다. 다시 시도해 주세요.");
        return;
      }

      // TODO: 메인 페이지로 리다이렉트
      alert("삭제 되었습니다.");
    }
  };

  const tagList = (
    <div className="mt-3">
      <BsTag className="inline-block ml-3 mt-1 w-7 h-7"/>
      {tags.map((tag, idx) => tagInput(tag, idx))}
    </div>
  );

  let submitButton;
  if (props.isUpdate) {
    submitButton = (
      <div className="mt-5 text-center">
        <button type="button" className="hover:text-white hover:bg-red-500 text-red-500 font-bold py-2 px-12 mr-4 border-1 border-red-500 rounded relative" onClick={handleDelete}>삭제</button>
        <button type="button" className="bg-white text-gray-800 font-bold py-2 px-12 border border-gray-400 rounded relative" onClick={handleSubmit}>수정</button>
      </div>
    )
  } else {
    submitButton = (
      <div className="mt-5 text-center">
        <button type="button" className="bg-white hover:bg-gray-700 text-gray-800 font-bold py-2 px-12 border border-gray-400 rounded relative" onClick={handleSubmit}>등록</button>
      </div>
    );
  }

  return (<div className="m-0 m-auto w-120 max-w-full">
    {urlInput}
    {thumbnailView}
    {titleInput}
    {descriptionInput}
    {tagsInput}
    {tagList}
    {submitButton}
  </div>);
}

export default AddVideo;
