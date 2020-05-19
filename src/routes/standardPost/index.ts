import express from 'express';
import StandardPost from '../../controller/standardPost';
import Auth from '../../middleware/auth';

const newAuth = new Auth();
const newStandardPost = new StandardPost;
const entry = express.Router();

entry.use('*', newAuth.verify);

entry.post('/', newStandardPost.createPost);
entry.get('/', newStandardPost.fetchAll);
entry.put('/:postId', newStandardPost.modifyPost);
entry.get('/:postId', newStandardPost.fetchPostDetails);

export default entry;