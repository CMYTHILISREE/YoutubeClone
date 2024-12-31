import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import YouTubePlayer from '../Components/YoutubePlayer';

function VideoCard({ video, loggedInUser, Allvideo }) {
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  // Cleanup hoverTimeout on unmount or on hoverTimeout change
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const handleMouseEnter = (videoId) => {
    const timeout = setTimeout(() => setHoveredVideoId(videoId), 2000);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    setHoveredVideoId(null);
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  return (
    <Link
      to={`/video/${video._id}`}
      state={{ loggedInUser, Allvideo }}
      className="video-card flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => handleMouseEnter(video._id)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-w-16 aspect-h-9">
        {hoveredVideoId === video._id ? (
          <YouTubePlayer videoId={video.videoUrl} />
        ) : (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="thumbnail w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600">{video.channelName}</p>
        <span className="text-xs text-gray-500">{video.views} views</span>
      </div>
    </Link>
  );
}

export default VideoCard;
