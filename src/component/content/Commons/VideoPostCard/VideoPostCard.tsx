import React from "react";
import { Card } from "react-bootstrap";
import { FaTag, FaThumbsUp } from "react-icons/fa";
import utils from "../../../../service/utils"

import "./VideoPostCard.css";


const VideoPostCard: React.FC<VideoPostInfoWithUser> = ( videoPost ) => {

  const videoThumbnailUrl = utils.getYoutubeThumbnailUrl(videoPost.videoId);
  
  const getTagView = (tag: string, idx: number) => {
    return (<span key={idx} className="video-tag">
      {tag}
    </span>);
  };

  const tagsView = (
    <Card.Text>
      <FaTag />
      {videoPost.tags.map((tag, idx) => getTagView(tag.tagName, idx))}
    </Card.Text>
  );


  return (
    <Card style={{ width: '18rem', flexDirection: 'row' }}>
      <Card.Img variant="top" src={videoThumbnailUrl}/>
      <Card.Body style={{width: "100rem"}}>
        <Card.Title>{videoPost.title} - post by {videoPost.user.nickname}</Card.Title>
        <Card.Body>
          <Card.Text>{videoPost.description}</Card.Text>
          <Card.Text>{videoPost.createdAt}</Card.Text>
          <Card.Text><FaThumbsUp/>{videoPost.totalLikes}</Card.Text>
          {tagsView}
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default VideoPostCard;