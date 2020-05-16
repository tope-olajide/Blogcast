import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose";

class App {
  public app: Application;
  public mongoUrl: string = 'mongodb://localhost/Blogcast';
  constructor() {
    this.app = express();
    this.setConfig();
    this.mongoSetup();

  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    //Enables cors   
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