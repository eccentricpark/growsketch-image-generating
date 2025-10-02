import { JsonController, Post, UploadedFiles, Body } from 'routing-controllers';
import { Service } from 'typedi';
import { multerOption } from '../../shared/multer';
import { generateImage, editImage, editPartImage } from './gpt-image.api';

const MIME_PNG = "image/png";
const MIME_JPG = "image/jpg";
const MIME_BMP = "image/bmp";

function isImage(mimetype:String){
  return (mimetype === MIME_JPG || mimetype === MIME_PNG || mimetype === MIME_BMP);
}

@Service()
@JsonController('/gpt-image')
export class GptImageController {
  constructor(
  ) {}

  @Post('/generating')
  async generateImage(@Body() body: {prompt: string}){
    const { prompt } = body;
    const response = await generateImage(prompt);
    return response;
  }

  @Post('/editing')
  async editImage(
    @UploadedFiles('images', multerOption) image: Express.Multer.File, 
    @Body() body: {prompt: string}
  ){
    const { prompt } = body;
    if(!isImage(image.mimetype)) 
      throw new Error("지원하지 않는 이미지 형식입니다! (png, jpg, bmp만 가능)");

    const response = await editImage(prompt, image);
    return response?.imageBytes;
  }

  @Post('/editing-part')
  async editPartImages(
    @UploadedFiles('images', multerOption) images: Express.Multer.File[], 
    @Body() body: {prompt: string}
  ){
    const { prompt } = body;
    if(images.length !== 2)
      throw new Error("이미지는 반드시 2개를 올려야 합니다.");

    if(!isImage(images[0].mimetype) && !isImage(images[1].mimetype))
      throw new Error("지원하지 않는 이미지 형식입니다! (png, jpg, bmp만 가능)");
    
    const response = await editPartImage(prompt, images);
    return response?.imageBytes;
  }
}