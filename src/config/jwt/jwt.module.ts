import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtOption } from './jwt.option';

@Module({
  imports: [JwtModule.register(jwtOption)],
  exports: [JwtModule],
})
export class JwtModuleOption {}
