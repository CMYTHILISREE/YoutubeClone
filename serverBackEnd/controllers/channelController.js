import Channel from '../model/channelSchema.js';

export const createChannel = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newChannel = new Channel({ name, description, owner: req.user.id });
    await newChannel.save();
    res.json(newChannel);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

