import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class Util {
  constructor(private jwtSerive: JwtService) {}

  public getUserFromHeader(req: Request) {
    const token = req.headers.authorization;
    const jwt = token ? token.replace('Bearer', '') : undefined;
    const decodeJwt = jwt ? this.jwtSerive.verify(jwt.trim()) : undefined;
    return decodeJwt ? decodeJwt : undefined;
  }
}
