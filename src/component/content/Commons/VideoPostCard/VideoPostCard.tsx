import React from "react";
import { Card } from "react-bootstrap";

import "./VideoPostCard.css";

const getYoutubeThumbnailUrl = (id: string) => {
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}

const VideoPostCard: React.FC<videoPostInfo> = ( videoPost ) => {

  const videoThumbnailUrl = getYoutubeThumbnailUrl(videoPost.videoId);
  
  return (
    <Card style={{ width: '18rem', flexDirection: 'row' }}>
      <Card.Img variant="top" src={videoThumbnailUrl}/>
      <Card.Body>
        <Card.Title>{videoPost.title}</Card.Title>
        <Card.Text>
          <p>{videoPost.description}</p>
          <p>{videoPost.createdAt}</p>
          <p>{videoPost.totalLikes}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default VideoPostCard;