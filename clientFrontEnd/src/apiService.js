import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// Video endpoints
export const fetchVideos = () => api.get('/videos');
export const fetchVideo = (videoId) => api.get(`/videos/${videoId}`);
export const postVideos = () => api.post('/videos');

// Channel endpoints
export const createNewChannel = (data) => api.post('/channels', data);
export const fetchChannel = (channelId) => api.get(`/channels/${channelId}`);

// Comment endpoints
export const addComment = (videoId, data) => api.post(`/videos/${videoId}/comments`, data);
export const getComments = (videoId) => api.get(`/videos/${videoId}/comments`);
export const updateComment = (commentId, data) => api.put(`/comments/${commentId}`, data);
export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`);

