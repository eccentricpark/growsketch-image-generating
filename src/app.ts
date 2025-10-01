import 'reflect-metadata';
import "module-alias/register";
import express from 'express';
import { setExpress } from './loader/express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
async function startServer(){
  setExpress(app);
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, ()=>{
    console.log(`start ${PORT}`);
  });
}
startServer();

