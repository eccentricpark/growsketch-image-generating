// user.controller.ts
import { JsonController, Get, Post, UploadedFiles, Body } from 'routing-controllers';
import { Service } from 'typedi';
import { memoryOption } from '@/shared/multer';

@Service()
@JsonController('/gpt-image')
export class GptImageController {
  constructor(
  ) {}

  @Post('/edit')
  editImage(
    @UploadedFiles('images', {options: memoryOption.array("images")}) images: Express.Multer.File[], 
    @Body() body: {prompt?: string}
  ){
    if (!images){
      return { error : "no Files" };
    }
    // originalname, mimetype, size
    console.log(images);
    const {prompt} = body;

    return {images, prompt};
  }
}