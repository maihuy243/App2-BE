import { JwtModuleOptions } from '@nestjs/jwt';
import { constant_jwt } from '../constant-jwt';

export const jwtOption: JwtModuleOptions = {
  global: true,
  secret: constant_jwt.secretKey,
  signOptions: {
    expiresIn: constant_jwt.expresIn,
  },
};
