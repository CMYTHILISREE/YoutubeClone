import express from 'express';
import dotenv from 'dotenv';
import dataBase from './config/dataBase.js';
import cors from 'cors';
import authRoutes from "./router/authRoutes.js";
import channelRoutes from "./router/channelRoutes.js";
import commentRoutes from "./router/commentRoutes.js";
import videoRoutes from "./router/videoRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());



app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});