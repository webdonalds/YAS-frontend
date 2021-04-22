import React, { useState } from "react";
import { Link } from "react-router-dom";
import utils from "../../../../service/utils";
import "./VideoPostCard.css";


type DropDownState = {
  showDropDown: boolean
}

const VideoPostCard: React.FC<VideoPostInfoWithUser> = ( videoPost ) => {
  const videoThumbnailUrl = utils.getYoutubeThumbnailUrl(videoPost.videoId);
  
  const [ dropDownState, setDropDownState ] = useState<DropDownState>({
    showDropDown: false
  });

  const getTagView = (tag: string, idx: number) => {
    return (
      <span key={idx} className="inline-block bg-gray-200 rounded-full px-1 py-0.5 text-xs font-semibold text-gray-700 mr-1">
        #{tag}
      </span>
    )
  };

  const tagsView = (
    <div className="pt-2">
      {videoPost.tags.map((tag, idx) => getTagView(tag.tagName, idx))}
    </div>
  );

  const handleDropDown = () => {
    setDropDownState({
      showDropDown: !dropDownState.showDropDown
    })
  }

  const dropDown = (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <div className="py-1" role="none">
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Follow uploader</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Add to my playlist</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Hello!</a>
      </div>
    </div>
  )

  return (
    <div className="rounded shadow-lg">
      <Link to={"/video/" + videoPost.id} style={{ textDecoration: 'none', color: 'black'}}>
        <img className="w-full" src={videoThumbnailUrl}/>
      </Link>
      <div className="px-2 py-2 h-44 relative">
        <div className="inline-block align-top w-2/12 mr-1">
          <img className="rounded-full h-10 w-10 object-cover cursor-pointer" src={videoPost.user.imagePath  ? videoPost.user.imagePath : utils.defaultProfileImage}/>
        </div>
        <div className="inline-block align-top w-9/12">
          <Link to={"/video/" + videoPost.id} style={{ textDecoration: 'none', color: 'black'}}>
            <div className="pl-1 text-base font-semibold inline-block max-h-10 overflow-hidden w-full leading-tight">{videoPost.title}</div>
          </Link>
          <div className="text-gray-700 text-sm font-semibold">
            <p>{videoPost.user.nickname}</p>
            <p>{videoPost.createdAt.toString().split('T')[0]} &#183; {videoPost.totalLikes} likes </p>
          </div>
        </div>
        <div className="absolute top-3 right-0 z-10 cursor-pointer" onClick={handleDropDown}>
          <svg className="w-6 fill-current text-gray-400 hover:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
          {dropDownState.showDropDown ? dropDown : null}
        </div>
        {tagsView}
      </div>
    </div>
  );
}

export default VideoPostCard;