
import userRoutes from './user';
import standardPostRoutes from './standardPost';
import audioPostRoutes from './audioPost';
export class Routes { 
    public routes(app:any): void {   
        app.use('/user', userRoutes);
        app.use('/post', standardPostRoutes);
        app.use('/post', audioPostRoutes);
    }
}