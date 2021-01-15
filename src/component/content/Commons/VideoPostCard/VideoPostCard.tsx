import React from "react";
import { Card } from "react-bootstrap";
import utils from "../../../../service/utils"

import "./VideoPostCard.css";


const VideoPostCard: React.FC<videoPostInfo> = ( videoPost ) => {

  const videoThumbnailUrl = utils.getYoutubeThumbnailUrl(videoPost.videoId);
  
  return (
    <Card style={{ width: '18rem', flexDirection: 'row' }}>
      <Card.Img variant="top" src={videoThumbnailUrl}/>
      <Card.Body>
        <Card.Title>{videoPost.title}</Card.Title>
        <Card.Text>
          <p>{videoPost.id}</p>
          <p>{videoPost.description}</p>
          <p>{videoPost.createdAt}</p>
          <p>{videoPost.totalLikes}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default VideoPostCard;