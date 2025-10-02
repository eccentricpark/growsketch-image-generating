import 'reflect-metadata';
import express from 'express';
import { setExpress } from './loader/express';
import { logger } from './config/winston';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
async function startServer(){
  setExpress(app);
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, ()=>{
    logger.info("start");
    console.log(`start ${PORT}`);
  });
}
startServer();

