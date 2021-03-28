import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../service/utils";
import "./VideoPostCard.css";


const VideoPostCard: React.FC<VideoPostInfoWithUser> = ( videoPost ) => {
  const videoThumbnailUrl = utils.getYoutubeThumbnailUrl(videoPost.videoId);
  
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

  return (
    <Link to={"/video/" + videoPost.id} style={{ textDecoration: 'none', color: 'black'}}>
      <div className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src={videoThumbnailUrl}/>
        <div className="px-2 py-2 h-44">
          <div className="inline-block align-top w-2/12 mr-1">
            <img className="rounded-full h-10 w-10 object-cover cursor-pointer" src={videoPost.user.imagePath  ? videoPost.user.imagePath : utils.defaultProfileImage}/>
          </div>
          <div className="inline-block align-top w-9/12">
            <div className="text-base font-semibold inline-block max-h-10 overflow-hidden w-full leading-tight">{videoPost.title}</div>
            <div className="text-gray-700 text-sm font-semibold">
              <p>{videoPost.user.nickname}</p>
              <p>{videoPost.createdAt.toString().split('T')[0]} &#183; {videoPost.totalLikes} likes </p>
            </div>
          </div>
          {tagsView}
        </div>
      </div>
    </Link>
  );
}

export default VideoPostCard;