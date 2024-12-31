import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from "./router/authRoutes.js";
import channelRoutes from "./router/channelRoutes.js";
import { commentRoute } from './router/commentRoutes.js';
import videoRoutes from "./router/videoRoutes.js";
import dataBase from './config/dataBase.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());



app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/channels', channelRoutes);
// app.use('/api/comments', commentRoutes);
commentRoute(app)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});