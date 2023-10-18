import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DelayMiddleWare implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    setTimeout(() => {
      next();
    }, 1500);
  }
}
