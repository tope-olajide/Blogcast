import express from 'express';
import AudioPost from '../../controller/audioPost';
import Auth from '../../middleware/auth';

const newAuth = new Auth();
const newAudioPost = new AudioPost;
const audioPost = express.Router();

audioPost.use('*', newAuth.verify);

audioPost.post('/audio-post', newAudioPost.createAudioPost);

export default audioPost;