import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
      name:{
        type:String,
        required: true
      },
      owner: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema', 
        required: true 
      },
      description: { 
        type: String
      },
      subscribers:{
        type: Number, 
        default: 0
      },
      videos: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'videoSchema' 
    }],
});

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;