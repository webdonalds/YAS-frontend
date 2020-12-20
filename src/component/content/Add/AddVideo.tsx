import React, { useEffect } from "react";
import AddVideoHook from "../../../hooks/AddVideo";

const AddVideo: React.FC = () => {
  const { url, title, description, init, setUrl, setTitle, setDescription } = AddVideoHook();

  useEffect(() => {
    init();
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const urlInput = (
    <div>
      <span className="badge bg-primary">url</span>
      <input name="url" value={url} onChange={handleUrlChange}/>
    </div>
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const titleInput = (
    <div>
      <span className="badge bg-primary">제목</span>
      <input name="title" value={title} onChange={handleTitleChange}/>
    </div>
  );

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const descriptionInput = (
    <div>
      <span className="badge bg-primary">설명</span>
      <input name="description" value={description} onChange={handleDescriptionChange}/>
    </div>
  );

  return (<div>
    {urlInput}
    {titleInput}
    {descriptionInput}
  </div>);
}

export default AddVideo;