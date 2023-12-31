import { HttpStatus } from '@nestjs/common';
export class HttpRespone<T> {
  private payload: ResponsePayload<T> = {};
  constructor(data?: T) {
    this.payload.data = data;
  }

  public build(args?: any): ResponsePayload<T> {
    return {
      statusCode: HttpStatus.OK,
      type: 'success',
      ...this.payload,
      ...args,
    };
  }

  public buildError(args?: any): ResponsePayload<T> {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      type: 'error',
      ...args,
    };
  }
}

class ResponsePayload<T> {
  statusCode?: number;
  message?: string;
  data?: T;
}
