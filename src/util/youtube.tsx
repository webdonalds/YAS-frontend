import React from "react";

const getYoutubeiframe = (id: string): JSX.Element => (
  <iframe src={`https://www.youtube.com/embed/${id}`}
        frameBorder='0'
        allow='autoplay; encrypted-media'
        allowFullScreen
        title='video'
        className='add-video-youtube-video'
  />
);

const getYoutubeUrl = (id: string): string => {
  return `https://www.youtube.com/watch?v=${id}`
}

export {
  getYoutubeiframe,
  getYoutubeUrl
};