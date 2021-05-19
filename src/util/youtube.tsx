import React from "react";

const getYoutubeIframeContainer = (id: string): JSX.Element => (
  <div className="relative max-w-full h-0 overflow-hidden pb-1/2">
    <iframe src={`https://www.youtube.com/embed/${id}`}
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
          title='video'
          className='absolute top-0 left-0 w-full h-full'
    />
  </div>
);

const getYoutubeUrl = (id: string): string => {
  return `https://www.youtube.com/watch?v=${id}`
}

export {
  getYoutubeIframeContainer,
  getYoutubeUrl
};