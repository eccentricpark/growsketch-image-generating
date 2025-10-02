// src/interceptors/GlobalResponseInterceptor.ts
import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';
import { Service } from 'typedi';
import { logger } from '../config/winston';

/**
 * Controller에서 return한 값을 { data: ..., message: 'OK' } 형태로 감싸주는 인터셉터
 * 에러 상황은 별도의 글로벌 에러 미들웨어에서 처리됨
 */
@Service()
@Interceptor()
export class GlobalResponseInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    logger.info(`${action}:${content}`);
    return content;
  }
}
