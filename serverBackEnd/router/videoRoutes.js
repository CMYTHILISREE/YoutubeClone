import express from 'express';
import { getVideos, getVideo, createVideo } from '../controllers/videoController.js';

const router = express.Router();
router.get('/', getVideos);
router.get('/:id', getVideo);
router.post('/',createVideo);


export default router;