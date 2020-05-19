
import userRoutes from './user';
import standardPostRoutes from './standardPost';
export class Routes { 
    public routes(app:any): void {   
        app.use('/user', userRoutes);
        app.use('/post', standardPostRoutes);
    }
}