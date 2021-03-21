import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../../service/utils";
import "./VideoPostCard.css";


const VideoPostCard: React.FC<VideoPostInfoWithUser> = ( videoPost ) => {
  const videoThumbnailUrl = utils.getYoutubeThumbnailUrl(videoPost.videoId);
  
  const getTagView = (tag: string, idx: number) => {
    return (
      <span key={idx} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        #{tag}
      </span>
    )
  };

  const tagsView = (
    <div className="px-6 pt-4 pb-2">
      {videoPost.tags.map((tag, idx) => getTagView(tag.tagName, idx))}
    </div>
  );

  return (
    <Link to={"/video/" + videoPost.id} style={{ textDecoration: 'none', color: 'black'}}>
      <div className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src={videoThumbnailUrl}/>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{videoPost.title}</div>
          <p className="text-gray-700 text-base">
            {videoPost.description}
          </p>
        </div>
        {tagsView}
      </div>
    </Link>
  );
}

export default VideoPostCard;