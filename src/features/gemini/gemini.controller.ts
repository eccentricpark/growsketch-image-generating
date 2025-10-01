// user.controller.ts
import { JsonController, Get, Post } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/gemini-image')
export class GeminiController {
  constructor(
  ) {}

  @Get('/')
  sayHello() {
    return "gemini controller";
  }

}