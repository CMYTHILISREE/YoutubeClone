import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: 
  { 
    type: String, 
    required: true 
  },
  description: 
  { 
    type: String 
  },
  thumbnailUrl: 
  { 
    type: String 
  },
  channelName: 
  { 
    type: String 
  },
  category: 
  { 
    type: String 
  },
  videoUrl: 
  { 
    type: String 
  },
  views: 
  { 
    type: Number, 
    default: 0 
  },
  likes: 
  { 
    type: Number,
    default: 0 
  },
  dislikes: 
  { 
    type: Number, 
    default: 0 
  },
  comments: [{ 
    type: String , 
    ref: 'Comment' 
  }],
});

const Video = mongoose.model('Video', videoSchema);
export default Video;