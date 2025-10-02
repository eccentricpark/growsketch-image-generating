import { geminiClient } from "../../shared/axios-custom";
import { logger, errorLogger } from "../../config/winston";

const NANO_BANANA = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent';
export async function generateImage(prompt:string, images:Express.Multer.File[]){
  try {
    const imageList = images.map(image => {
      return {
        "inline_data":{
          "mime_type": image.mimetype,
          "data": image.buffer
        }
      };
    });
    const requestBody = {
      "contents":[{
        "parts":[
          {"text" : `${prompt}`},
          imageList,
        ]
      }],
    };
    logger.info(requestBody);

    const response = await geminiClient.post(NANO_BANANA, requestBody, {
      headers : {
        "x-goog-api-key": `${process.env.VERTEX_API_KEY}`,
        'Content-Type': 'application/json'
      },
    });
    logger.info(response.data);
    return response.data;
  } catch (error) {
    errorLogger.error(error);
    console.error(error);
  }
}