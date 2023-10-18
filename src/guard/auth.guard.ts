import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromRequest(request);

    if (!token) {
      return false;
    }

    try {
      const user = await this.jwtService.verify(token.trim());
      request['user'] = user;
      return true;
    } catch (error) {
      return false;
    }
  }

  getTokenFromRequest(request: Request) {
    const token = request.headers.authorization;
    const jwt = token ? token.replace('Bearer', '') : undefined;
    return jwt;
  }
}
