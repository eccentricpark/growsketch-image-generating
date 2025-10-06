import OpenAI from 'openai';
import { ImagesResponse } from "openai/resources/images";
import fs from 'fs';
import { logger, errorLogger } from "../../config/winston";

const IMAGE_MODEL = "gpt-image-1";

export async function generateImage(prompt: string){
  try {
    const openai = new OpenAI({
      apiKey: process.env.GPT_API_KEY
    });
    const result: ImagesResponse = await openai.images.generate({
      model: IMAGE_MODEL,
      prompt,
      quality: "medium",
      size: "1024x1024",
      n: 1
    });

    if(result.data !== undefined){
      const imageBase64 = result.data[0].b64_json;
      if(imageBase64 !== undefined){
        const imageBytes = Buffer.from(imageBase64, "base64");
        logger.info("이미지 생성 완료");
        fs.writeFileSync("output.png", imageBytes);
        return imageBytes;
      }
    }
  } catch (error) {
    errorLogger.error(error);
    console.error(error);
  }
}

export async function editImage(prompt: string, image:Express.Multer.File){
  try {
    const openai = new OpenAI({
      apiKey: process.env.GPT_API_KEY
    });
    const file = image;
    const buffer = fs.readFileSync(file.path);
    const blob = new Blob([buffer], { type: file.mimetype });
    const target = new File([blob], file.originalname, { type: blob.type });

    const result: ImagesResponse = await openai.images.edit({
      model: IMAGE_MODEL,
      image: target,
      prompt,
      quality: "medium",
      size: "1024x1024",
      n: 1
    });

    if(result.data !== undefined){
      const imageBase64 = result.data[0].b64_json;
      if(imageBase64 !== undefined){
        const imageBytes = Buffer.from(imageBase64, "base64");
        logger.info("이미지 생성 완료");
        historyFileLog(image);
        fs.rmSync(image.path);
        return {
          imageBytes: imageBytes,
          mimetype: file.mimetype,
          filename: "edited.png"
        };
      }
    }
  } catch (error) {
    errorLogger.error(error);
    throw error;
  }
}

export async function editPartImage(prompt: string, images:Express.Multer.File[]){
  try {
    const openai = new OpenAI({
      apiKey: process.env.GPT_API_KEY
    });
    const files = Array();
    images.forEach((file, index) => {
      const buffer = fs.readFileSync(file.path);
      const blob = new Blob([buffer], { type: file.mimetype });
      const target = new File([blob], file.originalname, { type: blob.type });  
      files.push(target);
    });

    const result: ImagesResponse = await openai.images.edit({
      model: IMAGE_MODEL,
      image: files,
      prompt,
      quality: "medium",
      size: "1024x1024",
      n: 1
    });

    if(result.data !== undefined){
      const imageBase64 = result.data[0].b64_json;
      if(imageBase64 !== undefined){
        const imageBytes = Buffer.from(imageBase64, "base64");
        logger.info("이미지 생성 완료");
        historyFileLog(images[0]);
        historyFileLog(images[1]);
        fs.rmSync(images[0].path);
        fs.rmSync(images[1].path);
        return {
          imageBytes: imageBytes,
          mimetype: "image/jpg",
          filename: "edited.jpg"
        };
      }
    }
  } catch (error) {
    errorLogger.error(error);
    throw error;
  }
}

function historyFileLog(file: Express.Multer.File){
  logger.info(`File name : ${file.originalname}`);
  logger.info(`File type : ${file.mimetype}`);
  logger.info(`File destination : ${file.destination}`);
  logger.info(`File path : ${file.path}`);
  logger.info(`=========================================`);
}