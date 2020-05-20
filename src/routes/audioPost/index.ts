import express from 'express';
import AudioPost from '../../controller/audioPost';
import Auth from '../../middleware/auth';

const newAuth = new Auth();
const newAudioPost = new AudioPost;
const audioPost = express.Router();

audioPost.use('*', newAuth.verify);
audioPost.get('/audio-post', newAudioPost.fetchAllAudioPost);
audioPost.post('/audio-post', newAudioPost.createAudioPost);
audioPost.put('/audio-post/:postId', newAudioPost.modifyAudioPost);
audioPost.get('/audio-post/:postId', newAudioPost.fetchPostDetails);
audioPost.delete('/audio-post/:postId', newAudioPost.deleteAudioPost);

export default audioPost;