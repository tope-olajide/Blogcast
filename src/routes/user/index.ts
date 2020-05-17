import express from 'express';
import User from '../../controller/user';
const newUser = new User
const user = express.Router();
user.post('/signup', newUser.signUp);
user.post('/signin', newUser.signIn);
export default user;