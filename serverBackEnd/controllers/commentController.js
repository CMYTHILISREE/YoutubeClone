import Comment from '../model/commentSchema.js'; // Ensure proper capitalization for the model import
import Video from '../model/videoSchema.js'; // Ensure proper capitalization for the model import

// Add a new comment
export const addComment = async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;

  try {
    const newComment = new Comment({
      text,
      userId: req.user.id, // `req.user.id` comes from the auth middleware
      videoId,
    });

    const savedComment = await newComment.save();

    // Add the comment to the video's comments array
    await Video.findByIdAndUpdate(
      videoId,
      { $push: { comments: savedComment._id } },
      { new: true } // Return the updated document
    );

    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Error adding comment:", err.message);
    res.status(500).json({ msg: 'Error adding comment', error: err.message });
  }
};

// Get all comments for a video
export const getComments = async (req, res) => {
  const { videoId } = req.params;

  try {
    const comments = await Comment.find({ videoId })
      .populate('userId', 'username profileImage'); // Populate user fields
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    res.status(500).json({ msg: 'Error fetching comments', error: err.message });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized to update this comment' });
    }

    comment.text = text;
    const updatedComment = await comment.save();

    res.status(200).json(updatedComment);
  } catch (err) {
    console.error("Error updating comment:", err.message);
    res.status(500).json({ msg: 'Error updating comment', error: err.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(commentId);

    // Remove the comment from the video's comments array
    await Video.findByIdAndUpdate(
      comment.videoId,
      { $pull: { comments: commentId } },
      { new: true } // Return the updated document
    );

    res.status(200).json({ msg: 'Comment deleted successfully' });
  } catch (err) {
    console.error("Error deleting comment:", err.message);
    res.status(500).json({ msg: 'Error deleting comment', error: err.message });
  }
};