import Video from '../model/videoSchema.js';

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createVideo = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      thumbnailUrl, 
      channelName, 
      category, 
      videoUrl, 
      views = 0, 
      likes = 0, 
      dislikes = 0, 
      comments = [] 
    } = req.body;

    const newVideo = new Video({
      title,
      description,
      thumbnailUrl,
      channelName,
      category,
      videoUrl,
      views,
      likes,
      dislikes,
      comments
    });

    await newVideo.save();
    res.status(201).json({ msg: 'Video created successfully', video: newVideo });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

