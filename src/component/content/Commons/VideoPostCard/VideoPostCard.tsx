import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FaTag, FaThumbsUp, FaEdit, FaTrash } from "react-icons/fa";
import utils from "../../../../service/utils";
import GetLogin from "../../../../hooks/GetLogin";

import "./VideoPostCard.css";


const VideoPostCard: React.FC<VideoPostInfoWithUser> = ( videoPost ) => {
  const { userInfo } = GetLogin();

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

  const ownerButtons = (
    <Card.Text>
      <Link to={"/modify-video/" + videoPost.id}>
        <FaEdit/>
      </Link>
      <FaTrash/>
    </Card.Text>
  )


  return (
    <Link to={"/video/" + videoPost.id} style={{ textDecoration: 'none', color: 'black'}}>
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
        <Card.Body>
          {userInfo && userInfo.id == videoPost.userId ? ownerButtons : null }
        </Card.Body>
      </Card>
    </Link>
  );
}

export default VideoPostCard;