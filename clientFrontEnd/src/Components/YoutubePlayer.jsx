
import React from 'react';

function YouTubePlayer({ videoId }) {
  console.log("VIDEO URL",videoId)
  // const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-container my-6">
      <iframe
        className="w-full h-64 md:h-[500px] rounded-md shadow-lg"
        src={videoId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YouTubePlayer;
