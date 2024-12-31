import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideo, getComments, addComment, updateComment, deleteComment } from '../apiService';
import YouTubePlayer from '../Components/YoutubePlayer';

function Video() {
  const userName=localStorage.getItem('username');
  const token=localStorage.getItem('token');
  const { id: videoId } = useParams(); // Get videoId from URL parameters
  const [video, setVideo] = useState(null); // State to store video data
  const [comments, setComments] = useState([]); // State to store comments
  const [text, setText] = useState(""); // State for new comment text
  const [editingCommentId, setEditingCommentId] = useState(null); // State for editing comment
  const [editedText, setEditedText] = useState(""); // State for edited comment text
  const [showMore, setShowMore] = useState(false); // Toggle description visibility

  // Fetch video and comments when the component is mounted
  useEffect(() => {
    const loadVideo = async () => {
      try {
        const response = await fetchVideo(videoId);
        setVideo(response.data); // Set video data
      } catch (error) {
        console.error('Failed to load video:', error);
      }
    };

    const loadComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/get-comment');
        const data=await response.json();
        console.log("data received",data)
        setComments(data); // Set comments data
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    };

    loadVideo();
    loadComments();
  }, [videoId]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    console.log('userName',userName)
    try {
      const response = await fetch('http://localhost:3000/post-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  userName: userName,content:text}),
      })
      const dataPost=await response.json();
      console.log("data_post", dataPost.data)

      setComments([dataPost.data, ...comments]); // Add new comment to the list
      setText(""); // Clear comment input
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (id) => {
    try {
      console.log("id id",id)
      await fetch(`http://localhost:3000/delete-comment/${id}`,{
        method: 'DELETE',
      }); // Delete comment by ID
      setComments(comments.filter(comment => comment._id !== id)); // Remove deleted comment from state
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  // Handle editing a comment
// Function to handle the Edit button click
const handleEditClick = (id, text) => {
  setEditingCommentId(id); // Set the comment being edited
  setEditedText(text); // Set the current comment text in the input field
};

// Function to handle the save action when the comment is edited
const handleSaveEdit = async (id) => {
  try {
    const updatedComment = { content: editedText }; // Create updated content object
    const response = await fetch(`http://localhost:3000/update-comment/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedComment),
    });

    const data = await response.json();
    // After a successful update, update the local state
    setComments(comments.map(comment =>
      comment._id === id ? { ...comment, content: editedText } : comment
    ));

    setEditingCommentId(null); // Reset editing mode
    setEditedText(""); // Clear the input field
  } catch (error) {
    console.error('Failed to update comment:', error);
  }
};

// Function to handle cancel action when the user decides not to edit the comment
const handleCancelEdit = () => {
  setEditingCommentId(null); // Reset editing mode
  setEditedText(""); // Clear the input field
};


  // Handle toggling the description visibility
  const handleToggleDescription = () => {
    setShowMore(!showMore);
  };

  if (!video) {
    return <div>Loading...</div>; // Show loading state until video is loaded
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="video-section bg-white shadow-lg rounded-lg overflow-hidden">
      <YouTubePlayer videoId={video.videoUrl} />

        <div className="p-4">
          <h2 className="video-title text-2xl font-semibold my-4">{video.title}</h2>

          <div className="video-info flex justify-between items-center text-gray-600 mb-4">
            <span>{video.views} views • 2 years ago</span>
            <div className="video-actions flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-600">
                <span>👍</span>
                <span>{video.likes}</span>
              </button>
              <button className="text-gray-600">👎</button>
              <button className="text-gray-600">Share</button>
              <button className="text-gray-600">Download</button>
            </div>
          </div>

          <div className="video-description my-6 text-gray-700">
            <p>
              {showMore ? video.description : `${video.description.slice(0, 100)}...`}
              <button
                className="show-more-button text-blue-600 hover:underline"
                onClick={handleToggleDescription}
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </p>
          </div>


         
          <div className="comments-section mt-8">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            {token?<div className="add-comment flex items-center space-x-4 mb-4">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Comment
              </button>
            </div>: <span className='text-red-400 w-[100%] flex justify-center p-3 text-2xl  font-bold'>Please Login to Add Comments</span>}
           

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment._id} className="comment-item flex space-x-4 mb-6 border-b pb-4">
                <div className="comment-content flex-1">
                  <div className="comment-header flex justify-between items-center">
                    <span className="username font-semibold">{comment.userName}</span>
                  </div>
              
                  {/* Conditionally show either the comment content or the input for editing */}
                  {editingCommentId === comment._id ? (
                    <div>
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSaveEdit(comment._id)}
                        className="text-blue-600 ml-2  mr-1 hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-500 hover:underline ml-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>{comment.content}</span>
                    </div>
                  )}
              
                  <div className="comment-actions mt-2 flex space-x-4 text-gray-600">
                    <button className="text-gray-500 hover:text-gray-700">👍</button>
                    <button className="text-gray-500 hover:text-gray-700">👎</button>
                    {comment.userName === userName && (
                      <>
                        <button
                          onClick={() => handleEditClick(comment._id, comment.content)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;