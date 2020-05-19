import express from 'express';
import StandardPost from '../../controller/standardPost';
import Auth from '../../middleware/auth';

const newAuth = new Auth();
const newStandardPost = new StandardPost;
const standardPost = express.Router();

standardPost.use('*', newAuth.verify);

standardPost.post('/standard-post', newStandardPost.createPost);
standardPost.get('/standard-post', newStandardPost.fetchAll);
standardPost.put('/standard-post/:postId', newStandardPost.modifyPost);
standardPost.get('/standard-post/:postId', newStandardPost.fetchPostDetails);
standardPost.delete('/standard-post/:postId', newStandardPost.deleteStandardPost);
export default standardPost;