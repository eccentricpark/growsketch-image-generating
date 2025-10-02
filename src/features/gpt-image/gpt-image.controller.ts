// user.controller.ts
import { JsonController, Post, UploadedFiles, Body } from 'routing-controllers';
import { Service } from 'typedi';
import { multerOption } from '../../shared/multer';
import { generateImage, editImage, editPartImage } from './gpt-image.api';
import { logger } from '../../config/winston';

const MIME_PNG = "image/png";
const MIME_JPG = "image/jpg";
const MIME_BMP = "image/bmp";

function isImage(mimetype:String){
  return (mimetype !== MIME_JPG || mimetype !== MIME_PNG || mimetype !== MIME_BMP);
}

@Service()
@JsonController('/gpt-image')
export class GptImageController {
  constructor(
  ) {}

  /**
   * 이미지 2장과 프롬프트를 입력하면
   * GPT를 통해 이미지를 생성한다.
   */
  @Post('/generating')
  async generateImage(@Body() body: {prompt: string}){
    const { prompt } = body;
    const response = await generateImage(prompt);
    return response;
  }

  @Post('/editing')
  async editImage(
    @UploadedFiles('images', multerOption) images: Express.Multer.File[], 
    @Body() body: {prompt: string}
  ){
    const { prompt } = body;
    if (!images) throw new Error("이미지 파일을 올리셔야 합니다!");

    const response = await editImage(prompt, images);
    return response?.imageBytes;
  }

  @Post('/editing-part')
  async editPartImages(
    @UploadedFiles('images', multerOption) images: Express.Multer.File[], 
    @Body() body: {prompt: string}
  ){
    const { prompt } = body;
    if(isImage(images[0].mimetype) && isImage(images[1].mimetype)){
      if (!images) throw new Error("이미지 파일을 올려야 합니다!");
    }
    

    const response = await editPartImage(prompt, images);
    return response?.imageBytes;
  }
}