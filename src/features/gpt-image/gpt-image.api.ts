import { gptClient } from "../../shared/axios-custom";
import { logger, errorLogger } from "@/config/winston";

const GPT_IMAGE_1 = 'https://api.openai.com/v1/images/generations';
export async function generateImage(prompt:string, images:object[]){
  try {
    // const imageList = images.map(image => {
    //   return {
    //     "inline_data":{
    //       "mime_type": image.mime_type,
    //       "data": image.data
    //     }
    //   };
    // });
    const requestBody = {
      "model": "gpt-image-1",
      "prompt": prompt
    };
    logger.info(requestBody);

    const response = await gptClient.post(GPT_IMAGE_1, requestBody, {
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