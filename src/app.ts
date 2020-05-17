import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose";
import {Routes} from './routes/index'
class App {
  public mongoUrl: string = 'mongodb://localhost/Blogcast';
  public app: express.Application = express();
  public allRoute: Routes = new Routes();
  constructor() {
    this.setConfig();
    this.mongoSetup();
    this.allRoute.routes(this.app); 
  }

  private setConfig(): void {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));  
    this.app.use(cors());
  }
  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log("we're connected!")
    });
  }

}

export default new App().app;