import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthRepo } from 'src/repositories/auth.repository';
import { ConfigModule } from '@nestjs/config';
import { JwtModuleOption } from 'src/config/jwt/jwt.module';

@Module({
  imports: [ConfigModule, JwtModuleOption],
  controllers: [AuthController],
  providers: [AuthService, AuthRepo],
})
export class AuthModule {}
