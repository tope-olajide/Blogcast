/* import express from 'express';

const routes = express.Router();

routes.use('/user', users);

export default routes;
 */
import User from '../controller/user';
import {Request, Response, NextFunction} from "express";
import UserRoutes from './user';

export class Routes { 
    public usertController: User = new User() 
    public routes(app:any): void {   
        app.use('/user', UserRoutes);
    }
}